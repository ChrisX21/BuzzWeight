import { NextRequest, NextResponse } from 'next/server';
import writeSupabaseService from '@/lib/services/writeSupabaseService';

export async function POST(req: NextRequest) {
    console.log("Request received");
    try {
        const data = await req.json();
        console.log(data);
        await writeSupabaseService(data, data.TrailerId);
        return NextResponse.json({ message: "Data written successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error writing data:", err);
        return NextResponse.json({ message: "Error writing data" }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ message: "Allowed methods: POST" }, { headers: { Allow: "POST" } });
}
