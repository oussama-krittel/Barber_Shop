import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const Header = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateClick = (e) => {
    e.stopPropagation();
    setShowCalendar((prev) => !prev);
  };

  const handleTodayClick = (e) => {
    e.stopPropagation();
    setSelectedDate(new Date());
    setShowCalendar(false);
  };

  const changeDate = (days) => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  };

  return (
    <div className="flex items-center justify-between bg-slate-100 px-5 py-6 border-b relative">
      {/* Left Section */}
      <div className="text-left">
        <span className="text-2xl font-bold font-cursive text-blue-900">
          Pick an Appointement
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Today Button */}
        <button
          onClick={handleTodayClick}
          className="px-4 py-2 text-sm bg-yellow-400 text-blue-900 opacity-90 font-bold rounded-md shadow hover:bg-yellow-500"
        >
          Today
        </button>

        {/* Left Navigation */}
        <button
          onClick={() => changeDate(-1)}
          className="px-2 py-1 text-blue-900 bg-yellow-300 font-semibold rounded-md hover:bg-yellow-400"
        >
          &lt;
        </button>

        {/* Calendar */}
        <div>
          <button
            onClick={handleDateClick}
            className="px-4 py-2 text-sm bg-white border rounded-md shadow hover:bg-gray-200"
          >
            {format(selectedDate, "MMM dd, yyyy")}
          </button>
          {showCalendar && (
            <div
              className="absolute top-14 right-0 bg-white border rounded-md shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  date.setHours(12);
                  setSelectedDate(date || new Date());
                  setShowCalendar(false);
                }}
                className="p-5"
              />
            </div>
          )}
        </div>

        {/* Right Navigation */}
        <button
          onClick={() => changeDate(1)}
          className="px-2 py-1 text-blue-900 bg-yellow-300 font-semibold rounded-md hover:bg-yellow-400"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Header;
