import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function TestResultForm() {
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [studID, setStudID] = useState("");
  const [eventID, setEventID] = useState(""); // find where it's used
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://certification-api.glitch.me/students"
        );
        const jsonData = await response.json();
        setStudents(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, []);

  // const fetchData = (value) => {
  //   fetch("http://certification-api.glitch.me/students")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       const results = json.filter((user) => {
  //         return (
  //           value &&
  //           user &&
  //           user.id &&
  //           user.birthday &&
  //           user.sname &&
  //           user.sname.toLowerCase().includes(value)
  //         );
  //       });
  //       setResults(results);
  //     });
  // };

  const handleChange = (value) => {
    setSearchInput(value);
    // fetchData(value);
  };

  const onSearch = (searchedName, searchedID) => {
    setSearchInput(searchedName);
    setStudID(searchedID);
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
        <input type="text" value={studID} />
        <input type="text" value={eventID} />

        <input type="text" id="inputTiming" placeholder="Solve 1" />
        <input type="text" id="inputTiming" placeholder="Solve 2" />
        <input type="text" id="inputTiming" placeholder="Solve 3" />
        <input type="text" id="inputTiming" placeholder="Solve 4" />
        <input type="text" id="inputTiming" placeholder="Solve 5" />
      </div>

      <div className="dropdown">
        {students
          .filter((item) => {
            const searchTerm = searchInput.toLowerCase();
            const searchedName = item.sname.toLowerCase();

            return (
              searchTerm &&
              searchedName.includes(searchTerm) &&
              searchTerm !== searchedName
            );
          })
          .map((item) => (
            <div
              className="search-result"
              onClick={() => {
                onSearch(item.sname, item.id);
              }}
            >
              {item.sname} <br /> {item.birthday}{" "}
            </div>
          ))}
      </div>
    </>
  );
}
