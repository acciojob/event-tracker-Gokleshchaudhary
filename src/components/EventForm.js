import React, { useState, useEffect } from "react";
import moment from "moment";

const EventForm = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedSlot,
  selectedEvent,
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setLocation(selectedEvent.location);
      setStart(moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm"));
      setEnd(moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm"));
    } else if (selectedSlot) {
      setStart(moment(selectedSlot.start).format("YYYY-MM-DDTHH:mm"));
      setEnd(moment(selectedSlot.end).format("YYYY-MM-DDTHH:mm"));
      setTitle("");
      setLocation("");
    }
  }, [selectedEvent, selectedSlot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title,
      location,
      start: new Date(start),
      end: new Date(end),
    };
    onSave(eventData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-content">
      <h2>{selectedEvent ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="popup-input"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="popup-input"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div>
          <label>Start:</label>
          <input
            type="datetime-local"
            className="popup-input"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End:</label>
          <input
            type="datetime-local"
            className="popup-input"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className="popup-buttons">
          {selectedEvent && (
            <button
              type="button"
              className="mm-popup__btn--danger"
              onClick={() => {
                onDelete(selectedEvent);
                onClose();
              }}
            >
              Delete
            </button>
          )}
          <button type="button" className="mm-popup__btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="mm-popup__btn mm-popup__btn--primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
