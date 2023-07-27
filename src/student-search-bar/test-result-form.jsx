import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGripLinesVertical,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";

export function TestResultForm() {
  const [searchInput, setSearchInput] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [studID, setStudID] = useState("");
  const [eventID, setEventID] = useState(""); // find where it's used
  const [students, setStudents] = useState([]);
  const [solves, setSolves] = useState([]);
  const [avg, setAvg] = useState("DNF");
  const [levelAchieved, setLevelAchieved] = useState("");
  const [gradeAchieved, setGradeAchieved] = useState("");
  const [levelAttempted, setLevelAttempted] = useState("");
  const [printedName, setPrintedName] = useState("");

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
    const restrictedTime = time.replace(/[^DNFdnf0-9.]/g, "");

    setSolves((currentSolves) => {
      return { ...currentSolves, [num]: restrictedTime }; // time could be a string i.e. "DNF"
    });
  }

  function searchBarOnChange(e){
    setIsSelected(false);
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    let numDNFs = 0;
    let sum = 0;
    let min = 1000;
    let max = -1;
    let count = 0;

    for (const key in solves) {
      const curr = solves[key];
      if (curr !== "") {
        count++;
      }
      if (curr === "DNF") {
        numDNFs++;
      } else {
        sum += Number(curr);
        if (curr > max) max = curr;
        if (curr < min) min = curr;
      }
    }
    if (count === 5) {
      if (numDNFs > 1) {
        setAvg("DNF");
      } else if (numDNFs === 1) {
        setAvg(((sum - min) / 3).toFixed(2));
      } else if (numDNFs === 0) {
        setAvg(((sum - max - min) / 3).toFixed(2));
      }
    } else {
      setAvg("");
    }
    console.log(solves);
  }, [solves]);

  useEffect(() => {
    if (avg === "DNF" || avg === "") setLevelAchieved("");
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
    setIsSelected(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(
        "https://certification-api.glitch.me/testresults",
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            student_id: studID,
            event_id: eventID,
            solve_1: solves[1],
            solve_2: solves[2],
            solve_3: solves[3],
            solve_4: solves[4],
            solve_5: solves[5],
            average_of_5: avg,
            level_attempted: levelAttempted,
            level_achieved: levelAchieved,
            grade_achieved: gradeAchieved,
            name_to_be_printed: printedName,
          }),
        }
      );
      await res.json();
      if (res.status === 201) {
        console.log("success");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="searchbar-wrap" onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchbar"
          value={searchInput}
          onChange={(e)=>searchBarOnChange(e)}
          placeholder="Enter name"
          autoComplete="off"
        />
        <input type="hidden" value={studID} readOnly />
        <input type="hidden" value={eventID} readOnly />

        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 1"
          value={solves[1]}
          onChange={(e) => setSolvesWrapper("1", e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 2"
          value={solves[2]}
          onChange={(e) => setSolvesWrapper("2", e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 3"
          value={solves[3]}
          onChange={(e) => setSolvesWrapper("3", e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 4"
          value={solves[4]}
          onChange={(e) => setSolvesWrapper("4", e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          id="test-result-form-field"
          placeholder="Attempt 5"
          value={solves[5]}
          onChange={(e) => setSolvesWrapper("5", e.target.value)}
          autoComplete="off"
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
          value={levelAttempted}
          min="1"
          max="10"
          autoComplete="off"
          onChange={(e) => setLevelAttempted(e.target.value)}
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
          value={printedName}
          placeholder="Name to be printed"
          onChange={(e) => setPrintedName(e.target.value)}
        />
        <button type="submit">Add Record</button>
      </form>

      <div className="dropdown">
        {students
          .filter((item) => {
            const searchInputToLower = searchInput.toLowerCase();
            const storedNameToLower = item.sname.toLowerCase();

            return (
              !isSelected &&
              storedNameToLower.includes(searchInputToLower) &&
              searchInputToLower !== storedNameToLower
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
