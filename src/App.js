import React, { useState } from "react";
import EventCalendar from "./EventCalendar";
import moment from "moment";

function App() {
  const [events, setEvents] = useState([]);

  const handleAddEvent = (title, start, end) => {
    const newEvent = {
      title,
      start: moment(start).toDate(),
      end: moment(end).toDate(),
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calendar App</h1>
      <EventCalendar events={events} onAddEvent={handleAddEvent} />
    </div>
  );
}

export default App;
