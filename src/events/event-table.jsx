import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AddEventButton } from "../events/show-add-event.jsx";
import { EForm } from "./add-event-form.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

export function EventTable({ type }) {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isShown, setIsShown] = useState(false);

  const date = new Date().toJSON().slice(0, 10);

  const fetchData = useCallback(async () => {
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
  }, [date, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <header>
        <h1>{heading}</h1>
        <AddEventButton setIsShown={setIsShown} />
        {/* {isShown && <Form />} */}
      </header>
      {data ? (
        //<pre>{JSON.stringify(data, null, 2)}</pre>
        showJsonInTable(data)
      ) : (
        <h2>Loading data...</h2>
      )}
      {isShown && <EForm />}
    </div>
  );

  function showJsonInTable(JsonData) {
    const DisplayData = JsonData.filter((info) => {
      if (searchInput) {
        const searchInputToLower = searchInput.toLowerCase();
        const nameToLower = info.ename.toLowerCase();

        return (
          searchInput &&
          (nameToLower.includes(searchInputToLower) ||
            info.edate.slice(0, 10).includes(searchInputToLower))
        );
      } else return true;
    }).map((info) => {
      return (
        <tr key={info.id}>
          <td className="name-col">
            <span>{info.ename}</span>
            <span className="id-below"> Event ID: {info.id} </span>
          </td>
          <td>{info.edate.slice(0, 10)}</td>
          <td>
            <Link
              to={`/testresults/${info.id + "-" + info.ename}`}
              className="btn"
            >
              <span className="btn-icon">
                <FontAwesomeIcon icon={faPencil} />
              </span>
              <span className="btn-text">Results</span>
            </Link>
            <button
              className="btn delete-btn"
              onClick={() => deleteEvent(info.id)}
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

    const deleteEvent = async (id) => {
      const res = await fetch(
        `https://certification-api.glitch.me/events/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 200) {
        alert("Successfully deleted event");
      } else {
        console.log(res.status);
      }

      await fetchData();
    };

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
              placeholder="Search events"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="tableContainer">
          <table className="data-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
