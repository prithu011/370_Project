import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const DashboardNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    balance: "$1,250.00",
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  return (
    <div>
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-gray-800 text-white px-6 py-4 shadow-lg z-50">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-xl focus:outline-none"
          >
            {showSidebar ? <FaTimes /> : <FaBars />}
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">
            ⚽
          </div>
          <span className="text-xl font-semibold">{user.name}</span>
        </div>

        <div className="flex items-center space-x-4">
          {["Home", "Transfer", "My Team"].map((label) => (
            <button
              key={label}
              onClick={() => {
                if (label === "Home") navigate("/dashboard");
                if (label === "Transfer") navigate("/transfer");
                if (label === "My Team") navigate("/myteam");
              }}
              className="px-3 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-200"
            >
              {label}
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setShowAccountInfo(!showAccountInfo)}
              className="px-3 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-200"
            >
              Account
            </button>

            {showAccountInfo && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow p-3 z-10 min-w-[180px] space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Balance:</strong> {user.balance}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 shadow-lg`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <ul className="space-y-4">
            {["Player", "Manager", "League", "Club"].map((item) => (
              <li
                key={item}
                className="hover:bg-gray-700 p-2 rounded-md cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}

            <li
              className="bg-red-600 hover:bg-red-700 p-2 rounded-md cursor-pointer transition-colors text-center"
              onClick={() => setShowSidebar(false)}
            >
              Exit
            </li>
          </ul>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-[72px]"></div>
    </div>
  );
};

export default DashboardNavbar;
