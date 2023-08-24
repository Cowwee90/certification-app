import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import sha256 from "js-sha256";
import axios from "axios";

// export async function loginUser(credentials) {
//   return fetch("http://certification-api.glitch.me/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }); //.then((data) => data.json());
// }

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  //
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const encryptedPassword = sha256(password);

  //   const token = await loginUser({
  //     username,
  //     encryptedPassword,
  //   });
  //   console.log("token", token);
  //   setToken(token);
  // };
  //
  // useEffect(() => {
  //   console.log("password", password);
  // }, [password]);
  // const submitLoginForm = (event) => {
  //        event.preventDefault();
  //    }

const loginAPI = 'http://certification-api.glitch.me/login';
const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    const formElement = document.querySelector('#loginForm');
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);
    const btnPointer = document.querySelector('#login-btn');
    btnPointer.innerHTML = 'Please wait..';
    btnPointer.setAttribute('disabled', true);
    axios.post(loginAPI, formDataJSON).then((response) => {
        btnPointer.innerHTML = 'Login';
        btnPointer.removeAttribute('disabled');
        const data = response.data;
        const token = data.token;
        if (!token) {
            alert('Unable to login. Please try after some time.');
            return;
        }
        localStorage.clear();
        localStorage.setItem('user-token', token);
        setTimeout(() => {
            navigate('/home');
        }, 500);
}).catch((error) => {
        btnPointer.innerHTML = 'Login';
        btnPointer.removeAttribute('disabled');
        alert("Oops! Some error occured.");
    });
}

  return (
    <>
    <div className="login-section">
    <h1>Please Log In</h1>
    <form id="loginForm" onSubmit={handleSubmit}>
        <p>Username</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label>
        <p>Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button className="btn-success" id="login-btn" type="submit">Submit</button>
      </div>
    </form>
    </div>
    </>
  );
}
