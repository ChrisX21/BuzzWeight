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


export function aggregateSensorData(sensorData: any[]) {
  const groupedData = sensorData.reduce((acc, item) => {
      const { created_at, sensor, value, trailerId } = item;

      // Check if the created_at timestamp already exists in the accumulator
      if (!acc[created_at]) {
          acc[created_at] = { trailerId, created_at };
      }

      // Add the sensor data to the corresponding timestamp group
      acc[created_at][sensor] = value;

      return acc;
  }, {});

  // Convert the object back to an array
  return Object.values(groupedData);
}