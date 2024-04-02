import { InfluxDB } from "@influxdata/influxdb-client";
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.INFLUX_TOKEN;
const url = process.env.INFLUX_URL;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;


const client = new InfluxDB({ url, token });

const queryClient = client.getQueryApi(org);

const fluxQuery = ``;

queryClient.queryRows(fluxQuery, {

    next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        console.log(tableObject)
    },
    error: (error) => {
        console.error(error);
    },
    complete: () => {
        console.log('Query Completed');
    }
})
