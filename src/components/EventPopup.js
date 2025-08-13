import React, { useState } from "react";
import moment from "moment";

function EventPopup(props) {
  const { type, start, event, onSave, onDelete } = props;
  const [title, setTitle] = useState(event ? event.title : "");
  const [location, setLocation] = useState(event ? event.location : "");

  const handleSave = () => {
    if (!title) return;
    const newEvent = {
      id: event ? event.id : Date.now(),
      title,
      location,
      start: event ? event.start : start,
      end: event ? event.end : start
    };
    onSave(newEvent);
  };

  return (
    <div className="mm-popup__box">
      <div className="mm-popup__box__header">
        <h3>{type === "create" ? "Create Event" : "Edit Event"}</h3>
      </div>
      <div className="mm-popup__box__body">
        <input
          placeholder="Event Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Event Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>
          <small>
            Date: {moment(event ? event.start : start).format("YYYY-MM-DD")}
          </small>
        </div>
      </div>
      <div className="mm-popup__box__footer">
        <div className="mm-popup__box__footer__right-space">
          <button className="mm-popup__btn" onClick={handleSave}>
            Save
          </button>
          {type === "edit" && (
            <>
              <button className="mm-popup__btn mm-popup__btn--info" onClick={handleSave}>
                Edit
              </button>
              <button className="mm-popup__btn mm-popup__btn--danger" onClick={onDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPopup;
