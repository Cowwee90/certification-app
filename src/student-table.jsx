import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export function StudentTable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "User-Agent": "testingAgent", // not necessary
        };
        const response = await fetch(
          "https://certification-api.glitch.me/students",
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
    <div class="data-table">
      <h1>All Students</h1>
      {data ? (
        //<pre>{JSON.stringify(data, null, 2)}</pre>
        showJsonInTable(data)
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

function showJsonInTable(JsonData) {
  const DisplayData = JsonData.map((info) => {
    return (
      <tr key={info.id}>
        <td>{info.id}</td>
        <td>{info.sname}</td>
        <td>{info.birthday}</td>
        <td>{info.highest_level}</td>
        <td>{info.best_grade}</td>
        <td>
          <a href="google.com">
            <FontAwesomeIcon icon={faPencil} />
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <form action="https://certification-api.glitch.me/students/search_query">
        <input type="search" id="search" placeholder="Search Students" />
        <input type="submit" />
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Highest Level</th>
            <th>Best Grade</th>
            <th>Edit Record</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}
