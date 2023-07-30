import React, { useState } from "react";
import { Form } from "./add-student-form.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function AddStudentButton() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>
        <span className="btn-icon">
          <FontAwesomeIcon icon={faPlus} size="xl" />
        </span>
        <span className="btn-text">Add</span>
      </button>
      {isShown && <Form />}
    </div>
  );
}
