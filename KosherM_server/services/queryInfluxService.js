import { InfluxDB } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const queryApi = new InfluxDB(
    {
        url: process.env.INFLUXDB_URL,
        token: process.env.INFLUXDB_TOKEN
    }
).getQueryApi(process.env.INFLUXDB_ORG);

export const getLatestSensorData = async (trailerId) => {
    const query = `from(bucket: "${process.env.INFLUXDB_BUCKET}")
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "sensors" and r["trailerId"] == "${trailerId}")
    |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  `;
    const data = await queryApi.collectRows(query);
    return data;
}

