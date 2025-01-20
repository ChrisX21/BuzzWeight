import OverviewChart from "@/components/overview-chart";
import OverviewTempsChart from "@/components/overview-temps-chart";
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
    <div className="flex flex-col gap-4 text-center mt-5">
      <h1 className="text-2xl font-bold">Overview</h1>
      <p>
        Welcome back, <b>{user.email}</b>!
      </p>
      <div>
        <h3 className="mt-5">Pollen Scales Overview (24hrs)</h3>
        <OverviewChart />
      </div>
      <div>
        <h3 className="mt-5">Temperature Overview (24hrs)</h3>
        <OverviewTempsChart />
      </div>
    </div>
  );
}
