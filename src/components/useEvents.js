import { useState, useCallback } from 'react';
import moment from 'moment';

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'past') return moment(event.start).isBefore(moment(), 'day');
    if (filter === 'upcoming') return moment(event.start).isSameOrAfter(moment(), 'day');
    return true;
  });

  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
    setEventTitle('');
    setEventLocation('');
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setEventTitle(event.title);
    setEventLocation(event.location);
  }, []);

  const saveEvent = useCallback(() => {
    if (!eventTitle.trim()) return;

    if (selectedEvent) {
      setEvents(prev => prev.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, title: eventTitle, location: eventLocation } 
          : e
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        title: eventTitle,
        location: eventLocation,
        start: selectedSlot.start,
        end: selectedSlot.end || moment(selectedSlot.start).add(1, 'hour').toDate(),
      };
      setEvents(prev => [...prev, newEvent]);
    }
    closeModal();
  }, [eventTitle, eventLocation, selectedEvent, selectedSlot]);

  const deleteEvent = useCallback(() => {
    setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
    closeModal();
  }, [selectedEvent]);

  const closeModal = useCallback(() => {
    setSelectedEvent(null);
    setSelectedSlot(null);
    setEventTitle('');
    setEventLocation('');
  }, []);

  return {
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
  };
}
