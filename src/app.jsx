//import React, { useEffect, useState } from "react";
import { StudentTable } from "./student-table.jsx";
import { EventTable } from "./event-table.jsx";
import { TestResultTable } from "./test-result-table.jsx";
import { Form } from "./form.jsx";
import { Button } from "./show-form.jsx";

const App = () => {
  return (
    <div>
      <Button />
      <StudentTable />
      <EventTable />
      <TestResultTable />
    </div>
  );
};

export default App;
