import { Link } from "react-router-dom";
import { TestResultForm } from "../student-search-bar/test-result-form.jsx";
import { EventTable } from "../events/event-table.jsx";
import { TestResultTable } from "../test-results/test-result-table.jsx";


const Home = () => {
  return (
    <div>
      <TestResultForm />
      <EventTable />
      <TestResultTable />
    </div>
  );
};

export default Home;
