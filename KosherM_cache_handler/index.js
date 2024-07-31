import mqtt from "mqtt";
import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis!');
});

redisClient.on('error', (error) => {
    console.error("Redis error: " + error);
});

redisClient.on('ready', () => {
    const client = mqtt.connect('mqtt://localhost:1883');

    client.on('connect', () => {
        console.log('Connected to MQTT!');
        try {
            client.subscribe('Trailer1/sensors');
        }
        catch (err) {
            console.error("Error connecting to redis " + err);
        }
    });

    client.on('message', async (topic, message) => {
        const data = JSON.parse(message.toString());
        const keys = Object.keys(data);

        for (const key of keys) {
            const value = data[key];

            try {
                await redisClient.set(String(key), value, 'EX', 1800);
            }
            catch (error) {
                console.error("Redis error when setting kvp: " + error);
            }
        }
    });

    client.on('error', (error) => {
        console.error("MQTT error: " + error);
    });

    client.on('close', () => {
        console.log('Disconnected from MQTT broker');
    });

    client.on('offline', () => {
        console.log('Sensor is offline');
    });
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
    }
    catch (error) {
        console.error("Error retrieving sensor data from Redis: " + error);
        return {};
    }
};


setTimeout(async () => {
    const sensorData = await getAllSensorData();
    console.log(sensorData);
}, 5000);

await redisClient.connect();
