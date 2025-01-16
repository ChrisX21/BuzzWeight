import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg shadow-lg bg-white">
      <div className="flex flex-col">
        <label
          htmlFor="start-date"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onChange([date, endDate])}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select start date"
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-[#e9ab17] focus:outline-none"
          id="start-date"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="end-date"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => onChange([startDate, date])}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          //@ts-ignore
          minDate={startDate}
          placeholderText="Select end date"
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-[#e9ab17] focus:outline-none"
          id="end-date"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
