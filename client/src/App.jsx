// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FootballDashboard from "./components/FootballDashboard";
import Login from "./components/Login";
import Register from "./components/register";
import Logout from "./components/Logout";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                showRegister ? (
                  <Register onRegister={setUser} onSwitch={() => setShowRegister(false)} />
                ) : (
                  <Login onLogin={setUser} onSwitch={() => setShowRegister(true)} />
                )
              ) : (
                <Logout onLogout={() => setUser(null)} user={user} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={ <FootballDashboard />}
          />
        </Routes>
      </div>

      <div className="data-section">
        {typeof backendData.users === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => <p key={i}>{user}</p>)
        )}
      </div>
    </Router>
  );
}

export default App;
