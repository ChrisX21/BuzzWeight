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
    <div className="flex flex-col items-center gap-6 text-center mt-5 ">
      <h1 className="text-xl md:text-2xl font-bold">Overview</h1>
      <p className="text-sm md:text-base">
        Welcome back, <b>{user.email}</b>!
      </p>

      <div className="w-full bg-white shadow-md rounded-lg p-2">
        <h3 className="mt-3 text-lg font-semibold">
          Pollen Scales Overview (24hrs)
        </h3>
        <OverviewChart />
      </div>

      <div className="w-full bg-white shadow-md rounded-lg p-2">
        <h3 className="mt-3 text-lg font-semibold">
          Temperature Overview (24hrs)
        </h3>
        <OverviewTempsChart />
      </div>
    </div>
  );
}
