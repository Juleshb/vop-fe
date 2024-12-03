import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Icon } from "@iconify/react";

const EventsCards = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all events from the API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Error fetching events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-teal"></div>

          {events.map((event, index) => (
            <div
              key={event.event_id}
              className={`mb-10 flex justify-${
                index % 2 === 0 ? "start" : "end"
              } items-center w-full`}
            >
              {/* Event Card */}
              <div
                className={`relative bg-white p-4 rounded-lg shadow-md w-2/5 ${
                  index % 2 === 0 ? "mr-6" : "ml-6"
                }`}
              >
                <h3 className="text-xl font-semibold text-teal flex items-center">
                  <Icon
                    icon="material-symbols:calendar-month-outline"
                    className="mr-2 text-teal"
                  />
                  {event.event_name}
                </h3>
                <p className="text-sm text-gray-500">
                  Date: {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-teal text-white flex items-center justify-center rounded-full shadow">
                <Icon icon="material-symbols:event" className="text-xl" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsCards;
