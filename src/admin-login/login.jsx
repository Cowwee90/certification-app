import CryptoJS from "crypto-js";
import { useState } from "react";

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

        <h1>Please Log In</h1>
        <form className="login" style={{
            marginTop: "10vh",
          }}>
   <label>
     <p>Username</p>
     <input type="text" />
   </label>
   <label>
     <p>Password</p>
     <input type="password" />
   </label><br/><br/>
     <button type="submit">Submit</button>
 </form>
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
