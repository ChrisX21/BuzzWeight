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

export default function WeatherChart({ data }: { data: SensorData }) {
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
    scale1: item.temp1,
    //@ts-ignore
    scale2: item.temp2,
    //@ts-ignore
    scale3: item.temp3,
  }));

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <LineChart
        xAxis={[{ scaleType: "band", data: chartData.map((d) => d.x) }]}
        series={[
          {
            data: chartData.map((item) => item.scale1),
            label: "Temp Hive",
            color: "#2196f3",
          },
          {
            data: chartData.map((item) => item.scale2),
            label: "Temp Inside",
            color: "#4caf50",
          },
          {
            data: chartData.map((item) => item.scale3),
            label: "Temp Outside",
            color: "#e40f0f",
          },
        ]}
        width={chartSize.width}
        height={chartSize.height}
      />
    </div>
  );
}
