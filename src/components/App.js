import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Popup from 'reactjs-popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'reactjs-popup/dist/index.css';
import '.components/App.css';
import Toolbar from './components/Toolbar';
import EventForm from './components/EventForm';
import { useEvents } from './components/useEvents';
import { eventStyleGetter } from './components/eventUtils';

const localizer = momentLocalizer(moment);

function App() {
  const {
    events,
    selectedEvent,
    selectedSlot,
    eventTitle,
    eventLocation,
    handleSelectSlot,
    handleSelectEvent,
    saveEvent,
    deleteEvent,
    setEventTitle,
    setEventLocation,
    setSelectedSlot,
    setSelectedEvent
  } = useEvents();

  const [filter, setFilter] = useState('all');

  return (
    <div className="App">
      <Toolbar setFilter={setFilter} />
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        defaultView="month"
      />

      <Popup 
        open={selectedSlot !== null || selectedEvent !== null} 
        onClose={() => {
          setSelectedSlot(null);
          setSelectedEvent(null);
        }}
        modal
      >
        <EventForm
          selectedEvent={selectedEvent}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          eventLocation={eventLocation}
          setEventLocation={setEventLocation}
          saveEvent={saveEvent}
          deleteEvent={deleteEvent}
        />
      </Popup>
    </div>
  );
}

export default App;
