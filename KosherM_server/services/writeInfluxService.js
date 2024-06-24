import { InfluxDB, Point } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const writeApi = new InfluxDB(
    {
        url: process.env.INFLUXDB_URL,
        token: process.env.INFLUXDB_TOKEN
    })
    .getWriteApi(
        process.env.INFLUXDB_ORG,
        process.env.INFLUXDB_BUCKET, 's');

export const writeSensorData = async (sensorData, trailerId) => {
    const point = new Point('sensors')
        .tag('trailerId', trailerId)
        .timestamp(new Date());

    Object.keys(sensorData).forEach(sensor => {
        point.floatField(sensor, sensorData[sensor]);
    });

    writeApi.writePoint(point);
    await writeApi.close();
}


