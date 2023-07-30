import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function TestResultTable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "User-Agent": "testingAgent", // not necessary
        };
        const response = await fetch(
          "https://certification-api.glitch.me/testresults",
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
    <>
      {data ? (
        //<pre>{JSON.stringify(data, null, 2)}</pre>
        showJsonInTable(data)
      ) : (
        <h3>Loading data...</h3>
      )}
    </>
  );
}

const deleteResult = async (id) => {
  const res = await fetch(
    `https://certification-api.glitch.me/testresults/${id}`,
    {
      method: "DELETE",
    }
  );
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
        <td>{info.student_id}</td>
        <td>{info.event_id}</td>
        <td>{info.solve_1}</td>
        <td>{info.solve_2}</td>
        <td>{info.solve_3}</td>
        <td>{info.solve_4}</td>
        <td>{info.solve_5}</td>
        <td>{info.average_of_5}</td>
        <td>{info.level_attempted}</td>
        <td>{info.level_achieved}</td>
        <td>{info.grade_achieved}</td>
        <td>{info.name_to_be_printed}</td>
        <td>
        <a className="delete-btn" onClick={() => deleteResult(info.id)}>
          <FontAwesomeIcon icon={faTrash} />
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
          <th>StudentID</th>
          <th>EventID</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>Average</th>
          <th>Level Attempted</th>
          <th>Level Achieved</th>
          <th>Grade Achieved</th>
          <th>Name to be Printed</th>
          <th>Delete Record</th>
        </tr>
      </thead>
      <tbody>{DisplayData}</tbody>
    </table>
  );
}
