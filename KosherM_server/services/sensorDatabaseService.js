import { InfluxDB, Point } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';

dotenv.config();

const influx = new InfluxDB({
    host: 'http://localhost:8086',
    token: process.env.INFLUXDB_TOKEN,
    org: process.env.INFLUXDB_ORG,
    bucket: process.env.INFLUXDB_BUCKET
});

const sensorDatabaseService = {
    writeData: async (measurement, tags, fields) => {
        try {
            await influx.writePoints([
                {
                    measurement,
                    tags,
                    fields
                }
            ]);
            console.log('Writing to influxdb: ', measurement, tags, fields);
        }
        catch (err) {
            console.error('Error writing to influxdb: ', err);
        }
    },
    retrieveData: async () => {
        try {
            await influx.getQueryApi(process.env.INFLUXDB_ORG)
                .queryRows('from(bucket: "' + process.env.INFLUXDB_BUCKET + '") |> range(start: -12h)', {

                })
            console.log('data retrieve successful influxdb');
        }
        catch (error) {
            console.error('Error retrieving data from influxdb: ', error);
        }
    }
}

module.exports = sensorDatabaseService;