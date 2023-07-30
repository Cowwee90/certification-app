import React, { useState } from "react";
import { TestResultForm } from "./test-result-form.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function AddTestResultButton() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="btn" onClick={handleClick} style={{ width: "250px" }}>
        <span className="btn-icon">
          <FontAwesomeIcon icon={faPlus} size="xl" />
        </span>
        <span className="btn-text">Add New Test Result</span>
      </button>
      {isShown && <TestResultForm />}
    </div>
  );
}
