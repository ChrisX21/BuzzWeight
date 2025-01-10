import { getSensorDataByDateRange } from "@/lib/services/querySupabaseService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams, pathname } = new URL(req.url);
    const trailerId = pathname.split('/')[3];
    const start = searchParams.get("start");
    const end = searchParams.get("end");


    if (!trailerId || !start || !end) {
        return NextResponse.json({ message: "Missing required parameters: trailerId, start, or end" }, { status: 400 });
    }

    try {
        const sensorData = await getSensorDataByDateRange(
            Number(trailerId), 
            start as string, 
            end as string
        );

        return NextResponse.json({ sensorData }, { status: 200 });
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        return NextResponse.json({ message: "Error fetching data (Internal Server Error)" }, { status: 500 });
    }
}
