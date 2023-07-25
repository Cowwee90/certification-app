import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function TestResultForm() {
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [studID, setStudID] = useState("");
  const [eventID, setEventID] = useState("");

  const fetchData = (value) => {
    fetch("http://certification-api.glitch.me/students")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.id &&
            user.birthday &&
            user.sname &&
            user.sname.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setSearchInput(value);
    fetchData(value);
  };

  return (
    <>
      <div className="searchbar-wrap">
          <input
            type="text"
            id="searchbar"
            value={searchInput}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search Student's Records"
          />
          <input type="hidden" value={studID} />
            <input type="hidden" value={eventID} />

          <input
            type="text"
            id="inputTiming"
            placeholder="Solve 1"
          />
          <input
            type="text"
            id="inputTiming"
            placeholder="Solve 2"
          />
          <input
            type="text"
            id="inputTiming"
            placeholder="Solve 3"
          />
          <input
            type="text"
            id="inputTiming"
            placeholder="Solve 4"
          />
          <input
            type="text"
            id="inputTiming"
            placeholder="Solve 5"
          />
 </div>

      {results.map((results, id) => {
        return (
          <div
            className="search-result"
            onClick={() => {setSearchInput(results.sname); setStudID(results.id)}}
          >
            {results.sname} <br /> {results.birthday}{" "}
          </div>
        );
      })}
 </>
);
}
