import React from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const Logout = ({ onLogout, user }) => {
  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout`, {
        email: user.email,
      });
      onLogout();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="logout-card">
      <h2>Welcome, {user.email}</h2>
      <p>You are logged in!</p>
      <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
