"use client";
import SensorsTable from "@/components/sensors-table";
import React, { useEffect, useState } from "react";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function DashboardPage({ params }: { params: { id: string } }) {
  //@ts-ignore
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SensorData>();
  const currentDate = new Date(Date.now()).toISOString();
  const previousDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/dashboard/${id}?start=${previousDate}&end=${currentDate}`)
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
  }, [id]);

  if (loading)
    return <div className="mt-5 text-center text-gray-500">Loading...</div>;

  if (!data)
    return (
      <div className="mt-5 text-center text-gray-500">
        No data found for ID: {id}
      </div>
    );

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Trailer {id} Dashboard
      </h1>
      <SensorsTable sensorData={data.sensorData} />
    </div>
  );
}
