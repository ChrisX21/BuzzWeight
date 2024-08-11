import mqtt from 'mqtt';
import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis!');
});

redisClient.on('error', (error) => {
    console.error("Redis error: " + error);
});

const mqttClient = mqtt.connect('mqtt://localhost:1883');
let timer = null;
const aggregationInterval = 0.2 * 60 * 1000; // 10 minutes in milliseconds
const cacheExpiration = 30 * 60; // 30 minutes in seconds

mqttClient.on('connect', () => {
    console.log('Connected to MQTT!');
    mqttClient.subscribe('Trailer1/sensors', (err) => {
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
                console.log('Aggregated Sensor Data:', sensorData);

                sensorData.TrailerId = 1;
                const response = await fetch('http://localhost:8080/api/getData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sensorData)
                });
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
