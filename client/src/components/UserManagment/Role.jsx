import React from "react";

const Role = ({ role }) => {
  switch (role) {
    // case "admin":
    //   return (
    //     <div className="p-3 bg-red-100 text-red-800 rounded-md shadow-sm">
    //       <h3 className="text-lg font-semibold">Welcome, Admin 👑</h3>
    //       <p>You have full access to the system.</p>
    //     </div>
    //   );
    case "agent":
      return (
        <div className="p-3 bg-blue-100 text-blue-800 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">Hello, Agent 🎯</h3>
          <p>You can manage players and transfers.</p>
        </div>
      );
    case "user":
    default:
      return (
        <div className="p-3 bg-green-100 text-green-800 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">Hi there, User 🙌</h3>
          <p>You can view your dashboard and settings.</p>
        </div>
      );
  }
};

export default Role;
