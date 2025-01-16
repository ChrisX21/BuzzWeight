import { LineChart } from "@mui/x-charts";
import { formatDate } from "@/lib/utils";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function HumidityChart({ data }: { data: SensorData }) {
  const chartData = data.sensorData.map((item) => ({
    x: formatDate(item.created_at),
    //@ts-ignore
    scale1: item.hum1,
    //@ts-ignore
    scale2: item.hum2,
    //@ts-ignore
    scale3: item.hum3,
  }));

  return (
    <LineChart
      xAxis={[{ scaleType: "band", data: chartData.map((d) => d.x) }]}
      series={[
        {
          data: chartData.map((item) => item.scale1),
          label: "Humidity Hive",
          color: "blue",
        },
        {
          data: chartData.map((item) => item.scale2),
          label: "Humidity Inside",
          color: "green",
        },
        {
          data: chartData.map((item) => item.scale3),
          label: "Humidity Outside",
          color: "red",
        },
      ]}
      width={600}
      height={400}
    />
  );
}
