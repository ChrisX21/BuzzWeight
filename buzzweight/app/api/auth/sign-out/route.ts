import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // signOut clears the session cookies on this response.
  return NextResponse.json({ success: true });
}
