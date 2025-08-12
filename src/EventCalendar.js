import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import showEventDetails from "./Modal";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events }) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => showEventDetails(event)}
      />
    </div>
  );
};

export default EventCalendar;
