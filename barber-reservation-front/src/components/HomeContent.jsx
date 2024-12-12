import React, { useState, useEffect } from "react";
import { getCurrentUser } from "./../services/user";
import { getUserAppointments, cancelAppointment } from "./../services/api";
import { Link } from "react-router-dom";

const HomeContent = () => {
  const user = getCurrentUser();

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchUserAppointments = async () => {
    try {
      setError(null);
      const response = await getUserAppointments(user?.id);
      console.log(response);

      const appointmentsArray = Array.isArray(response)
        ? response
        : response.data;

      if (!appointmentsArray || !Array.isArray(appointmentsArray)) {
        throw new Error(
          "Invalid response format. Expected an array of appointments."
        );
      }

      const now = new Date();

      const updatedAppointments = appointmentsArray.map((appointment) => {
        const appointmentDate = new Date(appointment.dateTime);
        return {
          ...appointment,
          status: appointmentDate > now ? "upcoming" : "passed",
          time: appointmentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: appointmentDate.toLocaleDateString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
      });

      updatedAppointments.sort((a, b) => {
        if (a.status === "upcoming" && b.status === "passed") return -1;
        if (a.status === "passed" && b.status === "upcoming") return 1;
        return new Date(a.dateTime) - new Date(b.dateTime);
      });

      setAppointments(updatedAppointments);
    } catch (err) {
      setError(`Fetch User Appointments Error: ${err.message}`);
    }
  };

  useEffect(() => {
    handleFetchUserAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    const isConfirmed = window.confirm(
      "This appointment will be lost permanently. Are you sure you want to cancel?"
    );
    if (!isConfirmed) return;

    try {
      await cancelAppointment(appointmentId);
      handleFetchUserAppointments();
    } catch (err) {
      alert("Failed to cancel the appointment. Please try again.");
      console.error(
        "Error canceling appointment:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="h-[100vh] bg-white overflow-y-scroll no-scrollbar">
      <div className="flex-none p-6">
        <h1 className="text-2xl font-bold text-gray-700">
          Welcome, Mr {user?.lastname}
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          We are glad to have you here. Explore your upcoming appointments and
          manage your reservations seamlessly.
        </p>
      </div>

      <div className="flex-1 h-fit min-h-[80vh] px-6 py-4">
        <div className="flex justify-between align-middle my-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Appointments
          </h2>
          <Link
            to={"/reservations"}
            className="px-3 py-2 bg-blue-900 text-white font-semibold rounded-md transition"
          >
            Book Appointment
          </Link>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
                onClick={() => handleCancelAppointment(appointment.id)}
                className="absolute right-4 top-4 px-3 py-2 bg-red-400 text-white font-semibold rounded-md shadow-md transition"
              >
                Cancel
              </button>
            )}
          </div>
        ))}

        {appointments.length === 0 && !error && (
          <div className="text-center text-gray-500 mt-6 flex justify-center items-center min-h-[60vh] shadow-md bg-slate-50">
            <p>No upcoming appointments. Book now to secure your spot!</p>
          </div>
        )}
      </div>

      <footer className="bg-white text-black p-4 shadow-md">
        <div className="text-center text-sm">
          © {new Date().getFullYear()} YourBarberApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeContent;
