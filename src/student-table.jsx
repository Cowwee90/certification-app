import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Fetching JSON with React</h1>
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
      <tr>
        <td>{info.id}</td>
        <td>{info.sname}</td>
        <td>{info.birthday}</td>
        <td>{info.highest_level}</td>
        <td>{info.best_grade}</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>sname</th>
            <th>birthday</th>
            <th>highest_level</th>
            <th>best_grade</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}
