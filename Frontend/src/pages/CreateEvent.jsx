import React, { useState } from "react";
import API from "../utils/api.js";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/events", { title, dateTime, location, description });
      toast.success("Event created successfully!");
      setTitle("");
      setDateTime("");
      setLocation("");
      setDescription("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-2xl bg-green-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
