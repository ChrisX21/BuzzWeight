import React from "react";

interface ChartData {
  name: string;
  value: number;
}

export default function StartChart({ data }: { data: ChartData[] }) {
  return <div>StartChart</div>;
}
