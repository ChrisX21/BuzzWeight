"use client";
import SensorsTable from "@/components/sensors-table";
import React, { useEffect, useState } from "react";
import DateRangePicker from "@/components/date-range-picker";
import DashboardCharts from "@/components/dashboard-charts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //@ts-ignore
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SensorData>();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(Date.now() - 24 * 60 * 60 * 1000),
    new Date(),
  ]);

  async function handleExportClick() {
    const response = await fetch(
      `/api/dashboard/export/${id}?start=${dateRange[0]?.toISOString()}&end=${dateRange[1]?.toISOString()}`
    );
    if (!response.ok) {
      console.error("Export failed:", response.statusText);
      alert("Export failed. Please try again.");
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export_${id}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (id && dateRange[0] && dateRange[1]) {
      const start = dateRange[0].toISOString();
      const end = dateRange[1].toISOString();
      setLoading(true);
      fetch(`/api/dashboard/${id}?start=${start}&end=${end}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching dashboard data:", err);
          setLoading(false);
        });
    }
  }, [id, dateRange]);

  if (loading)
    return <div className="mt-5 text-center text-gray-500">Loading...</div>;
  if (!data)
    return (
      <div className="mt-5 text-center text-gray-500">
        No data found for ID: {id}
      </div>
    );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Trailer {id} Dashboard
      </h1>
      <h3 className="text-gray-800 text-lg mb-2 text-center">
        Select Date Range
      </h3>
      <div className="mb-2 flex justify-center">
        <DateRangePicker
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(dates) => setDateRange(dates)}
        />
      </div>
      <SensorsTable sensorData={data.sensorData} />
      <div className="flex justify-center mt-6">
        <DashboardCharts data={data} />
      </div>
      <div className="mt-5 flex justify-center gap-4">
        <Link
          href="/"
          className="shadow-lg rounded-lg bg-gray-900 hover:bg-[#e9ab17] transition-colors text-white px-4 py-2"
        >
          Return to Overview
        </Link>
        <Button
          onClick={handleExportClick}
          className="shadow-lg rounded-lg bg-gray-900 hover:bg-[#e9ab17] transition-colors text-white px-4 py-2"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
}
