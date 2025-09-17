import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      // Send all required and optional fields
      await axios.post("http://127.0.0.1:8000/api/users_app/signup/", {
        username,
        password,
        password2: confirmPassword,
        email: email || "",
        first_name: firstName || "",
        last_name: lastName || ""
      });

      // Log in immediately after signup using JWT endpoint
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password
      });

      const userData = {
        username,
        accessToken: res.data.access,
        refreshToken: res.data.refresh
      };

      setUser(userData);
      localStorage.setItem("parareadUser", JSON.stringify(userData));

      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Signup failed! Check console for details.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ color: "#333" }}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <input type="email" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <input type="text" placeholder="First Name (optional)" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <input type="text" placeholder="Last Name (optional)" value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#FF6B6B", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
