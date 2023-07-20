import { useState } from "react";

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
    <div className="App">
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}