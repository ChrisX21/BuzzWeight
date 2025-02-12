import { NextRequest, NextResponse } from 'next/server';
import writeSupabaseService from '@/lib/services/writeSupabaseService';

export const config = {
    runtime: "nodejs",
};

export async function POST(req: NextRequest) {
    console.log("Request received");

    try {
        const rawBody = await req.text();
        const data = JSON.parse(rawBody);

        if (!data || Object.keys(data).length === 0) {
            throw new Error("Empty request body received");
        }

        await writeSupabaseService(data, data.trailerId);
        return NextResponse.json({ message: "Data written successfully" }, { status: 200 });

    } catch (err) {
        console.error("Error writing data:", err);
        return NextResponse.json({ message: `Error writing data: ${err}` }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ message: "Allowed methods: POST" }, { headers: { Allow: "POST" } });
}