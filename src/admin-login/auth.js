import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";

const Auth = () => {
    return (
        <React.Fragment>
        <Login />
        </React.Fragment>
    );
}
export default Auth;
