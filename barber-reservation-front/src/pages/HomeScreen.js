import React from "react";
import NavBar from "../components/NavBar";
import HomeContent from "../components/HomeContent";

const HomeScreen = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar with 1/8 width */}
      <div className="w-1/8">
        <NavBar />
      </div>

      {/* Main content with 7/8 width */}
      <div className="flex-1 h-fit bg-slate-400 overflow-y-scroll no-scrollbar">
        <HomeContent />
      </div>
    </div>
  );
};

export default HomeScreen;
