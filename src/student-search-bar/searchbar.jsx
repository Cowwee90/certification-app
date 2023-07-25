import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = ({ setResults }) => {
  const [searchInput, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://certification-api.glitch.me/students")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.sname &&
            user.sname.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="searchbar-wrap">
      <span className="searchspan">
        <input
          type="text"
          id="searchbar"
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search Student's Records"
        />
        <FontAwesomeIcon icon={faSearch} id="search-icon" />
      </span>
    </div>
  );
};
