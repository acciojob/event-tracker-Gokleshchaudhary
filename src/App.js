import React, { useState } from "react";
import EventCalendar from "./EventCalendar";

const App = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (title, start, end) => {
    if (!title || !start || !end) return;
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end)
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calendar App</h1>
      <EventForm addEvent={addEvent} />
      <EventCalendar events={events} />
    </div>
  );
};

const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(title, start, end);
    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default App;
