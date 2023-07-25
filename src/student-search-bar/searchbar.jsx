import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export const SearchBar = ({ setResults }) => {
  const onSearch = (searchTerm) => {
   console.log("search", searchTerm);
   };

  const [searchInput, setSearchInput] = useState("");

  const fetchData = (value) => {
    fetch("http://certification-api.glitch.me/students")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const results = json.filter((user) => {
          return (
            value &&
            user &&
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
      <button onClick={() => onSearch(searchInput)} value="Search" className="searchButton"/></span>
    </div>
  );
};
