//import React, { useEffect, useState } from "react";
import { StudentTable } from "./students/student-table.jsx";
import { EventTable } from "./events/event-table.jsx";
import { TestResultTable } from "./test-results/test-result-table.jsx";
import { AddStudentButton } from "./show-form.jsx";
import { TestResultForm } from "./student-search-bar/test-result-form.jsx";

const App = () => {
  return (
    <div>
      <AddStudentButton />
      <TestResultForm />
      <StudentTable />
      <EventTable />
      <TestResultTable />
    </div>
  );
};

export default App;
