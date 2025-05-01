import React from "react";
import Navbar from "../Dashboard/Navbar";
import TeamGallery from "../Dashboard/Teamsgallery";
import NewsFeed from "../Dashboard/NewsFeed";
import LiveMatches from "./LiveMatches";

const FootballDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="mb-5">
        <TeamGallery />
      </div>
      <LiveMatches />
      <div className="mt-[10px]">
        <NewsFeed />
      </div>
    </div>
  );
};

export default FootballDashboard;

