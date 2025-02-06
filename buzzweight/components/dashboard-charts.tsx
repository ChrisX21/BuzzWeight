import HiveChart from "@/components/hive-chart";
import ScalesChart from "@/components/scales-chart";
import WeatherChart from "@/components/weather-chart";
import HumidityChart from "@/components/humidity-chart";

interface SensorData {
  sensorData: {
    sensor: string;
    value: number;
    created_at: string;
  }[];
}

export default function DashboardCharts({ data }: { data: SensorData }) {
  return (
    <div className="grid grid-cols-1 lg:min-w-[1200px] lg:grid-cols-2 gap-6 mt-6">
      <div className="text-center bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Scale Sensors
        </h2>
        <div className="mb-8">
          <HiveChart data={data} />
        </div>
        <div className="mt-3">
          <ScalesChart data={data} />
        </div>
      </div>
      <div className="text-center bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Weather Station
        </h2>
        <div className="mb-8">
          <WeatherChart data={data} />
        </div>
        <div className="mt-3">
          <HumidityChart data={data} />
        </div>
      </div>
    </div>
  );
}
