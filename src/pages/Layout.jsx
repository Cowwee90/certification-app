import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/testresults" className="navbar-item">
              Test Results
            </Link>
          </li>
          <li>
            <Link to="/students" className="navbar-item">
              Students
            </Link>
          </li>
          <li>
            <Link to="/events" className="navbar-item">
              Events
            </Link>
          </li>
          <li>
            <Link to="/events/upcoming" className="navbar-item">
              Upcoming Events
            </Link>
          </li>
          <li>
            <Link to="/events/past" className="navbar-item">
              Past Events
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
