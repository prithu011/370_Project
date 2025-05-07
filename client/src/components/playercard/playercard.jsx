import React from 'react'
import './PlayerCard.css'

const PlayerCard = ({ player, overallRating, onClose, mode = 'popup' }) => {
  if (!player) return null
  const isPopup = mode === 'popup'

  return (
    <div className={isPopup ? 'popup-overlay' : 'inline-card-wrapper'}>
      <div className="player-card">
        {isPopup && (
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        )}
        <img src={player.image_url} alt={player.name} className="card-bg" />
        <div className="overlay">
          <h2 className="rating bg-red">Overall Rating: {overallRating}</h2>{' '}
          <h2 className="position">{player.position}</h2>
          <h1 className="club-name">{player.club_name}</h1>
          <h1 className="player-name">{player.name}</h1>
          <p>{player.club_name}</p>
          <h2 className="player-name">{player.name}</h2>
          <div className="stars">★★★★★</div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
