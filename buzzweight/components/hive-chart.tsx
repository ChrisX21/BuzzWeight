import { LineChart } from "@mui/x-charts";
import { formatDate } from "@/lib/utils";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function HiveChart({ data }: { data: SensorData }) {
  const hiveSensor = data.sensorData.map((item) => ({
    x: formatDate(item.created_at),
    //@ts-ignore
    y: item.scaleH,
  }));

  return (
    <LineChart
      xAxis={[{ scaleType: "band", data: hiveSensor.map((d) => d.x) }]}
      series={[
        {
          data: hiveSensor.map((item) => item.y),
          label: "Hive Scale",
        },
      ]}
      colors={["#e9ab17"]}
      width={600}
      height={400}
    />
  );
}
