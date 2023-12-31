import { useState } from "react";
import React  from 'react';

const Draggable = require("react-draggable");

export function Form() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch("https://certification-api.glitch.me/students", {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          sname: name,
          birthday: birthday,
        }),
      });
      await res.json();
      if (res.status === 201) {
        setName("");
        setBirthday("");
        window.location.reload(false);
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
          <h3>Add New Student</h3>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={birthday}
            placeholder="Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <button type="submit" className="btn"><span className="btn-text">Add Student</span></button>
        </form>
      </div>
    </Draggable>
  );
}
