import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import ProtectedRoute from "./components/protectedRouter.jsx";
import PublicEvent from "./components/PublicEvent.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Route
    path="/"
    element={
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <h1 className="text-4xl font-bold text-green-900">Welcome to Eventify</h1>
      </div>
    }
  />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> }  />
        <Route path="/create-event" element={ <ProtectedRoute> <CreateEvent /> </ProtectedRoute>      } />
        <Route path="/events/public/:publicLink" element={<PublicEvent />} />
      </Routes>

      {/* Toast container goes here */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
