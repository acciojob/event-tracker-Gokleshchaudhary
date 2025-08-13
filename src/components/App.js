import React, { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import moment from 'moment';
import { localizer, eventStyleGetter } from '../components/calendarUtils';
import Popup from 'reactjs-popup';
import Toolbar from '../components/Toolbar';
import EventForm from '../components/EventForm';
import useEvents from '../components/useEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/App.css';
import '../components/calendarUtils';

function App() {
  const {
    events,
    filteredEvents,
    selectedEvent,
    selectedSlot,
    eventTitle,
    eventLocation,
    filter,
    handleSelectSlot,
    handleSelectEvent,
    saveEvent,
    deleteEvent,
    setEventTitle,
    setEventLocation,
    setFilter,
    closeModal
  } = useEvents();

  return (
    <div className="app-container">
      <Toolbar filter={filter} setFilter={setFilter} />
      
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 100px)' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          defaultView="month"
          views={['month', 'week', 'day']}
        />
      </div>

      <Popup
        open={selectedSlot !== null || selectedEvent !== null}
        onClose={closeModal}
        modal
        nested
        closeOnDocumentClick
      >
        <EventForm
          selectedEvent={selectedEvent}
          eventTitle={eventTitle}
          eventLocation={eventLocation}
          setEventTitle={setEventTitle}
          setEventLocation={setEventLocation}
          saveEvent={saveEvent}
          deleteEvent={deleteEvent}
          closeModal={closeModal}
        />
      </Popup>
    </div>
  );
}

export default App;
