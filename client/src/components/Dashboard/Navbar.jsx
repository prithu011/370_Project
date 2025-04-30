import React, { useState } from 'react';

const DashboardNavbar = () => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const user = {
    name: 'John Doe',
    balance: '$1,250.00',
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 shadow-lg">
      {/* Left: Logo and Dashboard name */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">
          ⚽
        </div>
        <span className="text-xl font-semibold">Dashboard</span>
      </div>

      {/* Right: Navigation buttons */}
      <div className="flex items-center space-x-4">
        {['Home', 'Transfer', 'My Team'].map((label) => (
          <button
            key={label}
            className="px-3 py-2 rounded-md hover:bg-blue-600 hover:scale-80 transition-all duration-200"
          >
            {label}
          </button>
        ))}

        {/* Account Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAccountInfo(!showAccountInfo)}
            className="px-3 py-2 rounded-md hover:bg-blue-600 hover:scale-90 transition-all duration-200"
          >
            Account
          </button>

          {showAccountInfo && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow p-3 z-10 min-w-[180px]">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Balance:</strong> {user.balance}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
