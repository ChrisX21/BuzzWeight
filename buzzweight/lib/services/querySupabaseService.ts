import { createServiceClient } from "@/utils/supabase/service";
import {
  aggregateScalesSensorData,
  aggregateSensorData,
  aggregateTempSensorData,
  type SensorRow,
  type AggregatedReading,
} from "../utils";

export async function getSensorDataByDateRange(
    trailerId: number,
    startTime?: string,
    endTime?: string
): Promise<AggregatedReading[]> {
    const supabase = createServiceClient();

    const query = supabase.from('sensors').select('*').eq('trailerId', trailerId);

    if (startTime) {
        query.gte('created_at', startTime);
    }

    if (endTime) {
        query.lte('created_at', endTime);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return aggregateSensorData(data as SensorRow[]);
}


export async function getLatestSensorData(): Promise<AggregatedReading[]> {
    const supabase = createServiceClient();

    const date = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString();

    const { data, error } = await supabase.from('sensors').select('*').gte('created_at', date);

    if (error) {
        throw error;
    }

    return aggregateScalesSensorData(data as SensorRow[]);
}

export async function getLatestTempData(): Promise<AggregatedReading[]> {
    const supabase = createServiceClient();

    const date = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString();

    const { data, error } = await supabase.from('sensors').select('*').gte('created_at', date);

    if (error) {
        throw error;
    }

    return aggregateTempSensorData(data as SensorRow[]);
}
