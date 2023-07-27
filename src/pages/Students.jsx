import { Link } from "react-router-dom";

import { StudentTable } from "../students/student-table.jsx";
import { EventTable } from "../events/event-table.jsx";
import { TestResultTable } from "../test-results/test-result-table.jsx";
import { AddStudentButton } from "../show-form.jsx";
import { TestResultForm } from "../student-search-bar/test-result-form.jsx";

const Students = () => {
  return (
    <div>
      <StudentTable />
    </div>
  );
};

export default Students;
