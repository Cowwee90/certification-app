import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/testresults" className="navbar-item">
          Test Results
        </Link>
        <Link to="/students" className="navbar-item">
          Students
        </Link>
        <Link to="/events" className="navbar-item">
          Events
        </Link>
        <Link to="/events/upcoming" className="navbar-item">
          Upcoming Events
        </Link>
        <Link to="/events/past" className="navbar-item">
          Past Events
        </Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
