import { getSensorDataByDateRange } from "@/lib/services/querySupabaseService";
import { formatDate } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams, pathname } = new URL(req.url);
    const trailerId = pathname.split('/')[4];
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!trailerId || !start || !end) {
        return NextResponse.json({ message: "Missing required parameters: trailerId, start, or end" }, { status: 400 });
    }

    try {
        const sensorData = await getSensorDataByDateRange(Number(trailerId), start as string, end as string);

        if (!sensorData || sensorData.length === 0) {
            return NextResponse.json({ message: "No data available for the given range" }, { status: 404 });
        }

        // Dynamically format data while ensuring consistent output
        const formattedSensorData = sensorData.map((data) => {
            const formattedData: Record<string, any> = {
                trailerId: Number(trailerId),
                created_at: formatDate(data.created_at),
            };

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "created_at") {
                    formattedData[key] = value ?? 0; // Ensure missing fields default to 0
                }
            });

            return formattedData;
        });

        // Convert to CSV
        const headers = Object.keys(formattedSensorData[0]).join(",");
        const rows = formattedSensorData.map((row) =>
            Object.values(row).map((value) => (typeof value === "string" ? `"${value}"` : value)).join(",")
        );
        const csvData = [headers, ...rows].join("\n");

        const csvFileName = `sensor_data_${start}_to_${end}.csv`;

        // Return the CSV file as a response
        return new NextResponse(csvData, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="${csvFileName}"`,
            },
        });
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        return NextResponse.json(
            { message: "Error fetching data (Internal Server Error)" },
            { status: 500 }
        );
    }
}
