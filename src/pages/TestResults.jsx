import { TestResultTable } from "../test-results/test-result-table.jsx";

const TestResults = ({ eventID }) => {
  return (
    <>
      <TestResultTable eventID={eventID} />
    </>
  );
};

export default TestResults;
