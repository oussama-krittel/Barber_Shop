import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import HomeScreen from "./pages/HomeScreen";
import ReservationScreen from "./pages/ReservationScreen";
import ContactScreen from "./pages/ContactScreen";
import LoginView from "./pages/LoginScreen";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/reservations" element={<ReservationScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
      </Routes>
    </Router>
  ) : (
    <LoginView />
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
