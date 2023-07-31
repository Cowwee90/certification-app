import React, { useEffect, useState } from "react";
import { AddTestResultButton } from "./show-add-result.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export function TestResultTable() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

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
      <div className="main-section">
        <header>
          <h1>Test Results</h1>
          <AddTestResultButton />
          {/* {isShown && <Form />} */}
        </header>
        {data ? (
          //<pre>{JSON.stringify(data, null, 2)}</pre>
          showJsonInTable(data)
        ) : (
          <h2>Loading data...</h2>
        )}
      </div>
    </>
  );

  function showJsonInTable(JsonData) {
    const DisplayData = JsonData.filter((info) => {
      if (searchInput) {
        const searchInputToLower = searchInput.toLowerCase();
        const nameToLower = info.name_to_be_printed.toLowerCase();

        return (
          searchInput &&
          (nameToLower.includes(searchInputToLower) ||
            info.grade_achieved.toLowerCase().includes(searchInputToLower))
        );
      } else return true;
    }).map((info) => {
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
            <button
              className="btn delete-btn"
              onClick={() => deleteResult(info.id)}
            >
              <span className="btn-icon">
                <FontAwesomeIcon icon={faTrashCan} size="xl" />
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
            </span>
            <input
              type="text"
              className="search-bar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search test results"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="tableContainer">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table></div>
      </div>
    );
  }
}

const deleteResult = async (id) => {
  const res = await fetch(
    `https://certification-api.glitch.me/testresults/${id}`,
    {
      method: "DELETE",
    }
  );
  if (res.status === 200) {
    alert("Successfully deleted student's result.");
  } else {
    console.log(res.status);
  }
};
