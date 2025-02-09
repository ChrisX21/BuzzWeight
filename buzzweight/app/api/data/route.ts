export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import writeSupabaseService from '@/lib/services/writeSupabaseService';

export async function POST(req: NextRequest) {
    console.log("Request received");

    try {
        const text = await req.text();  // Get raw request body
        console.log("Raw Request Body:", text);

        if (!text) {
            throw new Error("Empty request body received");
        }

        const data = JSON.parse(text);
        console.log("Parsed Data:", data);

        await writeSupabaseService(data, data.trailerId);
        return NextResponse.json({ message: "Data written successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error writing data:", err);
        return NextResponse.json({ message: `Error writing data: ${err}` }, { status: 500 });
    }
}
