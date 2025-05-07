import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import TeamGallery from './Teamsgallery'
import NewsFeed from './NewsFeed'
import LiveMatches from './LiveMatches'
import './FootballDashboard.css'

const FootballDashboard = () => {
  const navigate = useNavigate() // Hook for navigation

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />

      {/* Team Gallery Section */}
      <div className="section">
        <TeamGallery />
      </div>

      {/* Live Matches Section */}
      <LiveMatches />

      {/* News Feed Section */}
      <div className="section">
        <NewsFeed />
      </div>
    </div>
  )
}

export default FootballDashboard
