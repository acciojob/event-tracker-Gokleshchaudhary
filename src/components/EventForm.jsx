import React from 'react';
import PropTypes from 'prop-types';

const EventForm = ({ 
  selectedEvent, 
  eventTitle, 
  setEventTitle,
  eventLocation,
  setEventLocation,
  saveEvent,
  deleteEvent
}) => (
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
);

EventForm.propTypes = {
  selectedEvent: PropTypes.object,
  eventTitle: PropTypes.string.isRequired,
  setEventTitle: PropTypes.func.isRequired,
  eventLocation: PropTypes.string.isRequired,
  setEventLocation: PropTypes.func.isRequired,
  saveEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

export default EventForm;
