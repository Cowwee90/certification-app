import { TestResultTable } from "../test-results/test-result-table.jsx";
import React  from 'react';

const TestResults = ({ eventID }) => {
  return (
    <>
      <TestResultTable eventID={eventID} />
    </>
  );
};

export default TestResults;
