import React from "react";
import NavBar from "../components/NavBar";
import ReservationContent from "../components/ReservationContent";

const ReservationScreen = () => {
  return (
    <div className="h-screen w-screen flex ">
      {/* Sidebar with fixed width */}
      <div className="w-1/10 flex-none">
        <NavBar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <ReservationContent />
      </div>
      
    </div>
  );
};

export default ReservationScreen;
