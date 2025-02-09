import { NextRequest, NextResponse } from 'next/server';
import writeSupabaseService from '@/lib/services/writeSupabaseService';

export async function POST(req: NextRequest) {
    console.log("Request received");

    try {
        const text = await req.text();  // Get raw body as text
        console.log("Raw Request Body:", text);

        if (!text) {
            throw new Error("Empty request body received");
        }

        const data = JSON.parse(text);  // Manually parse JSON
        console.log("Parsed Data:", data);

        await writeSupabaseService(data, data.trailerId);
        return NextResponse.json({ message: "Data written successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error writing data:", error);
        return NextResponse.json({ message: `Error writing data: ${error}` }, { status: 500 });
    }
}
