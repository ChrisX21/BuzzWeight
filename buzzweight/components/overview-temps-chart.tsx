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
    <div className="p-2 shadow-lg rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LineChart
          xAxis={[{ scaleType: "band", data: xAxisLabels }]}
          series={chartSeries}
          colors={["#e9ab17", "#4caf50", "#2196f3", "#ff5722", "#e40f0f"]} // Customize colors per trailer
          width={1000}
          height={400}
        />
      )}
    </div>
  );
}
