import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../AuthContext'

const MyTeam = () => {
  const [myTeamData, setMyTeamData] = useState({
    players: [],
    managers: [],
    clubs: [],
  })
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchMyTeam = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/myteam/${currentUser.uid}`
        )
        setMyTeamData(response.data)
      } catch (error) {
        console.error('Error fetching team data:', error)
      }
    }

    if (currentUser) {
      fetchMyTeam()
    }
  }, [currentUser])

  const handleRemove = async (itemId, itemType) => {
    try {
      await axios.delete(`http://localhost:5000/api/myteam/remove`, {
        data: {
          userId: currentUser.uid,
          itemId,
          itemType,
        },
      })
      // Refresh data after removal
      const response = await axios.get(
        `http://localhost:5000/api/myteam/${currentUser.uid}`
      )
      setMyTeamData(response.data)
    } catch (error) {
      alert('Failed to remove item: ' + error.message)
    }
  }

  return (
    <div className="my-team-page p-4">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>

      <div className="sections space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">My Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myTeamData.players.map((player) => (
              <div key={player.player_id} className="border p-4 rounded shadow">
                <img
                  src={player.image_url}
                  alt={player.name}
                  className="w-24 h-24 object-cover mb-2"
                />
                <h3 className="font-bold">{player.name}</h3>
                <p>Position: {player.position}</p>
                <button
                  onClick={() => handleRemove(player.player_id, 'player')}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Similar sections for Managers and Clubs */}
      </div>
    </div>
  )
}

export default MyTeam
