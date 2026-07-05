import { randomUUID } from "crypto";
import { createServiceClient } from "@/utils/supabase/service";

export default async function writeSupabaseService(
    data: Record<string, unknown>,
    trailerId: number,
) {
    const supabase = createServiceClient();

    // One batch id per POST so all readings from a single payload group together
    // reliably, independent of insert timestamp.
    const batch_id = randomUUID();

    // Drop trailerId (and any nested/non-numeric metadata) so it is not written
    // as a bogus sensor row; keep only numeric sensor readings.
    const { trailerId: _trailerId, ...sensors } = data;
    const rows = Object.entries(sensors)
        .filter(([, value]) => typeof value === "number" && Number.isFinite(value))
        .map(([sensor, value]) => ({ trailerId, sensor, value, batch_id }));

    if (rows.length === 0) {
        throw new Error("No valid numeric sensor readings in payload");
    }

    const { error } = await supabase.from("sensors").insert(rows);
    if (error) {
        throw error;
    }

    return rows.length;
}
