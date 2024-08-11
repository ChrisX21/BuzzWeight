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

// const sensorData = {
//     scale1: 212,
//     scale2: 220,
//     scale3: 200,
//     scale4: 200,
//     scaleH: 89,
//     temp1: 33,
//     temp2: 32,
//     temp3: 30,
//     hum1: 90,
//     hum2: 76,
//     hum3: 80
// };

// const trailerId = 'Trailer1';

// await writeSensorData(sensorData, trailerId);
