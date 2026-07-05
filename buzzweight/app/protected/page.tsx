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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, <span className="font-medium text-foreground">{user.email}</span>
        </p>
      </div>

      <section className="surface-card p-5">
        <h3 className="text-lg font-semibold">Pollen Scales Overview (24 hrs)</h3>
        <div className="mt-3">
          <OverviewChart />
        </div>
      </section>

      <section className="surface-card p-5">
        <h3 className="text-lg font-semibold">Temperature Overview (24 hrs)</h3>
        <div className="mt-3">
          <OverviewTempsChart />
        </div>
      </section>
    </div>
  );
}
