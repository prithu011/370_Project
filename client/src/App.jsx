import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FootballDashboard from "./components/Dashboard/FootballDashboard";
import Login from "./components/UserManagment/Login";
import Register from "./components/UserManagment/register";
import Logout from "./components/UserManagment/Logout";
import Layout from "./components/Dashboard/Layout";
import PlayerList from "./components/Dashboard/sidebar/playerlist";
import ManagerList from "./components/Dashboard/sidebar/ManagerList";
import ClubList from "./components/Dashboard/sidebar/ClubList";
// import Transfer from "./components/Transfer/Transfer";
// import MyTeam from "./components/MyTeam/MyTeam";

import "./App.css";

function App() {
  const [user, setUser] = useState(null); // null by default
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Optional: Auto-fetch user session from localStorage or backend
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : showRegister ? (
                <Register
                  onRegister={(userData) => {
                    setUser(userData);
                    setShowRegister(false);
                  }}
                  onSwitch={() => setShowRegister(false)}
                />
              ) : (
                <Login
                  onLogin={(userData) => {
                    setUser(userData);
                    setShowRegister(false);
                  }}
                  onSwitch={() => setShowRegister(true)}
                />
              )
            }
          />

          <Route
            path="/logout"
            element={<Logout onLogout={() => setUser(null)} user={user} />}
          />

          {/* Protected Routes */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={user ? <FootballDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={user ? <FootballDashboard /> : <Navigate to="/" />}
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
              path="/club"
              element={user ? <ClubList /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/transfer"
              element={user ? <Transfer /> : <Navigate to="/" />}
            />
            <Route
              path="/MyTeam"
              element={user ? <MyTeam /> : <Navigate to="/" />}
            /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
