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
    return <div className="mt-5 text-center text-muted-foreground">Loading…</div>;
  if (!data)
    return (
      <div className="mt-5 text-center text-muted-foreground">
        No data found for Trailer {id}
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Trailer {id} Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a date range to explore sensor history.
        </p>
      </div>

      <div className="surface-card flex flex-col items-center gap-3 p-5">
        <DateRangePicker
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(dates) => setDateRange(dates)}
        />
      </div>

      <div className="surface-card p-5">
        <SensorsTable sensorData={data.sensorData} />
      </div>

      <div className="surface-card p-5">
        <DashboardCharts data={data} />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/protected"
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Return to Overview
        </Link>
        <Button
          onClick={handleExportClick}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
}
