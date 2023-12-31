import React, { useEffect, useState } from "react";
import { AddTestResultButton } from "./show-add-result.jsx";
import { TestResultForm } from "./test-result-form.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export function TestResultTable() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isShown, setIsShown] = useState(false);
  const { eventInfo } = useParams();
  let eventID, eventName;

  if (eventInfo) {
    [eventID, eventName] = eventInfo.split("-");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "User-Agent": "testingAgent", // not necessary
        };
        let response;
        if (eventInfo) {
          response = await fetch(
            `https://certification-api.glitch.me/testresults?eid=${eventID}`,
            {
              headers,
            }
          );
        } else {
          response = await fetch(
            `https://certification-api.glitch.me/testresults`,
            {
              headers,
            }
          );
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventInfo, eventID]);

  return (
    <>
      <div className="main-section">
        <header>
          <div className="page-title">
            <h1 className="title">Test Results</h1>
            {eventInfo && <h2 className="subtitle">{eventName}</h2>}
          </div>

          {eventInfo && <AddTestResultButton setIsShown={setIsShown} />}
        </header>
        {data ? showJsonInTable(data) : <h2>Loading data...</h2>}
        {isShown && <TestResultForm eventID={eventID} />}
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
          <td className="name-col">
            <span>{info.sname}</span>
            <span className="id-below"> Student ID: {info.student_id} </span>
          </td>
          {!eventInfo && (
            <td className="name-col">
              <span>{info.ename}</span>
              <span className="id-below"> Event ID: {info.event_id}</span>
            </td>
          )}

          <td>{info.solve_1}</td>
          <td>{info.solve_2}</td>
          <td>{info.solve_3}</td>
          <td>{info.solve_4}</td>
          <td>{info.solve_5}</td>
          <td>{info.average_of_5}</td>
          <td>{info.level_attempted ? info.level_attempted : "null"}</td>
          <td>{info.grade_attempted}</td>
          <td>{info.result}</td>
          <td>{info.name_to_be_printed}</td>
          <td className="action-col">
            <button
              className="btn delete-btn"
              onClick={() => deleteResult(info.id)}
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
                <th>Student</th>
                {!eventInfo && <th>Event</th>}
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>Average</th>
                <th className="long-tablehead-name">Level Attempted</th>
                <th className="long-tablehead-name">Grade Attempted</th>
                <th>Result</th>
                <th>Name to be Printed</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </table>
        </div>
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
