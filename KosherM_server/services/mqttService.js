import { sensorDatabaseService } from './sensorDatabaseService';

const mqtt = require('mqtt');
const dotenv = require('dotenv');
dotenv.config();

const mqttService = {
    client: null,
    connect: () => {
        mqttService.client = mqtt.connect(process.env.MQTT_BROKER, {
            username: process.env.MQTT_USER,
            password: process.env.MQTT_PASSWORD
        });

        mqttService.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttService.client.subscribe(process.env.MQTT_TOPIC);
        });

        mqttService.client.on('message', (topic, message) => {
            const data = JSON.parse(message.toString());
            sensorDatabaseService.writeData('sensors', { trailerId: data.trailerId }, data);
        });
        mqttService.client.on('error', (error) => {
            console.error('Error connecting to MQTT broker:', error);
        });
        mqttService.client.on('offline', () => {
            console.log('Disconnected from MQTT broker');
        });
    }
}