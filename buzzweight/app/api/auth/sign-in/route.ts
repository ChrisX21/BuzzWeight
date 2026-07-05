import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = body.email?.trim();
  const password = body.password;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message =
      error.message === "Invalid login credentials"
        ? "Invalid email or password"
        : error.message === "Email not confirmed"
          ? "Please verify your email first"
          : error.message;
    // Log the underlying reason server-side to aid debugging (e.g. provider disabled).
    console.error("Sign-in failed:", error.status, error.message);
    return NextResponse.json({ error: message }, { status: 401 });
  }

  // The Supabase server client has written the session cookies onto this response.
  return NextResponse.json({ success: true });
}
