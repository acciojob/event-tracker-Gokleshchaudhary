import { useState } from 'react';
import moment from 'moment';

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
    setEventTitle('');
    setEventLocation('');
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setEventTitle(event.title);
    setEventLocation(event.location);
  };

  const saveEvent = () => {
    if (eventTitle.trim() === '') return;

    if (selectedEvent) {
      const updatedEvents = events.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, title: eventTitle, location: eventLocation }
          : e
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: Date.now(),
        title: eventTitle,
        location: eventLocation,
        start: selectedSlot.start,
        end: selectedSlot.end,
        isPast: moment(selectedSlot.start).isBefore(moment(), 'day'),
      };
      setEvents([...events, newEvent]);
    }
    
    setSelectedEvent(null);
    setSelectedSlot(null);
    setEventTitle('');
    setEventLocation('');
  };

  const deleteEvent = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id));
    setSelectedEvent(null);
    setEventTitle('');
    setEventLocation('');
  };

  return {
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
  };
}
