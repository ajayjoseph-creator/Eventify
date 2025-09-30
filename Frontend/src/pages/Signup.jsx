import React, { useState } from "react";
import API from "../utils/api.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await API.post("/api/auth/register", { name, email, password });
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Signup failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 transition-transform hover:scale-110"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 transition-transform hover:scale-110"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-green-900 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-900 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="w-full md:w-1/2 bg-green-900 text-white flex flex-col justify-center items-start p-6">
          <motion.h3
            className="text-2xl font-semibold mb-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Track Your Events Effortlessly
          </motion.h3>
          <motion.p
            className="mb-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Plan, organize, and monitor your events with ease. Get real-time
            updates and stay on top of all your schedules.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
