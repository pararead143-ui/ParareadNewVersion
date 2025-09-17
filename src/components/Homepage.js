import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = ({ user, setUser }) => {
  const [readings, setReadings] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/pararead_app/readings/", {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        });
        setReadings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReadings();
  }, [user]);

  const handleUpload = async () => {
    if (!title || !content) return alert("Please provide both title and content!");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/pararead_app/readings/",
        { title, content },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setReadings([...readings, res.data]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("parareadUser");
    setUser(null);
  };

  return (
    <div style={container}>
      <header style={header}>
        <h2 style={{ color: "#FF6B6B" }}>Hello, {user.username}!</h2>
        <button style={logoutBtn} onClick={handleLogout}>Logout</button>
      </header>

      <section style={uploadSection}>
        <h3 style={{ color: "#4ECDC4" }}>Upload New Reading</h3>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={input} />
        <textarea rows="5" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} style={textarea}></textarea>
        <button onClick={handleUpload} style={button}>Upload</button>
      </section>

      <section style={readingSection}>
        <h3 style={{ color: "#4ECDC4" }}>Your Readings</h3>
        {readings.length === 0 ? <p>No readings yet.</p> :
          readings.map(reading => (
            <div key={reading.id} style={readingCard}>
              <h4 style={{ margin: "0 0 5px", color: "#333" }}>{reading.title}</h4>
              <p style={{ margin: 0, color: "#555" }}>{reading.content}</p>
            </div>
          ))}
      </section>
    </div>
  );
};

const container = { maxWidth: "700px", margin: "50px auto", fontFamily: "'Segoe UI', sans-serif" };
const header = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const logoutBtn = { padding: "8px 15px", backgroundColor: "#FF6B6B", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
const uploadSection = { marginTop: "30px" };
const readingSection = { marginTop: "40px" };
const input = { width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" };
const textarea = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" };
const button = { marginTop: "10px", padding: "10px 20px", backgroundColor: "#FF6B6B", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" };
const readingCard = { marginBottom: "15px", padding: "12px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #ddd" };

export default Homepage;
