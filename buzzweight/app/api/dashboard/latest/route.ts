import { getLatestSensorData } from "@/lib/services/querySupabaseService";
import { averageSensorData } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const sensorData = await getLatestSensorData();
        const averagedSensorData = averageSensorData(sensorData);

        return NextResponse.json({ averagedSensorData }, { status: 200 });
    }catch(err){
        console.error("Error fetching sensor data:", err);
        return NextResponse.json({ message: "Error latest fetching data (Internal Server Error)" }, { status: 500 });
    }

}