import HiveChart from "@/components/hive-chart";
import ScalesChart from "@/components/scales-chart";
import WeatherChart from "./weather-chart";
import HumidityChart from "./humidity-chart";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function DashboardCharts({ data }: { data: SensorData }) {
  return (
    <>
      <div className="flex justify-between">
        <div className="text-center shadow-lg rounded mt-5 ml-6">
          <div className="w-full md:w-1/2 p-2">
            <h2 className="text-lg font-semibold ">Scale Sensors</h2>
            <HiveChart data={data} />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <ScalesChart data={data} />
          </div>
        </div>
        <div className="text-center shadow-lg rounded mt-5 ml-5">
          <div className="w-full md:w-1/2 p-2">
            <h2 className="text-lg font-semibold">Weather Station</h2>
            <WeatherChart data={data} />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <HumidityChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
