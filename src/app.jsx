// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home component
import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import TestResults from "./pages/TestResults";
import Students from "./pages/Students.jsx";
import Events from "./pages/Events.jsx";
import EventsUpcoming from "./pages/EventsUpcoming.jsx";
import EventsPast from "./pages/EventsPast.jsx";
import Login from "./pages/Login.jsx";
import NoPage from "./pages/NoPage.jsx";
import useToken from "./useToken.jsx";
import { useEffect } from "react";

export default function App() {
  const { token, setToken } = useToken();
  useEffect(() => {}, [token]);

  if (!token) return <Login setToken={setToken} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/upcoming" element={<EventsUpcoming />} />
          <Route path="events/past" element={<EventsPast />} />
          <Route path="students" element={<Students />} />
          <Route path="testresults" element={<TestResults />} />
          <Route path="testresults/:eventInfo" element={<TestResults />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
