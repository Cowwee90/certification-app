import { TestResultForm } from "../test-results/test-result-form.jsx";
import { TestResultTable } from "../test-results/test-result-table.jsx";


const TestResults = () => {

  return (
    <div className="main-section">
      <h1>All Test Results</h1>
      <div className="main-body">
        <TestResultTable />
        <TestResultForm />
      </div>
    </div>
  );
};

export default TestResults;
