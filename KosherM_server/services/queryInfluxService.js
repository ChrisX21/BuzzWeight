import { InfluxDB } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const queryApi = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
}).getQueryApi(process.env.INFLUXDB_ORG);

// Function to ensure date inputs are ISO strings
const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new TypeError('Provided value is not a Date object');
  }
  return date.toISOString();
};

export const getSensorDataByDateRange = async (trailerId, start, end) => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);

    const query = `
      from(bucket: "${process.env.INFLUXDB_BUCKET}")
        |> range(start: ${formattedStart}, stop: ${formattedEnd})
        |> filter(fn: (r) => r["_measurement"] == "sensors" and r["trailerId"] == "${trailerId}")
        |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
    `;

    const data = await queryApi.collectRows(query);
    return data;
  } catch (error) {
    console.error("Error querying data from InfluxDB:", error.message, error.stack);
    throw error;
  }
};
