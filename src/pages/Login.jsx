import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import sha256 from "js-sha256";

async function loginUser(credentials) {
  return fetch("http://certification-api.glitch.me/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }); //.then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedPassword = sha256(password);

    const token = await loginUser({
      username,
      encryptedPassword,
    });
    console.log("token", token);
    setToken(token);
  };

  useEffect(() => {
    console.log("password", password);
  }, [password]);

  return (
    <>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
