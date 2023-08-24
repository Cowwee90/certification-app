import { useState } from "react";
import React  from 'react';
const Draggable = require("react-draggable");

export function EForm() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch("https://certification-api.glitch.me/events", {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          ename: eventName,
          edate: eventDate,
        }),
      });
      await res.json();
      if (res.status === 201) {
        setEventName("");
        setEventDate("");
        alert("success");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Draggable>
      <div className="form-container">
        <form className="form-wrap" onSubmit={handleSubmit}>
          <h3>Add New Event</h3>
          <input
            type="text"
            value={eventName}
            placeholder="Name"
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="date"
            value={eventDate}
            placeholder="Birthday"
            onChange={(e) => setEventDate(e.target.value)}
          />
          <button className="btn" type="submit">
            <span className="btn-text">Add Event</span>
          </button>
        </form>
      </div>
    </Draggable>
  );
}
