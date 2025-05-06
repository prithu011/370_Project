import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,Routes,Route, Navigate,} from "react-router-dom";

import FootballDashboard from "./components/Dashboard/FootballDashboard";
import Login from "./components/UserManagment/Login";
import Register from "./components/UserManagment/register";
import Logout from "./components/UserManagment/Logout";
import News from "./components/Transfer/News";
import Layout from "./components/Dashboard/Layout";
import PlayerList from "./components/Dashboard/sidebar/playerlist";
import ManagerList from "./components/Dashboard/sidebar/ManagerList";

import "./App.css";
import ClubList from "./components/Dashboard/sidebar/ClubList";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [user, setUser] = useState(true); // true for now
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Authentication Routes (Login/Register/Logout) */}
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

          {/* Protected Routes with Navbar + Sidebar */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={user ? <FootballDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/transfer"
              element={user ? <News /> : <Navigate to="/" />}
            />
            <Route
              path="/player"
              element={user ? <PlayerList /> : <Navigate to="/" />}
            />
            <Route
              path="/manager"
              element={user ? <ManagerList /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={user ? <FootballDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/club"
              element={user ? <ClubList /> : <Navigate to="/" />}
            />
            
            
            {/* Add more protected pages here later */}
          </Route>
        </Routes>
      </div>


    </Router>
  );
}

export default App;
