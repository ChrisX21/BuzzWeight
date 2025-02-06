import { formatDate } from "@/lib/utils";
import React from "react";

export default function SensorsTable({ sensorData }: any) {
  return (
    <div className="mt-5 w-full max-w-[95vw] mx-auto">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="overflow-x-auto max-h-96">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Scale 1",
                    "Scale 2",
                    "Scale 3",
                    "Scale 4",
                    "Temp Outside",
                    "Temp Inside",
                    "Temp Hive",
                    "Humidity Outside",
                    "Humidity Inside",
                    "Humidity Hive",
                    "Date",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="whitespace-nowrap p-4 text-sm font-semibold text-gray-700 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {sensorData.map((sensor: any, index: number) => (
                  <tr
                    key={index}
                    className={`hover:shadow-md transition-shadow ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.scale1} g
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.scale2} g
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.scale3} g
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.scale4} g
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.temp1}°C
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.temp2}°C
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.temp3}°C
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.hum1}%
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.hum2}%
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {sensor.hum3}%
                    </td>
                    <td className="whitespace-nowrap p-3 text-center text-gray-800">
                      {formatDate(sensor.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
