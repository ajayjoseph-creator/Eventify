import React, { useState, useContext } from "react";
import API from "../utils/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      login(res.data);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex w-full max-w-4xl h-[600px] shadow-lg rounded-lg overflow-hidden">
      
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-900 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-900 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

    
      <div className="w-1/2 bg-green-900 text-white flex flex-col justify-center items-start p-8">
        <h3 className="text-2xl font-semibold mb-4">Track Your Events Effortlessly</h3>
        <p className="mb-6">
           Plan, organize, and monitor your events with ease. Get real-time updates and stay on top of all your schedules.
        </p>
        
      </div>
    </div>
  </div>
);

};

export default Signup;
