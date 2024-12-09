import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ReservationScreen from "./pages/ReservationScreen";
import LoginView from "./pages/LoginScreen";
import ContactScreen from "./pages/ContactScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/reservations" element={<ReservationScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
