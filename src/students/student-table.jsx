import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

export function StudentTable() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://certification-api.glitch.me/students"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function showJsonInTable(JsonData) {
    const DisplayData = JsonData.filter((info) => {
      if (searchInput) {
        const searchInputToLower = searchInput.toLowerCase();
        const nameToLower = info.sname.toLowerCase();

        return (
          searchInput &&
          (nameToLower.includes(searchInputToLower) ||
            (info.highest_level
              ? info.highest_level.toString().includes(searchInput)
              : false) ||
            (info.best_grade
              ? info.best_grade.toLowerCase().includes(searchInputToLower)
              : false) ||
            info.birthday.slice(0, 10).includes(searchInputToLower))
        );
      } else return true;
    }).map((info) => {
      return (
        <tr key={info.id}>
          <td>{info.id}</td>
          <td>{info.sname}</td>
          <td>{info.birthday.slice(0, 10)}</td>
          <td>{info.highest_level}</td>
          <td>{info.best_grade}</td>
          <td>
            <a className="delete-btn" onClick={() => deleteStudent(info.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </a>
          </td>
        </tr>
      );
    });

    return (
      <div>
      <span className="search-bar-icon">
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        <input
          type="text"
          className="search-bar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter name"
          autoComplete="off"
        /></span>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Highest Level</th>
              <th>Best Grade</th>
              <th>Delete Record</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="data-table">
      <h1>All Students</h1>
      {data ? showJsonInTable(data) : <p>Loading data...</p>}
    </div>
  );
}

const deleteStudent = async (id) => {
  const res = await fetch(
    `https://certification-api.glitch.me/students/${id}`,
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
