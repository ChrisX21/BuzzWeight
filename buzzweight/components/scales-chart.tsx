import { LineChart } from "@mui/x-charts";
import { formatDate } from "@/lib/utils";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function ScalesChart({ data }: { data: SensorData }) {
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
    <LineChart
      xAxis={[{ scaleType: "band", data: chartData.map((d) => d.x) }]}
      series={[
        {
          data: chartData.map((item) => item.scale1),
          label: "Scale 1",
          color: "blue",
        },
        {
          data: chartData.map((item) => item.scale2),
          label: "Scale 2",
          color: "green",
        },
        {
          data: chartData.map((item) => item.scale3),
          label: "Scale 3",
          color: "red",
        },
        {
          data: chartData.map((item) => item.scale4),
          label: "Scale 4",
          color: "orange",
        },
      ]}
      width={600}
      height={400}
    />
  );
}
