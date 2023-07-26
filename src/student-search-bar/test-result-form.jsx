import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGripLinesVertical,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";

export function TestResultForm() {
  const [searchInput, setSearchInput] = useState("");
  const [studID, setStudID] = useState("");
  const [eventID, setEventID] = useState(""); // find where it's used
  const [students, setStudents] = useState([]);
  const [solves, setSolves] = useState([]);
  const [avg, setAvg] = useState("DNF");
  const [levelAchieved, setLevelAchieved] = useState("");
  const [gradeAchieved, setGradeAchieved] = useState("");

  const FAIL = -1;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://certification-api.glitch.me/students"
        );
        const jsonData = await response.json();
        setStudents(jsonData);
        setEventID(1); // TODO: remove
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, []);

  function setSolvesWrapper(num, time) {
    setSolves((currentSolves) => {
      return { ...currentSolves, [num]: Number(time) };
    });
  }

  useEffect(() => {
    let sum = 0;
    for (const key in solves) {
      sum += solves[key];
    }
    const newAvg = sum / 5;
    if (newAvg === 0) setAvg("DNF");
    else setAvg((sum / 5).toFixed(2));
  }, [solves]);

  useEffect(() => {
    if (avg === "DNF") setLevelAchieved("");
    else if (avg > 180) setLevelAchieved("Failed test");
    else if (120 < avg && avg <= 180) setLevelAchieved(1);
    else if (90 < avg && avg <= 120) setLevelAchieved(2);
    else if (60 < avg && avg <= 90) setLevelAchieved(3);
    else if (40 < avg && avg <= 60) setLevelAchieved(4);
    else if (30 < avg && avg <= 40) setLevelAchieved(5);
    else if (20 < avg && avg <= 30) setLevelAchieved(6);
    else if (15 < avg && avg <= 20) setLevelAchieved(7);
    else if (12 < avg && avg <= 15) setLevelAchieved(8);
    else if (10 < avg && avg <= 12) setLevelAchieved(9);
    else if (avg <= 10) setLevelAchieved(10);
  }, [avg]);

  useEffect(() => {
    if (levelAchieved === "") setGradeAchieved("");
    else if (levelAchieved === 1) {
      setGradeAchieved("Beginner");
    } else if (levelAchieved === 2 || levelAchieved === 3) {
      setGradeAchieved("Intermediate");
    } else if (
      levelAchieved === 4 ||
      levelAchieved === 5 ||
      levelAchieved === 6
    ) {
      setGradeAchieved("Advanced");
    } else if (levelAchieved === 7 || levelAchieved === 8) {
      setGradeAchieved("Professional");
    } else if (levelAchieved === 9 || levelAchieved === 10) {
      setGradeAchieved("Master");
    } else {
      setGradeAchieved("Invalid grade");
    }
  }, [levelAchieved]);

  const onSearch = (searchedName, searchedID) => {
    setSearchInput(searchedName);
    setStudID(searchedID);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(avg, levelAchieved, gradeAchieved);
  };

  return (
    <>
      <form className="searchbar-wrap" onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchbar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter name"
        />
        <input type="text" value={studID} readOnly />
        <input type="text" value={eventID} readOnly />

        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 1"
          onChange={(e) => setSolvesWrapper("1", e.target.value)}
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 2"
          onChange={(e) => setSolvesWrapper("2", e.target.value)}
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 3"
          onChange={(e) => setSolvesWrapper("3", e.target.value)}
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 4"
          onChange={(e) => setSolvesWrapper("4", e.target.value)}
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 5"
          onChange={(e) => setSolvesWrapper("5", e.target.value)}
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Average of 5"
          value={"Average of 5: " + avg}
          readOnly
        />
        <input
          type="number"
          id="test-result-form-field"
          placeholder="Level attempted"
          min="1"
          max="10"
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Level achieved"
          value={levelAchieved}
          readOnly
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Grade achieved"
          value={gradeAchieved}
          readOnly
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Name to be printed"
        />
        <button type="submit">Add Result</button>
      </form>

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
              key={item.id}
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
