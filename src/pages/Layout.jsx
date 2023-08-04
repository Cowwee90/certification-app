import { Outlet, Link } from "react-router-dom";
import "../styles.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { LogoutButton } from "../logout-button";

const Layout = () => {
  const [navbarDownBtn, setNavbarDownBtn] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [navbarUpBtn, setNavbarUpBtn] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-item">
          Home
        </Link>

        <Link
          to="/events"
          className="navbar-item"
          onMouseEnter={() =>
            setNavbar(true) + setNavbarUpBtn(true) + setNavbarDownBtn(false)
          }
        >
          Events
          {navbarDownBtn && (
            <FontAwesomeIcon icon={faArrowDown} className="nav-arrow" />
          )}
          {navbarUpBtn && (
            <FontAwesomeIcon icon={faArrowUp} className="nav-arrow" />
          )}
        </Link>
        {navbar && (
          <div
            className="navbar-sub-menu"
            onMouseLeave={() =>
              setNavbar(false) + setNavbarUpBtn(false) + setNavbarDownBtn(true)
            }
          >
            <Link to="/events/upcoming" className="navbar-sub-item">
              Upcoming Events
            </Link>
            <Link to="/events/past" className="navbar-sub-item">
              Past Events
            </Link>
          </div>
        )}

        <Link to="/students" className="navbar-item">
          Students
        </Link>
        <Link to="/testresults" className="navbar-item">
          Test Results
        </Link>
        <LogoutButton></LogoutButton>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
