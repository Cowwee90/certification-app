import { useState, useEffect } from "react";
import React  from 'react';
const Draggable = require("react-draggable");

export function TestResultForm({ eventID }) {
  const [searchInput, setSearchInput] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [studID, setStudID] = useState("");
  const [students, setStudents] = useState([]);
  const [solves, setSolves] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });
  const [avg, setAvg] = useState("DNF");
  const [levelAttempted, setLevelAttempted] = useState("");
  const [gradeAttempted, setGradeAttempted] = useState("");
  const [levelAchieved, setLevelAchieved] = useState("");
  const [result, setResult] = useState("");
  const [printedName, setPrintedName] = useState("");

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

  function setSolvesWrapper(num, time) {
    const restrictedTime = time.replace(/[^DNFdnf0-9.]/g, "");

    setSolves((currentSolves) => {
      return { ...currentSolves, [num]: restrictedTime }; // time could be a string i.e. "DNF"
    });
  }

  function searchBarOnChange(e) {
    setIsSelected(false);
    setSearchInput(e.target.value);
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
      if (curr === "DNF" || curr === "D" || curr === "DN" || curr === "") {
        numDNFs++;
      } else {
        sum += Number(curr);
        if (curr > max) {
          max = Number(curr);
        }
        if (curr < min) {
          min = Number(curr);
        }
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
    const intLevelAttempted = Number(levelAttempted);
    if (intLevelAttempted === "") setGradeAttempted("");
    else if (intLevelAttempted === 1) {
      setGradeAttempted("Beginner");
    } else if (intLevelAttempted === 2 || intLevelAttempted === 3) {
      setGradeAttempted("Intermediate");
    } else if (
      intLevelAttempted === 4 ||
      intLevelAttempted === 5 ||
      intLevelAttempted === 6
    ) {
      setGradeAttempted("Advanced");
    } else if (intLevelAttempted === 7 || intLevelAttempted === 8) {
      setGradeAttempted("Professional");
    } else if (intLevelAttempted === 9 || intLevelAttempted === 10) {
      setGradeAttempted("Master");
    } else {
      setGradeAttempted("Invalid grade");
    }
  }, [levelAttempted]);

  useEffect(() => {
    if (
      levelAchieved < levelAttempted ||
      levelAchieved === "" ||
      levelAttempted === ""
    ) {
      setResult("Fail");
    } else {
      setResult("Pass");
    }
  }, [levelAchieved, levelAttempted]);

  const onSearch = (searchedName, searchedID) => {
    setSearchInput(searchedName);
    setStudID(searchedID);
    setIsSelected(true);
  };

  useEffect(() => {
    if (searchInput === "") {
      setStudID("");
    }
  }, [searchInput]);

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
            grade_attempted: gradeAttempted,
            result: result === "" ? null : result,
            name_to_be_printed: printedName,
          }),
        }
      );
      await res.json();
      if (res.status === 201) {
        alert("Test result has been added");
        setSearchInput(''); setSolves(''); setLevelAchieved(''); setLevelAttempted(''); setResult(''); setPrintedName('');
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Draggable>
        <div className="form-container">
          <form className="form-wrap" onSubmit={handleSubmit}>
            <input
              type="text"
              id="searchbar"
              value={searchInput}
              onChange={(e) => searchBarOnChange(e)}
              placeholder="Enter name"
              autoComplete="off"
              required
            />
            <input type="hidden" value={studID} readOnly />
            <input type="hidden" value={eventID} readOnly />
            <h4>
              Please enter results in seconds. <br />
              Example: 1min 25.566s = 85.56s{" "}
            </h4>
            <input
              type="text"
              id="test-result-form-field"
              placeholder="Attempt 1"
              value={solves[1]}
              onChange={(e) => setSolvesWrapper("1", e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="text"
              id="test-result-form-field"
              placeholder="Attempt 2"
              value={solves[2]}
              onChange={(e) => setSolvesWrapper("2", e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="text"
              id="test-result-form-field"
              placeholder="Attempt 3"
              value={solves[3]}
              onChange={(e) => setSolvesWrapper("3", e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="text"
              id="test-result-form-field"
              placeholder="Attempt 4"
              value={solves[4]}
              onChange={(e) => setSolvesWrapper("4", e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="text"
              id="test-result-form-field"
              placeholder="Attempt 5"
              value={solves[5]}
              onChange={(e) => setSolvesWrapper("5", e.target.value)}
              autoComplete="off"
              required
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
              placeholder="Grade attempted"
              value={gradeAttempted}
              readOnly
            />
            <input
              type="text"
              id="test-result-form-field"
              placeholder="Result"
              value={result}
              readOnly
            />
            <input
              type="text"
              id="test-result-form-field"
              value={printedName}
              placeholder="Name to be printed"
              autoComplete="off"
              onChange={(e) => setPrintedName(e.target.value)}
              required
            />
            <button className="submit-btn" type="submit">
              <span className="btn-text">Add Record</span>
            </button>

            <div className="dropdown">
              {students
                .filter((item) => {
                  const searchInputToLower = searchInput.toLowerCase();
                  const storedNameToLower = item.sname.toLowerCase();

                  return (
                    !isSelected &&
                    searchInput &&
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
                    {item.sname} <br /> {item.birthday.slice(0, 10)}{" "}
                  </div>
                ))}
            </div>
          </form>
        </div>
      </Draggable>
    </>
  );
}
