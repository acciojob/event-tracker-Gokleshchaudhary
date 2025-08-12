import React from "react";
import Popup from "react-popup";
import "react-popup/style.css";

function showEventDetails(event) {
  Popup.create({
    title: event.title || "Event Details",
    content: (
      <div>
        <p><strong>Start:</strong> {event.start.toString()}</p>
        <p><strong>End:</strong> {event.end.toString()}</p>
      </div>
    ),
    buttons: {
      right: ["ok"]
    }
  });
}

export default showEventDetails;
