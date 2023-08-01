import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function AddTestResultButton({ setIsShown }) {
  const handleClick = () => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <>
      <button className="btn" onClick={handleClick}>
        <span className="btn-icon">
          <FontAwesomeIcon icon={faPlus} size="xl" />
        </span>
        <span className="btn-text">Add</span>
      </button>
    </>
  );
}
