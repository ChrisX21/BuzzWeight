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

export default function HiveChart({ data }: { data: SensorData }) {
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

  const hiveSensor = data.sensorData.map((item) => ({
    x: formatDate(item.created_at),
    //@ts-ignore
    y: item.scaleH,
  }));

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <LineChart
        xAxis={[{ scaleType: "band", data: hiveSensor.map((d) => d.x) }]}
        series={[
          {
            data: hiveSensor.map((item) => item.y),
            label: "Hive Scale",
          },
        ]}
        colors={["#e9ab17"]}
        width={chartSize.width}
        height={chartSize.height}
      />
    </div>
  );
}
