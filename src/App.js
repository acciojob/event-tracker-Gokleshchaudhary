import React, { useState } from "react";
import CalendarView from "./components/Calendar";
import EventForm from "./components/EventForm";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState(null);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const filteredEvents = filter
    ? events.filter((e) => e.type === filter)
    : events;

  return (
    <div className="app-container">
      <h1>📅 Event Tracker Calendar</h1>
      <EventForm addEvent={addEvent} />
      <FilterButtons setFilter={setFilter} />
      <CalendarView events={filteredEvents} />
    </div>
  );
}

export default App;
