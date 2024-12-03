import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Icon } from "@iconify/react";

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the event being edited
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    location: "",
    description: "",
  });

  // Fetch all events
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for creating or editing an event
  const openModal = (event = null) => {
    if (event) {
      // Edit mode
      setSelectedEvent(event);
      setFormData({
        event_name: event.event_name,
        event_date: event.event_date.split("T")[0], // Format date for input
        location: event.location,
        description: event.description,
      });
    } else {
      // Create mode
      setSelectedEvent(null);
      setFormData({ event_name: "", event_date: "", location: "", description: "" });
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  // Submit form to create or update an event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { event_name, event_date, location, description } = formData;

    if (!event_name || !event_date || !location || !description) {
      alert("All fields are required.");
      return;
    }

    try {
      setSaving(true);
      if (selectedEvent) {
        // Update event
        await axiosInstance.put("/events", { ...formData, event_id: selectedEvent.event_id });
        alert("Event updated successfully!");
      } else {
        // Create event
        await axiosInstance.post("/events", formData);
        alert("Event created successfully!");
      }
      fetchEvents(); // Refresh event list
      closeModal();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">

      {/* Create Event Button */}
      <div className="text-right mb-6">
        <button
          onClick={() => openModal()}
          className="bg-Teal text-white px-6 py-2 rounded hover:bg-green-800 focus:ring-2 focus:ring-blue-400"
        >
          Create Event
        </button>
      </div>

      {/* Events List */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white p-4 border border-Teal  flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{event.event_name}</h3>
                <p className="text-sm bg-green-100 line-clamp-3 text-green-800 rounded-lg mb-2">{event.description}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Location: {event.location}</p>
                <p className="text-sm text-gray-600">
                  Organized By: {event.organized_by || "Unknown"}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openModal(event)}
                  className="text-green-800 hover:underline"
                >
                   <Icon icon="ep:edit" width="20" height="20" />
                </button>
                <button
                  onClick={() => alert("Delete not implemented yet")}
                  className="text-red-500 hover:underline"
                >
                  <Icon icon="fluent:delete-20-regular" width="20" height="20" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedEvent ? "Edit Event" : "Create a New Event"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Event Name</label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter event name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-Teal text-white px-6 py-2 rounded hover:bg-green-800 focus:ring-2 focus:ring-blue-400"
                  disabled={saving}
                >
                  {saving ? "Saving..." : selectedEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManager;
