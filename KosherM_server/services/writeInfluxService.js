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
}

// const sensorData = {
//     scale1: 224,
//     scale2: 221,
//     scale3: 232,
//     scale4: 213,
//     scaleH: 123,
//     temp1: 31,
//     temp2: 30,
//     temp3: 29,
//     hum1: 42,
//     hum2: 46,
//     hum3: 47
// };

// const trailerId = '1';

// await writeSensorData(sensorData, trailerId);
