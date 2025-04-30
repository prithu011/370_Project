import React from "react";

const Logout = ({ onLogout, user }) => {
  return (
    <div className="logout-card">
      <h2>Welcome, {user.email}</h2>
      <p>You are logged in!</p>
      <button className="btn logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Logout;
