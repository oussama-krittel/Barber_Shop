import React, { useState, useEffect } from "react";
import Header from "./ReservationHeader";
import { getBusyPeriods, reserveAppointment } from "../services/api";
import { getCurrentUser } from "../services/user";

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

  const dateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const [barberData, setBarberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const fetchBusyPeriods = async () => {
      setLoading(true);
      setError(null);

      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await getBusyPeriods(formattedDate);
        const updatedBarbers = response.data.map((barber) => ({
          id: barber.id,
          name: barber.name,
          image: "https://via.placeholder.com/50",
          reserved: (barber.appointments || []).map((appointment) => {
            const formattedHour =
              appointment < 10 ? `0${appointment}:00` : `${appointment}:00`;
            return formattedHour;
          }),
        }));

        setBarberData(updatedBarbers);
      } catch (err) {
        setError(`Error fetching busy periods: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBusyPeriods();
  }, [selectedDate]);

  const handleSlotClick = async (barberIndex, time) => {
    const barber = barberData[barberIndex];
    const isReserved = barber.reserved.includes(time);

    if (!isReserved) {
      const confirmReservation = window.confirm(
        `Do you want to reserve ${time} with ${barber.name}?`
      );

      if (confirmReservation) {
        try {
          const formattedTime = `${
            selectedDate.toISOString().split("T")[0]
          }T${time}:00`;

          const response = await reserveAppointment(
            getCurrentUser().id,
            barber.id,
            formattedTime
          ); // Adjust IDs as necessary

          console.log(response);

          const updatedBarbers = [...barberData];
          updatedBarbers[barberIndex].reserved.push(time);
          setBarberData(updatedBarbers);
        } catch (err) {
          window.alert(`${err.response.data}`);
        }
      }
    }
  };

  // Strip hours from dates to compare only by date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight
  const selectedDateOnly = new Date(selectedDate);
  selectedDateOnly.setHours(0, 0, 0, 0); // Reset to midnight

  const isPastDate = selectedDateOnly < today; // Check if selected date is before today

  return (
    <div className="h-full overflow-scroll no-scrollbar">
      <div className="h-[120vh] flex flex-col overflow-hidden bg-slate-100 pb-10">
        {/* Header section */}
        <div className="flex-none">
          <Header selectedDate={selectedDate} setSelectedDate={dateChange} />
        </div>

        {/* Check for past date */}
        {isPastDate ? (
          <div
            className="flex-1 flex items-center justify-center"
            style={{ textAlign: "center" }}
          >
            <div
              className="text-blue-900 font-bold text-lg"
            >
              Select a future date
            </div>
          </div>
        ) : loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-500">Loading...</div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <div
            className="flex-1 overflow-x-auto no-scrollbar bg-gray-100 border-t mx-11 mt-4"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            <div className="flex h-full">
              {barberData.map((barber, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white min-w-64 max-w-64 items-center shadow-lg border border-gray-200"
                  style={{
                    scrollSnapAlign: "start",
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
                            borderRadius: "4px",
                            textAlign: "center",
                          }}
                          onClick={() => handleSlotClick(index, time)}
                          disabled={isReserved}
                        >
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-lg">{time}</span>{" "}
                            <span className="text-sm">
                              {isReserved ? "Reserved" : "Available"}{" "}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
