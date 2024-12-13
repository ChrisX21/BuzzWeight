import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      Here will be the dashboard where we will be able to see all analytics for
      the trailers. When we click the nav menu button to go to a certain
      trailer, then we will be able to access the more precise information What
      will be available is a 24hr summary of events{" "}
    </div>
  );
}
