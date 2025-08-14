import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EventForm from './EventForm';
import FilterButtons from './FilterButtons';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setIsFormOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e === selectedEvent ? { ...eventData } : e
      ));
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: Date.now(),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(e => e !== eventToDelete));
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    if (filter === 'past') return event.end < now;
    if (filter === 'upcoming') return event.start >= now;
    return true; // 'all' filter
  });

  const eventStyleGetter = (event) => {
    const now = new Date();
    const isPast = event.end < now;
    const className = isPast ? 'past-event' : 'upcoming-event';
    
    return {
      className,
    };
  };

  return (
    <div>
      <FilterButtons onFilterChange={setFilter} />
      
      <BigCalendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        defaultView="month"
      />

      <Popup open={isFormOpen} onClose={() => setIsFormOpen(false)} modal>
        <EventForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          selectedSlot={selectedSlot}
          selectedEvent={selectedEvent}
        />
      </Popup>
    </div>
  );
};

export default Calendar;