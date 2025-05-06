import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TeamGallery from "./Teamsgallery";
import NewsFeed from "./NewsFeed";
import LiveMatches from "./LiveMatches";
import "./FootballDashboard.css"; 

const FootballDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="flex justify-end">
      </div>
      <div className="section">
        <TeamGallery />
      </div>
      <LiveMatches />
      <div className="section">
        <NewsFeed />
      </div>
    </div>
  );
};

export default FootballDashboard;
