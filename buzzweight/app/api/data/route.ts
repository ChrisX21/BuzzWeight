import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import writeSupabaseService from '@/lib/services/writeSupabaseService';

export const runtime = "nodejs";

// Constant-time comparison that doesn't leak length via early return.
function secretMatches(provided: string | null): boolean {
    const expected = process.env.INGEST_SECRET;
    if (!expected || !provided) return false;
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
    if (!secretMatches(req.headers.get("x-ingest-secret"))) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const rawBody = await req.text();
        const data = JSON.parse(rawBody);

        if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
            return NextResponse.json({ message: "Empty or invalid request body" }, { status: 400 });
        }

        await writeSupabaseService(data, data.trailerId);
        return NextResponse.json({ message: "Data written successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error writing data:", err);
        return NextResponse.json({ message: "Error writing data" }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ message: "Allowed methods: POST" }, { headers: { Allow: "POST" } });
}
