// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home component
import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import TestResults from "./pages/TestResults";
import Students from "./pages/Students.jsx";
import Events from "./pages/Events.jsx";
import NoPage from "./pages/NoPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="testresults" element={<TestResults />} />
          <Route path="students" element={<Students />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
