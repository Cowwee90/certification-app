import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function EventTable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "User-Agent": "testingAgent", // not necessary
        };
        const response = await fetch(
          "https://certification-api.glitch.me/events",
          {
            headers,
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-table">
      <h1>All Events</h1>
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
  })
  if (res.status === 200) {
    alert("Successfully deleted event");
  } else {
    console.log(res.status);
  }
}


function showJsonInTable(JsonData) {
  const DisplayData = JsonData.map((info) => {
    return (
      <tr key={info.id}>
        <td>{info.id}</td>
        <td>{info.ename}</td>
        <td>{info.edate}</td>
        <td>
          <a onClick={() => deleteEvent(info.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
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
    </div>
  );
}
