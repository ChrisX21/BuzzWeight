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
        
    }
}

module.exports = sensorDatabaseService;