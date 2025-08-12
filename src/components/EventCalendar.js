import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from './Modal';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const PAST_COLOR = 'rgb(222, 105, 135)';   // pink
const UPCOMING_COLOR = 'rgb(140, 189, 76)'; // green

const STORAGE_KEY = 'events-v1';

function loadEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // convert string dates back to Date
    return parsed.map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
  } catch {
    return [];
  }
}

function saveEvents(evts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evts));
}

export default function EventCalendar() {
  const [events, setEvents] = useState(() => loadEvents());
  const [filter, setFilter] = useState('all'); // all, past, upcoming
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('create'); // create or edit
  const [selectedDate, setSelectedDate] = useState(null); // Date object
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0,0,0,0);
    return t;
  }, []);

  const visibleEvents = events.filter(ev => {
    if (filter === 'all') return true;
    const evDate = new Date(ev.start);
    evDate.setHours(0,0,0,0);
    if (filter === 'past') return evDate < today;
    if (filter === 'upcoming') return evDate >= today;
    return true;
  });

  function eventStyleGetter(event) {
    const evDate = new Date(event.start);
    evDate.setHours(0,0,0,0);
    const style = {
      borderRadius: '4px',
      color: 'white',
      padding: '2px 4px',
      border: '0px'
    };
    if (evDate < today) style.backgroundColor = PAST_COLOR;
    else style.backgroundColor = UPCOMING_COLOR;
    return { style };
  }

  function handleSelectSlot({ start, end }) {
    setMode('create');
    setSelectedDate(start);
    setSelectedEvent(null);
    setModalOpen(true);
  }

  function handleSelectEvent(ev) {
    setMode('edit');
    setSelectedEvent(ev);
    setSelectedDate(ev.start);
    setModalOpen(true);
  }

  function handleSave({ title, location, date, id }) {
    const start = new Date(date);
    start.setHours(9,0,0,0); // set time
    const end = new Date(start);
    end.setHours(10,0,0,0);

    if (mode === 'create') {
      const newEvent = {
        id: String(Date.now()),
        title,
        location,
        start,
        end
      };
      const next = [...events, newEvent];
      setEvents(next);
    } else if (mode === 'edit') {
      const next = events.map(e => e.id === id ? { ...e, title, location, start, end } : e);
      setEvents(next);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    setEvents(prev => prev.filter(e => e.id !== id));
    setModalOpen(false);
  }

  function openCreateViaButton() {
    setMode('create');
    setSelectedEvent(null);
    setSelectedDate(new Date()); // default today
    setModalOpen(true);
  }

  return (
    <div>
      <div className="controls">
        <button className="btn" onClick={() => { setFilter('all'); }}>All</button>
        <button className="btn" onClick={() => { setFilter('past'); }}>Past</button>
        <button className="btn" onClick={() => { setFilter('upcoming'); }}>Upcoming</button>

        <button className="btn" onClick={openCreateViaButton} style={{float:'right'}}>Add Event</button>
      </div>

      <div style={{ height: '600px', marginTop: 10 }}>
        <Calendar
          selectable
          localizer={localizer}
          events={visibleEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={['month', 'week', 'day']}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {modalOpen && (
        <Modal
          mode={mode}
          date={selectedDate}
          event={selectedEvent}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

