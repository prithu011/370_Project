import React from "react";
import "./PlayerCard.css"; 
// import messiImage from "./assets/messiImage.jpeg";
// import fcbLogo from "./assets/fcb.png";
const PlayerCard = () => {
  return (
    <div className="player-card">
      <img src={"./assets/messiImage.jpeg"} alt="Messi" className="card-bg" />
      <div className="overlay">
        <div className="rating">102</div>
        <div className="position">RWF</div>
        <img src={"./assets/fcb.png"} alt="FCB" className="club-logo" />
        <div className="player-name">L. Messi</div>
        <div className="stars">★★★★★</div>
      </div>
    </div>
  );
};

export default PlayerCard;
