import mqtt from 'mqtt';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('connect', () => {
    console.log('Connected to Redis!');
});

redisClient.on('error', (error) => {
    console.error("Redis error: " + error);
});

const mqttClient = mqtt.connect({
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT
});

let timer = null;
const aggregationInterval = parseInt(process.env.AGGREGATION_INTERVAL, 10);
const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION, 10);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT!');
    mqttClient.subscribe(process.env.MQTT_TOPIC, (err) => {
        if (err) {
            console.error("Error subscribing to topic: " + err);
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    const data = JSON.parse(message.toString());
    const keys = Object.keys(data);

    for (const key of keys) {
        const value = data[key];
        try {
            await redisClient.setEx(String(key), cacheExpiration, String(value));
        } catch (error) {
            console.error("Redis error when setting key-value pair: " + error);
        }
    }

    if (timer === null) {
        timer = setTimeout(async () => {
            try {
                const sensorData = await getAllSensorData();
                console.log('Aggregated Sensor Data before conversion:', sensorData);

                sensorData.TrailerId = parseInt(process.env.TRAILER_ID, 10);

                // Convert values from string to number where applicable
                Object.keys(sensorData).forEach((key) => {
                    if (!isNaN(sensorData[key])) {
                        sensorData[key] = Number(sensorData[key]);
                    }
                });

                console.log('Aggregated Sensor Data after conversion:', sensorData);

                if (response.status === 200) {
                    await redisClient.flushAll();
                    console.log('Redis database cleared for next set of data.');
                }
                else {
                    console.error('API could not process the data. Status:', response.status);
                }

            } catch (error) {
                console.error("Error during aggregation and sending operation: " + error);
            } finally {
                timer = null;
            }
        }, aggregationInterval);
    }
});

mqttClient.on('error', (error) => {
    console.error("MQTT error: " + error);
});

mqttClient.on('close', () => {
    console.log('Disconnected from MQTT broker');
});

mqttClient.on('offline', () => {
    console.log('MQTT client is offline');
});

const getAllSensorData = async () => {
    try {
        const keys = await redisClient.keys('*');
        const sensorData = {};

        for (const key of keys) {
            const value = await redisClient.get(key);
            sensorData[key] = value;
        }

        return sensorData;
    } catch (error) {
        console.error("Error retrieving sensor data from Redis: " + error);
        return {};
    }
};

redisClient.connect();
