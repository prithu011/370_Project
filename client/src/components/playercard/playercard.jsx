import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ player, onClose, mode = "popup" }) => {
  if (!player) return null;
  const randomRating = Math.floor(Math.random() * (90 - 85 + 1)) + 85;
  const isPopup = mode === "popup";

  return (
    <div className={isPopup ? "popup-overlay" : "inline-card-wrapper"}>
      <div className="player-card">
        {isPopup && (
          <button className="close-button" onClick={onClose}>×</button>
        )}
        <img src={player.image_url} alt={player.name} className="card-bg" />
        <div className="overlay">
          <h2 className="rating bg-red">Overall Rating: {randomRating}</h2>
          <h2 className="position">{player.position}</h2>
          <img src={player.club_logo} alt={player.club_name} className="club-logo" />
          <h2 className="player-name">{player.name}</h2>
          <div className="stars">★★★★★</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
