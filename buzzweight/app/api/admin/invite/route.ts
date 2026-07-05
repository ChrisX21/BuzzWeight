import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    // Require an authenticated user. Optionally restrict to an admin allowlist
    // (comma-separated emails in ADMIN_EMAILS) when configured.
    const authClient = await createServerClient();
    const { data: { user } } = await authClient.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allowlist = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
    if (allowlist.length > 0 && !allowlist.includes((user.email ?? "").toLowerCase())) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const email = body.email;
    if (!email) {
        return NextResponse.json({ message: "Missing required parameters: email" }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    try {
        const { error } = await supabase.auth.admin.inviteUserByEmail(email);
        if (error) {
            console.error("Error sending invite:", error);
            return NextResponse.json({ message: "Error sending invite" }, { status: 500 });
        }
        return NextResponse.json({ message: "Invite sent!" }, { status: 200 });
    } catch (err) {
        console.error("Error sending invite:", err);
        return NextResponse.json({ message: "Error sending invite (Internal Server Error)" }, { status: 500 });
    }
}
