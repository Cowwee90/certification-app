import { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add New Event</h3>
        <input
          type="text"
          value={eventName}
          placeholder="Name"
          onChange={(e) => setEventName(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={eventDate}
          placeholder="Birthday"
          onChange={(e) => setEventDate(e.target.value)}
        />
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
