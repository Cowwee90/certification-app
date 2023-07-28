import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

export function EventTable({ type }) {
  const [data, setData] = useState(null);

  const date = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!type) {
          response = await fetch("https://certification-api.glitch.me/events");
        } else if (type === "upcoming") {
          response = await fetch(
            `https://certification-api.glitch.me/events?after=${date}`
          );
        } else if (type === "past") {
          response = await fetch(
            `https://certification-api.glitch.me/events?before=${date}`
          );
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, type]);

  let heading;
  if (!type) {
    heading = "All Events";
  } else if (type === "upcoming") {
    heading = "Upcoming Events";
  } else if (type === "past") {
    heading = "Past Events";
  }

  return (
    <div className="main-section">
      <h1>{heading}</h1>
      {data ? (
        //<pre>{JSON.stringify(data, null, 2)}</pre>
        showJsonInTable(data)
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

const deleteEvent = async (id) => {
  const res = await fetch(`https://certification-api.glitch.me/events/${id}`, {
    method: "DELETE",
  });
  if (res.status === 200) {
    alert("Successfully deleted event");
  } else {
    console.log(res.status);
  }
};

function showJsonInTable(JsonData) {
  const DisplayData = JsonData.map((info) => {
    return (
      <tr key={info.id}>
        <td>{info.id}</td>
        <td>{info.ename}</td>
        <td>{info.edate}</td>
        <td>
          <a className="delete-btn" onClick={() => deleteEvent(info.id)}>
            <FontAwesomeIcon icon={faTrash} size="xl" border />
          </a>
        </td>
      </tr>
    );
  });

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Delete Record</th>
        </tr>
      </thead>
      <tbody>{DisplayData}</tbody>
    </table>
  );
}
