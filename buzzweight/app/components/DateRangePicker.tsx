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
    <div className="flex space-x-4">
      <DatePicker
        selected={startDate}
        onChange={(date) => onChange([date, endDate])}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="border rounded p-2"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => onChange([startDate, date])}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        //@ts-ignore
        minDate={startDate}
        placeholderText="End Date"
        className="border rounded p-2"
      />
    </div>
  );
};

export default DateRangePicker;
