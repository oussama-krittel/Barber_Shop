import React, { useState } from "react";

// Sample JSON data with upcoming and passed appointments
const sampleAppointments = [
  {
    id: 5,
    barberName: "Kristin",
    time: "3:00 PM",
    date: "Dec 30, 2023",
    status: "upcoming",
  },
  {
    id: 1,
    barberName: "Savannah",
    time: "10:00 AM",
    date: "Dec 15, 2023",
    status: "passed",
  },
  {
    id: 2,
    barberName: "Jane",
    time: "2:00 PM",
    date: "Dec 20, 2023",
    status: "passed",
  },
  {
    id: 3,
    barberName: "Devon",
    time: "9:30 AM",
    date: "Dec 22, 2023",
    status: "passed",
  },
  {
    id: 4,
    barberName: "Arlene",
    time: "11:00 AM",
    date: "Dec 24, 2023",
    status: "passed",
  },
];

const HomeContent = () => {
  const [appointments] = useState(
    sampleAppointments.sort((a, b) => {
      // Sort so that the upcoming appointment comes first
      if (a.status === "upcoming") return -1;
      if (b.status === "upcoming") return 1;
      return 0;
    })
  );

  const handleBookAppointment = () => {
    alert("Booking appointment action triggered!");
  };

  return (
    <div className="h-[100vh]  bg-white overflow-y-scroll no-scrollbar  ">
      {/* Main Content Header Section*/}
      <div className="flex-none  p-6">
        <h1 className="text-2xl font-bold text-gray-700">Welcome, John Doe!</h1>
        <p className="text-gray-500 mt-2 text-sm">
          We are glad to have you here. Explore your upcoming appointments and
          manage your reservations seamlessly.
        </p>
      </div>

      <div className="flex-1 h-fit   px-6 py-4 ">
        <div className="flex justify-between align-middle my-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Appointments
          </h2>
          <button
            onClick={handleBookAppointment}
            className="  px-3 py-2 bg-blue-900 text-white font-semibold rounded-md transition"
          >
            Book Appointment
          </button>
        </div>

        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`relative bg-white shadow-md shadow-gray-200 p-4 mb-4 rounded-md ${
              appointment.status === "upcoming"
                ? "border-l-4 border-blue-500"
                : "border-l-4 border-gray-400"
            }`}
          >
            <div>
              <p className="text-sm text-gray-700">
                Appointment with {appointment.barberName} - {appointment.time}{" "}
                on {appointment.date}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {appointment.status}
              </p>
            </div>

            {appointment.status === "upcoming" && (
              <button
                onClick={handleBookAppointment}
                className="absolute right-4 top-4 px-3 py-2 bg-red-400 text-white font-semibold rounded-md shadow-md transition"
              >
                cancel
              </button>
            )}
          </div>
        ))}

        {/* No Appointments Placeholder */}
        {appointments.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            <p>No upcoming appointments. Book now to secure your spot!</p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-white text-black p-4 shadow-md">
        <div className="text-center text-sm">
          © {new Date().getFullYear()} YourBarberApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeContent;
