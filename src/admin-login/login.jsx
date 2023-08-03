import CryptoJS from "crypto-js";
import { useState } from "react";
import { Redirect } from 'react-router-dom';

export default function LoginPage() {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");

  const [encrptedData, setEncrptedData] = useState("");
  const [decrptedData, setDecrptedData] = useState("");

  const secretPass = "password";

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    setEncrptedData(data);
  };

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
  };

  const switchScreen = (type) => {
    setText("");
    setEncrptedData("");
    setDecrptedData("");
    setScreen(type);
  };

  const handleClick = () => {
    if (!text) return;

    if (screen === "encrypt") encryptData();
    else decryptData();
  };

  const LoggedInPage = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // send a request to the server to validate the credentials
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (response.ok) {
          // set the user as logged in and store the token in local storage
          const { token } = await response.json();
          localStorage.setItem('token', token);
          setLoggedIn(true);
        } else {
          setLoginError('Invalid username or password');
        }
      } catch (error) {
        console.error(error);
        setLoginError('An error occurred. Please try again later');
      }
    }

    return (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {loginError && <div>{loginError}</div>}
    </form>
  </div>
);
};


  return (
    <div className="login"   style={{
        marginLeft: "300px",
        marginTop: "10vh",
      }}>
      <div>
        <button
          className="btn btn-left"
          style={{
            backgroundColor: screen === "encrypt" ? "mistyrose" : "cornsilk",
          }}
          onClick={() => {
            switchScreen("encrypt");
          }}
        >
          Click to Encrypt
        </button> &nbsp; &nbsp; &nbsp;

        <button
          className="btn btn-right"
          style={{
            backgroundColor: screen === "decrypt" ? "mistyrose" : "cornsilk",
          }}
          onClick={() => {
            switchScreen("decrypt");
          }}
        >
          Click to Decrypt
        </button>
      </div>
        <br/><br/>
      <div className="card">
        <input
        id="searchbar"
          value={text}
          onChange={({ target }) => {
            setText(target.value);
          }}
          name="text"
          type="text"
          placeholder={
            screen === "encrypt" ? "Enter Text" : "Enter Encrypted Data"
          }
        /> &nbsp; &nbsp; &nbsp;

        <button className="btn submit-btn" onClick={handleClick}
        style={{
          backgroundColor: "mediumseagreen",
          color: "white",
        }}>
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {encrptedData || decrptedData ? (
        <div className="content">
          <label>{screen === "encrypt" ? "Encrypted" : "Decrypted"} chain is:</label>
          <h3>{screen === "encrypt" ? encrptedData : decrptedData}</h3>
        </div>
      ) : null}
    </div>
  );
}
