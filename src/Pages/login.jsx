import React, { useState } from "react";
import "../Css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signinHandler = () => {
    axios
      .get(`http://localhost:8000/detail/signin/${username}/${password}`)
      .then((res) => {
        if (res.data === null) {
          alert("Invalid Login");
        } else if (res.data.type === "student") {
          navigate("/student");
          localStorage.setItem("teacher", res.data.teacherName);
          localStorage.setItem("type", res.data.type);
           localStorage.setItem("username", res.data.username);
        } else {
          navigate("/teacher");
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("type", res.data.type);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="login-main-container">
      <div
        style={{
          width: "100%",
          height: "35px",
          backgroundColor: "#284B63",
          marginBottom: "20px",
          paddingTop: "8px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Login
      </div>
      <div className="login-wrapper">
        <input
          type="text"
          placeholder="Student Email..."
          className="login-inputs"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Student Password..."
          className="login-inputs"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          style={{
            width: "50%",
            height: "30px",
            backgroundColor: "#284B63",
            marginTop: "25px",
            color: "white",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={signinHandler}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
