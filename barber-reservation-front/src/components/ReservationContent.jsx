import React, { useState } from "react";
import Header from "./ReservationHeader";

// Example barber data with reservation tracking
const initialBarbers = [
  {
    name: "Savannah",
    image: "https://via.placeholder.com/50",
    reserved: ["09:00", "10:00"],
  },
  {
    name: "Kristin",
    image: "https://via.placeholder.com/50",
    reserved: ["12:00", "13:00"],
  },
  {
    name: "Jane",
    image: "https://via.placeholder.com/50",
    reserved: ["15:00", "16:00"],
  },
  {
    name: "Devon",
    image: "https://via.placeholder.com/50",
    reserved: ["10:00", "14:00"],
  },
  {
    name: "Wade",
    image: "https://via.placeholder.com/50",
    reserved: ["11:00", "15:00"],
  },
  {
    name: "Arlene",
    image: "https://via.placeholder.com/50",
    reserved: ["16:00", "17:00"],
  },
];

const generateTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 9; hour < 20; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    if (hour < 12 || hour >= 14) {
      timeSlots.push(formattedHour);
    }
  }
  return timeSlots;
};

const ReservationContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const timeSlots = generateTimeSlots();
  const [barberData, setBarberData] = useState(initialBarbers);

  const handleSlotClick = (barberIndex, time) => {
    const barber = barberData[barberIndex];
    const isReserved = barber.reserved.includes(time);

    if (!isReserved) {
      const confirmReservation = window.confirm(
        `Do you want to reserve ${time} with ${barber.name}?`
      );

      if (confirmReservation) {
        const updatedBarbers = [...barberData];
        updatedBarbers[barberIndex].reserved.push(time);
        setBarberData(updatedBarbers);
      }
    }
  };

  return (
    <div className="h-full overflow-scroll no-scrollbar">
      <div className="h-[120vh] flex flex-col overflow-hidden bg-slate-100 pb-10">
        {/* Header section */}
        <div className="flex-none">
          <Header
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {/* Scrollable barber & reservation section */}
        <div
          className="flex-1 overflow-x-auto no-scrollbar bg-gray-100 border-t mx-11 mt-4"
          style={{
            scrollSnapType: "x mandatory", // Enables snap scrolling horizontally
          }}
        >
          <div className="flex h-full">
            {barberData.map((barber, index) => (
              <div
                key={index}
                className="flex flex-col bg-white min-w-64 max-w-64 items-center shadow-lg border border-gray-200"
                style={{
                  scrollSnapAlign: "start", // Align each column to start
                }}
              >
                {/* Barber Header */}
                <div className="flex flex-row content-center items-center bg-gradient-to-r text-white p-6 shadow-md w-full">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-12 h-12 rounded-full border-1 border-blue-900 shadow-lg"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-700">
                      {barber.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      Expert Barber
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="flex-1 w-full overflow-y-auto no-scrollbar px-2 py-1">
                  {timeSlots.map((time, idx) => {
                    const isReserved = barber.reserved.includes(time);

                    return (
                      <button
                        key={idx}
                        className={`text-sm w-full py-10 my-1 transition cursor-pointer`}
                        style={{
                          backgroundColor: isReserved
                            ? "rgba(128, 128, 128, 0.5)"
                            : "rgba(99, 102, 241, 0.8)",
                          color: "white",
                          opacity: isReserved ? 0.6 : 1,
                        }}
                        onClick={() => handleSlotClick(index, time)}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 text-white p-4 shadow-md">
        <div className="text-center text-sm text-gray-800">
          © {new Date().getFullYear()} YourBarberApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ReservationContent;
