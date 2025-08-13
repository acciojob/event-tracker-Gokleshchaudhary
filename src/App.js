import React, { useState } from "react";
import Calendar from "./components/Calendar";
import FilterButtons from "./components/FilterButtons";
import moment from "moment";

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  const addEvent = (event) => setEvents([...events, event]);
  const updateEvent = (updatedEvent) =>
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  const deleteEvent = (id) =>
    setEvents(events.filter(ev => ev.id !== id));

  const filteredEvents = events.filter(ev => {
    if (filter === "all") return true;
    if (filter === "past") return moment(ev.start).isBefore(moment(), "day");
    if (filter === "upcoming") return moment(ev.start).isSameOrAfter(moment(), "day");
    return true;
  });

  return (
    <div>
      <h2>Event Tracker Calendar</h2>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <Calendar
        events={filteredEvents}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
    </div>
  );
}

export default App;
