import React, { useEffect, useState } from "react";
import { Form } from "./add-student-form.jsx";
import { AddStudentButton } from "../students/show-form.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

export function StudentTable() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isShown, setIsShown] = useState(false);

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
          <td className="name-col">
            <span>{info.sname}</span>
            <span className="id-below"> Student ID: {info.id} </span>
          </td>
          <td>{info.birthday.slice(0, 10)}</td>
          <td>{info.highest_level}</td>
          <td>{info.best_grade}</td>
          <td className="action-col">
            <button
              className="btn delete-btn"
              onClick={() => deleteStudent(info.id)}
            >
              <span className="btn-icon">
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
              <span className="btn-text">Delete</span>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="main-body">
        <div className="search-bar-container">
          <div className="search-bar-wrapper">
            <span className="search-bar-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />

              <input
                type="text"
                className="search-bar"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter name"
                autoComplete="off"
              />
            </span>
          </div>
        </div>

        <div className="tableContainer">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Highest Level</th>
                <th>Best Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="main-section">
      <header>
        <h1>All Students</h1>
        <AddStudentButton setIsShown={setIsShown} />
      </header>
      {data ? showJsonInTable(data) : <h2>Loading data...</h2>}
      {isShown && <Form />}
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
