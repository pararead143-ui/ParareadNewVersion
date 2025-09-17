import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        { username, password }
      );

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      console.log("Login successful!", accessToken, refreshToken);

      const userData = { username, accessToken, refreshToken };
      setUser(userData);
      localStorage.setItem("parareadUser", JSON.stringify(userData));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Check username/password or backend.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h2
        style={{
          color: "#FF6B6B",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Welcome to ParaRead
      </h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#FF6B6B",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Log In
        </button>
      </form>
      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        Don't have an account?{" "}
        <span
          style={{ color: "#4ECDC4", cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/signup")}
        >
          Create Account
        </span>
      </p>
    </div>
  );
};

export default Login;
