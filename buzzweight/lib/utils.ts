import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Date(date).toLocaleString('en-GB', options);
}


// A single row as stored in the `sensors` table.
export interface SensorRow {
  sensor: string;
  value: number;
  trailerId: number;
  created_at: string;
  batch_id?: string | null;
}

// One reconstituted reading: a group of rows pivoted into { sensorName: value }.
export interface AggregatedReading {
  trailerId: number;
  created_at: string;
  [sensor: string]: number | string;
}

// Rows from one POST share a batch_id. Legacy rows (pre-batch_id) fall back to
// grouping by created_at, which is safe because a batched insert shares now().
function groupKey(item: SensorRow): string {
  return item.batch_id ?? item.created_at;
}

function pivot(sensorData: SensorRow[], allowed?: string[]): AggregatedReading[] {
  const groupedData = sensorData.reduce<Record<string, AggregatedReading>>((acc, item) => {
    const { created_at, sensor, value, trailerId } = item;

    if (allowed && !allowed.includes(sensor)) {
      return acc;
    }

    const key = groupKey(item);
    if (!acc[key]) {
      acc[key] = { trailerId, created_at };
    }
    acc[key][sensor] = value;

    return acc;
  }, {});

  return Object.values(groupedData);
}

export function aggregateSensorData(sensorData: SensorRow[]): AggregatedReading[] {
  return pivot(sensorData);
}

export function aggregateScalesSensorData(sensorData: SensorRow[]): AggregatedReading[] {
  const scales = ["scale1", "scale2", "scale3", "scale4"];
  // Keep any reading that has at least one scale present so a single offline
  // sensor doesn't drop the whole reading from the chart.
  return pivot(sensorData, scales).filter((entry) =>
    scales.some((scale) => scale in entry),
  );
}

export function aggregateTempSensorData(sensorData: SensorRow[]): AggregatedReading[] {
  const temps = ["temp1", "temp2", "temp3"];
  return pivot(sensorData, temps).filter((entry) =>
    temps.some((temp) => temp in entry),
  );
}

export function averageSensorData(sensorData: any[]) {
  return sensorData.map(item => {
    const scales = ["scale1", "scale2", "scale3", "scale4"];

    // Calculate the average of scale values
    const total = scales.reduce((sum, scale) => sum + (item[scale] || 0), 0);
    const average = total / scales.length;

    // Return the desired output format
    return {
      trailerId: item.trailerId,
      created_at: item.created_at,
      average: parseFloat(average.toFixed(2)), // Limit to 2 decimal places
    };
  });
}

export function averageWeatherData(sensorData: any[]) {
  return sensorData.map(item => {
    const temps = ["temp1", "temp2", "temp3"];

    // Calculate the average of temp values
    const total = temps.reduce((sum, temp) => sum + (item[temp] || 0), 0);
    const average = total / temps.length;

    // Return the desired output format
    return {
      trailerId: item.trailerId,
      created_at: item.created_at,
      average: parseFloat(average.toFixed(2)), // Limit to 2 decimal places
    };
  });
}
