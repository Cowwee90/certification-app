import { useState } from "react";
import "./app.css";

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
        console.log("success");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="addstudent">
      <form onSubmit={handleSubmit}>
        <h3>Add New Student</h3>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={birthday}
          placeholder="Birthday"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
