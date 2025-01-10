"use client";
import { useEffect, useState } from "react";

export default function DashboardPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
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

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No data found for ID: {id}</div>;

  return (
    <div>
      <h1>Dashboard for ID: {id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
