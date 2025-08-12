import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popup from "react-popup";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  // Add your event handlers here for add/edit/delete

  // Filter events based on filter state
  const filteredEvents = events.filter((event) => {
    if (filter === "past") return moment(event.start).isBefore(moment(), "day");
    if (filter === "upcoming") return moment(event.start).isSameOrAfter(moment(), "day");
    return true; // all
  });

  const eventStyleGetter = (event) => {
    const isPast = moment(event.start).isBefore(moment(), "day");
    const backgroundColor = isPast ? "rgb(222, 105, 135)" : "rgb(140, 189, 76)";
    return { style: { backgroundColor, color: "white" } };
  };

  return (
    <div>
      <div className="filters">
        <button className="btn" onClick={() => setFilter("all")}>All</button>
        <button className="btn" onClick={() => setFilter("past")}>Past</button>
        <button className="btn" onClick={() => setFilter("upcoming")}>Upcoming</button>
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => {
          // open edit/delete popup here
          Popup.alert(`Event: ${event.title}`);
        }}
        onSelectSlot={(slotInfo) => {
          // open create event popup here
          Popup.alert(`Create event on ${slotInfo.start.toLocaleDateString()}`);
        }}
        selectable
      />
    </div>
  );
};

export default EventCalendar;

