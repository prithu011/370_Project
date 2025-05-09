import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../AuthContext'

const UserPreferences = ({ onClubSelected }) => {
  const [clubs, setClubs] = useState([])
  const [selectedClub, setSelectedClub] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchClubs = async () => {
      const response = await axios.get('http://localhost:5000/api/clubs')
      setClubs(response.data)
    }
    fetchClubs()
  }, [])

  const handleClubSelect = async (clubId) => {
    try {
      await axios.post('http://localhost:5000/api/user/preferences', {
        userId: currentUser.uid,
        clubId,
      })
      setSelectedClub(clubId)
      onClubSelected(clubId)
    } catch (error) {
      console.error('Error setting preferred club:', error)
    }
  }

  return (
    <div className="club-selection p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Select Your Favorite Club</h2>
      <div className="grid grid-cols-3 gap-4">
        {clubs.map((club) => (
          <div
            key={club.club_id}
            className={`p-4 border rounded cursor-pointer ${
              selectedClub === club.club_id ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleClubSelect(club.club_id)}
          >
            <img
              src={club.logo_url}
              alt={club.name}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p className="text-center font-semibold">{club.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPreferences
