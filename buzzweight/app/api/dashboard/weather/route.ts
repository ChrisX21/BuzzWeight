import { getLatestTempData } from "@/lib/services/querySupabaseService";
import { averageWeatherData } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const weatherData = await getLatestTempData();
        const averagedWeatherData = averageWeatherData(weatherData);

        return NextResponse.json({ averagedWeatherData }, { status: 200 });
    }catch(err){
        console.error("Error fetching sensor data:", err);
        return NextResponse.json({ message: "Error latest fetching data (Internal Server Error)" }, { status: 500 });
    }

}