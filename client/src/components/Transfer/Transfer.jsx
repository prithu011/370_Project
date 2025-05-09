import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../AuthContext'
import PlayerList from '../Dashboard/sidebar/playerlist'
import ManagerList from '../Dashboard/sidebar/ManagerList'
import ClubList from '../Dashboard/sidebar/ClubList'

const Transfer = () => {
  const [activeTab, setActiveTab] = useState('players')
  const [userBalance, setUserBalance] = useState(1000000) // Default balance
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { currentUser } = useAuth()

  const handleBuy = async (item, type) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post('http://localhost:5000/api/buy', {
        userId: currentUser.userID,
        itemId: item.player_id,
        itemType: type,
        price: item.market_value,
      })

      setUserBalance(response.data.newBalance)
      alert('Purchase successful!')
    } catch (error) {
      setError(error.response?.data?.message || 'Purchase failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="transfer-page p-4">
      <div className="user-balance text-xl font-bold mb-6">
        Balance: ${userBalance}
      </div>

      <h1 className="text-2xl font-bold mb-4">Transfer Market</h1>

      {error && <div className="error-message text-red-500 mb-4">{error}</div>}

      <div className="tabs flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'players' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('players')}
        >
          Players
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'managers' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('managers')}
        >
          Managers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'clubs' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('clubs')}
        >
          Clubs
        </button>
      </div>

      <div className="content">
        {loading ? (
          <div className="loading text-center py-4">Loading...</div>
        ) : (
          <>
            {activeTab === 'players' && (
              <PlayerList
                showBuyButton={true}
                onBuy={(player) => handleBuy(player, 'player')}
                userBalance={userBalance}
                apiUrl="http://localhost:5000/api/players"
              />
            )}
            {activeTab === 'managers' && (
              <ManagerList
                showBuyButton={true}
                onBuy={(manager) => handleBuy(manager, 'manager')}
                userBalance={userBalance}
                apiUrl="http://localhost:5000/api/managers"
              />
            )}
            {activeTab === 'clubs' && (
              <ClubList
                showBuyButton={true}
                onBuy={(club) => handleBuy(club, 'club')}
                userBalance={userBalance}
                apiUrl="http://localhost:5000/api/clubs"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Transfer
