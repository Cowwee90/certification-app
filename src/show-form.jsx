import React, { useState } from "react";
import { Form } from "./add-student-form.jsx";
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
      <button class="button" onClick={handleClick}>
        Add Student
      </button>

      {isShown && <Form />}
    </div>
  );
}
