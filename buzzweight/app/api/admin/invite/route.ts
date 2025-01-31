import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    );
    const body = await req.json();
    const email = body.email;

    if(!email){
        return NextResponse.json({message: "Missing required parameters: email"}, {status: 400});
    }
    try {
        const { error } = await supabase.auth.admin.inviteUserByEmail(email);
        console.error("Error sending invite:", error);
        return NextResponse.json({message: "Invite sent!"}, {status: 200});
    } 
      catch (err) {
        console.error("Error sending invite:", err);
        return NextResponse.json({ message: "Error sending invite (Internal Server Error)" }, { status: 500 });
      } 
}