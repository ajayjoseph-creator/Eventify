import React, { useEffect, useState } from "react";
import API from "../utils/api.js";
import { toast } from "react-toastify";
import { FiClipboard, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/api/events");
      const allEvents = res.data;

      const now = new Date();
      const filtered =
        filter === "upcoming"
          ? allEvents.filter((e) => new Date(e.dateTime) >= now)
          : allEvents.filter((e) => new Date(e.dateTime) < now);

      setEvents(filtered);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/api/events/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleCopyLink = (publicLink) => {
    const url = `${window.location.origin}/events/public/${publicLink}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Your Events
        </h2>

      
        <div className="flex justify-center mb-6 space-x-4 flex-wrap">
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "upcoming"
                ? "bg-green-600 text-white"
                : "bg-green-200 text-green-800"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "past"
                ? "bg-green-600 text-white"
                : "bg-green-200 text-green-800"
            }`}
          >
            Past
          </button>
        </div>

 
        {events.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-green-700 text-lg mb-4">No events found</p>
            <button
              onClick={() => navigate("/create-event")}
              className="px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-green-50 p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                {/* Event Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-800">
                    {event.title}
                  </h3>
                  <p className="text-green-700 mt-1">
                    <strong>Date & Time:</strong>{" "}
                    {new Date(event.dateTime).toLocaleString()}
                  </p>
                  <p className="text-green-700">
                    <strong>Location:</strong> {event.location}
                  </p>
                  {event.description && (
                    <p className="text-green-700 mt-1">
                      <strong>Description:</strong> {event.description}
                    </p>
                  )}
                  <p className="text-green-600 mt-1 text-sm">
                    <strong>Created At:</strong>{" "}
                    {new Date(event.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex mt-4 sm:mt-0 space-x-3">
                  <button
                    onClick={() => handleCopyLink(event.publicLink)}
                    className="hover:text-green-900 text-green-500 p-3 rounded transition flex items-center justify-center"
                    title="Copy Share Link"
                  >
                    <FiClipboard size={22} />
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="hover:text-red-900 text-red-500 p-3 rounded transition flex items-center justify-center"
                    title="Delete Event"
                  >
                    <FiTrash2 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
