import { writeSensorData } from './sensorDatabaseService';
import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const mqttService = {
    client: null,
    connect: () => {
        mqttService.client = mqtt.connect(process.env.MQTT_URL);
        
        mqttService.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttService.client.subscribe(process.env.MQTT_TOPIC);
        });

        mqttService.client.on('message', (message) => {
            const data = JSON.parse(message.toString());
            // writeSensorData(data.trailerId, data.sensor, data.value);
        });
        mqttService.client.on('error', (error) => {
            console.error('Error connecting to MQTT broker:', error);
        });
        mqttService.client.on('offline', () => {
            console.log('Disconnected from MQTT broker');
        });
    }
}