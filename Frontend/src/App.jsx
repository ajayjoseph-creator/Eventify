import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import ProtectedRoute from "./components/protectedRouter.jsx";
import PublicEvent from "./components/PublicEvent.jsx";
import WelcomeAnimation from "./components/WelcomeAnimation.jsx";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // After welcome animation ends, check if user is logged in
    if (!showWelcome) {
      const token = localStorage.getItem("token"); // assuming you store JWT token
      if (!token) {
        navigate("/login"); // redirect to login if not authenticated
      }
    }
  }, [showWelcome, navigate]);

  if (showWelcome) {
    return <WelcomeAnimation onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/events/public/:publicLink" element={<PublicEvent />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
