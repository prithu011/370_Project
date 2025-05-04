import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom";

import FootballDashboard from "./components/Dashboard/FootballDashboard";
import Login from "./components/UserManagment/Login";
import Register from "./components/UserManagment/register";
import Logout from "./components/UserManagment/Logout";
import News from "./components/Transfer/News";
import Layout from "./components/Dashboard/Layout";

import PlayerCard from "./components/playercard/playercard";

import "./App.css";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [user, setUser] = useState(true); // true for now
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
          {/* Auth routes (no navbar) */}
          <Route
            path="/"
            element={
              user ? (
                showRegister ? (
                  <Register
                    onRegister={setUser}
                    onSwitch={() => setShowRegister(false)}
                  />
                ) : (
                  <Login
                    onLogin={setUser}
                    onSwitch={() => setShowRegister(true)}
                  />
                )
              ) : (
                <Logout onLogout={() => setUser(null)} user={user} />
              )
            }
          />

          {/* Protected app routes with navbar */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={user ? <FootballDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/transfer"
              element={user ? <News /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/playercard"
              element={user ? <PlayerCard /> : <Navigate to="/" />}
            /> */}
          </Route>
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
