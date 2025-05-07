import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import FootballDashboard from './components/Dashboard/FootballDashboard'
import Login from './components/UserManagment/Login'
import Register from './components/UserManagment/register'
import Logout from './components/UserManagment/Logout'
import News from './components/Transfer/News'
import Layout from './components/Dashboard/Layout'
import PlayerList from './components/Dashboard/sidebar/playerlist'
import ManagerList from './components/Dashboard/sidebar/ManagerList'
import ClubList from './components/Dashboard/sidebar/ClubList'
import AdminPage from './components/admin/admin'
import League from './components/Dashboard/sidebar/league'

// import AgentList from './components/Dashboard/sidebar/agent'

import './App.css'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [backendData, setBackendData] = useState([{}])
  const [user, setUser] = useState(true) // true for now
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => response.json())
      .then((data) => setBackendData(data))
  }, [])

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Authentication Routes */}
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
              path="/league"
              element={user ? <League /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={user ? <FootballDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/club"
              element={user ? <ClubList /> : <Navigate to="/" />}
            />
            {/* Admin Page Route */}
            <Route
              path="/admin"
              element={user ? <AdminPage /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/Agent"
              element={user ? <AgentList /> : <Navigate to="/" />}
            /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
