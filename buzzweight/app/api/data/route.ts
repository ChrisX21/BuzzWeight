import { NextRequest, NextResponse } from 'next/server';
import writeSupabaseService from '@/lib/services/writeSupabaseService';

export async function POST(req: NextRequest) {
    console.log("Request received");
    try {
        const data = await req.json();
        await writeSupabaseService(data, data.trailerId);
        return NextResponse.json({ message: "Data written successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error writing data:", err);
        return NextResponse.json({ message: "Error writing data" }, { status: 500 });
    }
}
