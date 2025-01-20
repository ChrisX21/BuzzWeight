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

export function aggregateScalesSensorData(sensorData: any[]) {
  const scales = ["scale1", "scale2", "scale3", "scale4"];

  const groupedData = sensorData.reduce((acc, item) => {
    const { created_at, sensor, value, trailerId } = item;

    // Only process sensors that match the desired scales
    if (scales.includes(sensor)) {
      // Check if the created_at timestamp already exists in the accumulator
      if (!acc[created_at]) {
        acc[created_at] = { trailerId, created_at };
      }

      // Add the sensor data to the corresponding timestamp group
      acc[created_at][sensor] = value;
    }

    return acc;
  }, {});

  // Convert the object back to an array and filter out any incomplete entries
  return Object.values(groupedData).filter((entry: any) => 
    scales.every(scale => scale in entry) // Ensure all scales exist in the final object
  );
}

export function aggregateTempSensorData(sensorData: any[]) {
  const scales = ["temp1", "temp2", "temp3"];

  const groupedData = sensorData.reduce((acc, item) => {
    const { created_at, sensor, value, trailerId } = item;

    // Only process sensors that match the desired scales
    if (scales.includes(sensor)) {
      // Check if the created_at timestamp already exists in the accumulator
      if (!acc[created_at]) {
        acc[created_at] = { trailerId, created_at };
      }

      // Add the sensor data to the corresponding timestamp group
      acc[created_at][sensor] = value;
    }

    return acc;
  }, {});

  // Convert the object back to an array and filter out any incomplete entries
  return Object.values(groupedData).filter((entry: any) => 
    scales.every(scale => scale in entry) // Ensure all scales exist in the final object
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
