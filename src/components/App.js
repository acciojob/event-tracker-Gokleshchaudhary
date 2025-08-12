import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Popup from 'react-popup';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [popupData, setPopupData] = useState(null);

  // Filtered events based on filter state
  const filteredEvents = useMemo(() => {
    const now = new Date();
    if (filter === 'past') {
      return events.filter(e => new Date(e.end) < now);
    } else if (filter === 'upcoming') {
      return events.filter(e => new Date(e.start) >= now);
    }
    return events;
  }, [events, filter]);

  // Open popup to add new event or edit existing event
  const openPopup = (slotInfo) => {
    const eventOnDate = events.find(e =>
      moment(slotInfo.start).isSame(e.start, 'day')
    );
    setPopupData(eventOnDate || { start: slotInfo.start, end: slotInfo.end, title: '', location: '' });
    Popup.open({
      title: eventOnDate ? 'Edit Event' : 'Create Event',
      content: (
        <EventForm
          event={eventOnDate || { start: slotInfo.start, end: slotInfo.end, title: '', location: '' }}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => Popup.close()}
        />
      ),
      className: 'mm-popup',
    });
  };

  const handleSave = (event) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.start === event.start);
      if (exists) {
        // update event
        return prev.map((e) => (e.start === event.start ? event : e));
      } else {
        return [...prev, event];
      }
    });
    Popup.close();
  };

  const handleDelete = (event) => {
    setEvents((prev) => prev.filter((e) => e.start !== event.start));
    Popup.close();
  };

  // Event style based on past/upcoming
  const eventStyleGetter = (event) => {
    const now = new Date();
    const isPast = new Date(event.end) < now;
    const backgroundColor = isPast ? 'rgb(222, 105, 135)' : 'rgb(140, 189, 76)';
    return { style: { backgroundColor, color: 'white' } };
  };

  return (
    <div style={{ height: '100vh', padding: '10px' }}>
      <h1>Event Tracker Calendar</h1>
      <div style={{ marginBottom: '10px' }}>
        <button className="btn" onClick={() => setFilter('all')}>All</button>
        <button className="btn" onClick={() => setFilter('past')}>Past</button>
        <button className="btn" onClick={() => setFilter('upcoming')}>Upcoming</button>
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={openPopup}
        onSelectEvent={openPopup}
        eventPropGetter={eventStyleGetter}
      />
      <Popup />
    </div>
  );
}

function EventForm({ event, onSave, onDelete, onClose }) {
  const [title, setTitle] = React.useState(event.title);
  const [location, setLocation] = React.useState(event.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter event title');
    onSave({ ...event, title, location });
  };

  return (
    <div className="mm-popup__box">
      <form onSubmit={handleSubmit}>
        <div className="mm-popup__box__body">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
          <input
            type="text"
            placeholder="Event Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name="location"
          />
        </div>
        <div className="mm-popup__box__footer mm-popup__box__footer__right-space">
          <button type="submit" className="mm-popup__btn">
            Save
          </button>
          {event.title && (
            <button
              type="button"
              className="mm-popup__btn mm-popup__btn--danger"
              onClick={() => onDelete(event)}
            >
              Delete
            </button>
          )}
          <button type="button" className="mm-popup__btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;

