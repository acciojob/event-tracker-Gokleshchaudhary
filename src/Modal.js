
import React, { useState, useEffect } from 'react';

export default function Modal({ mode, date, event, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(event ? event.title : '');
  const [location, setLocation] = useState(event ? event.location : '');
  const [dateVal, setDateVal] = useState(() => {
    if (event) {
      const d = new Date(event.start);
      return d.toISOString().slice(0,10);
    }
    if (date) {
      const d = new Date(date);
      return d.toISOString().slice(0,10);
    }
    return new Date().toISOString().slice(0,10);
  });

  useEffect(() => {
    setTitle(event ? event.title : '');
    setLocation(event ? event.location : '');
  }, [event]);

  function handleSaveClick() {
    onSave({ title, location, date: dateVal, id: event?.id });
  }

  function handleDeleteClick() {
    if (event) onDelete(event.id);
  }

  // Modal markup with classes for Cypress selectors
  return (
    <div className="mm-popup mm-popup--open">
      <div className="mm-popup__box">
        <div className="mm-popup__box__header">
          <h3>{mode === 'create' ? 'Create Event' : 'Edit Event'}</h3>
          <button onClick={onClose} className="mm-popup__close">×</button>
        </div>

        <div className="mm-popup__box__body">
          <div className="form-row">
            <label>Title</label>
            <input placeholder="Event Title" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Location</label>
            <input placeholder="Event Location" value={location} onChange={e=>setLocation(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Date</label>
            <input type="date" value={dateVal} onChange={e=>setDateVal(e.target.value)} />
          </div>
        </div>

        <div className="mm-popup__box__footer">
          <div className="mm-popup__box__footer__left-space">
            {mode === 'edit' && <button className="mm-popup__btn mm-popup__btn--danger" onClick={handleDeleteClick}>Delete</button>}
          </div>
          <div className="mm-popup__box__footer__right-space">
            {mode === 'edit' && <button className="mm-popup__btn mm-popup__btn--info" onClick={() => { /* info action, keep as edit */ }}>{/* info */}Info</button>}
            <button className="mm-popup__btn" onClick={handleSaveClick}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

