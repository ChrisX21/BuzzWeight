import { LineChart } from "@mui/x-charts";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import React from "react";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function ScalesChart({ data }: { data: SensorData }) {
  const [chartSize, setChartSize] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.9, 600);
      const height = Math.min(window.innerHeight * 0.4, 400);
      setChartSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const chartData = data.sensorData.map((item) => ({
    x: formatDate(item.created_at),
    //@ts-ignore
    scale1: item.scale1,
    //@ts-ignore
    scale2: item.scale2,
    //@ts-ignore
    scale3: item.scale3,
    //@ts-ignore
    scale4: item.scale4,
  }));

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <LineChart
        xAxis={[{ scaleType: "band", data: chartData.map((d) => d.x) }]}
        series={[
          {
            data: chartData.map((item) => item.scale1),
            label: "Scale 1",
            color: "#2196f3",
          },
          {
            data: chartData.map((item) => item.scale2),
            label: "Scale 2",
            color: "#4caf50",
          },
          {
            data: chartData.map((item) => item.scale3),
            label: "Scale 3",
            color: "#e40f0f",
          },
          {
            data: chartData.map((item) => item.scale4),
            label: "Scale 4",
            color: "#ff5722",
          },
        ]}
        width={chartSize.width}
        height={chartSize.height}
      />
    </div>
  );
}
