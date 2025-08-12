import React, { useState } from "react";
import EventCalendar from "./EventCalendar";
import Popup from "react-popup";

const App = () => {
  return (
    <div>
      <h1>Event Tracker</h1>
      <EventCalendar />
      <Popup />
    </div>
  );
};

export default App;
