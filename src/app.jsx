//import React, { useEffect, useState } from "react";
import { StudentTable } from "./student-table.jsx";
import { EventTable } from "./event-table.jsx";
import { TestResultTable } from "./test-result-table.jsx";
import { AddStudentButton } from "./show-form.jsx";
import { TestResultForm } from "./test-result-form.jsx"; 

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
