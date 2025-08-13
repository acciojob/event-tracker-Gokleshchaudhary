import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Popup from 'reactjs-popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'reactjs-popup/dist/index.css';
import './App.css';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
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
      // Update existing event
      const updatedEvents = events.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, title: eventTitle, location: eventLocation }
          : e
      );
      setEvents(updatedEvents);
    } else {
      // Create new event
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
    
    // Reset form
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

  const getFilteredEvents = () => {
    const now = moment();
    return events.filter(event => {
      if (filter === 'all') return true;
      if (filter === 'past') return moment(event.start).isBefore(now, 'day');
      if (filter === 'upcoming') return moment(event.start).isSameOrAfter(now, 'day');
      return true;
    });
  };

  const eventStyleGetter = (event) => {
    const isPast = moment(event.start).isBefore(moment(), 'day');
    const style = {
      backgroundColor: isPast ? 'rgb(222, 105, 135)' : 'rgb(140, 189, 76)',
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return { style };
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button className="btn" onClick={() => setFilter('all')}>All</button>
        <button className="btn" onClick={() => setFilter('past')}>Past</button>
        <button className="btn" onClick={() => setFilter('upcoming')}>Upcoming</button>
      </div>

      <Calendar
        localizer={localizer}
        events={getFilteredEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        defaultView="month"
      />

      {/* Event Creation/Edit Popup */}
      <Popup 
        open={selectedSlot !== null || selectedEvent !== null} 
        onClose={() => {
          setSelectedSlot(null);
          setSelectedEvent(null);
        }}
        modal
      >
        <div className="mm-popup__box">
          <div className="mm-popup__box__header">
            <h4>{selectedEvent ? 'Edit Event' : 'Create Event'}</h4>
          </div>
          <div className="mm-popup__box__body">
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="mm-popup__input"
            />
            <input
              type="text"
              placeholder="Event Location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="mm-popup__input"
            />
          </div>
          <div className="mm-popup__box__footer">
            <div className="mm-popup__box__footer__right-space">
              {selectedEvent && (
                <button 
                  className="mm-popup__btn mm-popup__btn--danger"
                  onClick={deleteEvent}
                >
                  Delete
                </button>
              )}
              <button 
                className="mm-popup__btn mm-popup__btn--primary"
                onClick={saveEvent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default App;
