import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate()

  const handleNavigation = (item) => {
    switch (item) {
      case 'Player':
        navigate('/players')
        break
      case 'Manager':
        navigate('/managers')
        break
      case 'League':
        navigate('/leagues')
        break
      case 'Club':
        navigate('/clubs')
        break
      // case 'Agent': // Added Agent navigation
      //   navigate('/agents')
      //   break
      // default:
      //   break
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40 shadow-lg`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          {['Player', 'Manager', 'League', 'Club'].map(
            (
              item // Added Agent to the menu
            ) => (
              <li
                key={item}
                onClick={() => handleNavigation(item)}
                className="hover:bg-gray-700 p-2 rounded-md cursor-pointer transition-colors"
              >
                {item}
              </li>
            )
          )}
          <li
            className="bg-red-600 hover:bg-red-700 p-2 rounded-md cursor-pointer transition-colors text-center"
            onClick={() => setShowSidebar(false)}
          >
            Exit
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
