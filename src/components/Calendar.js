import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popup from "react-popup";
import EventPopup from "./EventPopup";

const localizer = momentLocalizer(moment);

function Calendar({ events, addEvent, updateEvent, deleteEvent }) {
  const [popupInfo, setPopupInfo] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setPopupInfo({ type: "create", start });
    Popup.open(EventPopup, {
      type: "create",
      start,
      onSave: (event) => {
        addEvent(event);
        Popup.close();
      }
    });
  };

  const handleSelectEvent = (event) => {
    setPopupInfo({ type: "edit", event });
    Popup.open(EventPopup, {
      type: "edit",
      event,
      onSave: (updatedEvent) => {
        updateEvent(updatedEvent);
        Popup.close();
      },
      onDelete: () => {
        deleteEvent(event.id);
        Popup.close();
      }
    });
  };

  // Color events
  const eventPropGetter = (event) => {
    const isPast = moment(event.start).isBefore(moment(), "day");
    return {
      style: {
        backgroundColor: isPast
          ? "rgb(222, 105, 135)"
          : "rgb(140, 189, 76)",
        color: "#fff",
        border: "none"
      }
    };
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        eventPropGetter={eventPropGetter}
      />
      <Popup />
    </div>
  );
}

export default Calendar;
