"use client";

import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { formatDate } from "@/lib/utils";

interface AveragedSensorData {
  average: number;
  created_at: string;
  trailerId: number;
}

export default function OverviewTempsChart() {
  const [data, setData] = useState<AveragedSensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartSize, setChartSize] = useState({ width: 1000, height: 400 });

  useEffect(() => {
    setLoading(true);

    fetch(`/api/dashboard/weather`)
      .then((res) => res.json())
      .then((data) => {
        setData(data?.averagedWeatherData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.9, 900);
      const height = Math.min(window.innerHeight * 0.4, 400);
      setChartSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Group data by trailerId
  const groupedData = data.reduce(
    (acc: Record<number, AveragedSensorData[]>, item) => {
      if (!acc[item.trailerId]) {
        acc[item.trailerId] = [];
      }
      acc[item.trailerId].push(item);
      return acc;
    },
    {}
  );

  // Prepare data for the chart
  const chartSeries = Object.entries(groupedData).map(([trailerId, items]) => ({
    data: items.map((item) => item.average),
    label: `Trailer ${trailerId}`,
  }));

  const xAxisLabels =
    data.length > 0
      ? data
          .filter(
            (item, index, self) =>
              index === self.findIndex((i) => i.created_at === item.created_at)
          )
          .map((item) => formatDate(item.created_at))
      : [];

  return (
    <div className="p-2 w-full max-w-screen-lg mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LineChart
          xAxis={[{ scaleType: "band", data: xAxisLabels }]}
          series={chartSeries}
          colors={["#e9ab17", "#4caf50", "#2196f3", "#ff5722", "#e40f0f"]} // Customize colors per trailer
          width={chartSize.width}
          height={chartSize.height}
        />
      )}
    </div>
  );
}
