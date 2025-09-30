import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api.js";
import { toast } from "react-toastify";

const PublicEvent = () => {
  const { publicLink } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/api/events/public/${publicLink}`);
        setEvent(res.data);
      } catch (err) {
        toast.error("Event not found");
      }
    };
    fetchEvent();
  }, [publicLink]);

  if (!event)
    return <p className="text-center mt-20 text-green-700 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full space-y-4">
        <h2 className="text-3xl font-bold text-green-800">{event.title}</h2>
        <p className="text-green-700">
          <strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}
        </p>
        <p className="text-green-700">
          <strong>Location:</strong> {event.location}
        </p>
        {event.description && (
          <p className="text-green-700">
            <strong>Description:</strong> {event.description}
          </p>
        )}
        <p className="text-green-600 text-sm">
          <strong>Created At:</strong> {new Date(event.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PublicEvent;
