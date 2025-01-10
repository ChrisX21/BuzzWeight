import StartChart from "@/components/line-chart";
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

  const sampleData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 50 },
    { name: "Apr", value: 70 },
    { name: "May", value: 80 },
  ];

  return (
    <div className="flex flex-col gap-4 text-center mt-5">
      <h1 className="text-2xl font-bold">Overview</h1>
      <StartChart data={sampleData} />
    </div>
  );
}
