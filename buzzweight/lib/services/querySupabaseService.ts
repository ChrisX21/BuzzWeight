import { createClient } from "@supabase/supabase-js";
import { aggregateScalesSensorData, aggregateSensorData, aggregateTempSensorData } from "../utils";

interface SensorData {
  sensor: string;
  value: number;
  created_at: string;
}

export async function getSensorDataByDateRange(
    trailerId: number,
    startTime?: string,
    endTime?: string
): Promise<SensorData[]> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

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
    //@ts-ignore
    return aggregateSensorData(data as SensorData[]);
}


export async function getLatestSensorData(): Promise<SensorData[]> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 220).toISOString();

    const {data, error} = await supabase.from('sensors').select('*').gte('created_at', date);

    if (error) {
        throw error;
    }
    //@ts-ignore
    return aggregateScalesSensorData(data as SensorData[]);
}

export async function getLatestTempData(): Promise<SensorData[]> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 220).toISOString();

    const {data, error} = await supabase.from('sensors').select('*').gte('created_at', date);

    if (error) {
        throw error;
    }
    //@ts-ignore
    return aggregateTempSensorData(data as SensorData[]);
}
