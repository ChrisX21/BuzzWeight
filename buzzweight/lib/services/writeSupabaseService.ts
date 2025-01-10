import { createClient } from '@supabase/supabase-js';

export default async function writeSupabaseService(data: any, trailerId: number) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Prepare the data for insertion
        const rows = Object.entries(data).map(([sensor, value]) => ({
            trailerId,                // Reference to the trailer
            sensor,                   // Sensor name (e.g., "scale1", "temp1")
            value,                    // Sensor value
        }));

        // Insert rows into the sensors table
        const { data: sensorData, error } = await supabase
            .from('sensors')
            .insert(rows);

        if (error) {
            throw error;
        }

        return sensorData;
    } catch (error) {
        console.error('Error writing sensor data:', error);
    }
}
