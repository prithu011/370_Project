import React, { useEffect, useState } from "react";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);

  const fetchLiveMatches = async () => {
    try {
      const response = await fetch(
        "https://v3.football.api-sports.io/fixtures?live=all",
        {
          headers: {
            "x-apisports-key": " 88f0f88cdcmsh03a4dbc75e0192fp1818d2jsnb3e93c306310",
            "x-rapidapi-host": "v3.football.api-sports.io"
          }
        }
      );
      const data = await response.json();
      if (data.response) {
        setMatches(data.response.slice(0, 10)); 
      }
    } catch (error) {
      console.error("Error fetching live matches:", error);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Live Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.length > 0 ? (
          matches.map((match, idx) => (
            <div key={idx} className="bg-gray-900 p-4 rounded shadow">
              <p className="text-center font-semibold text-lg mb-2">
                {match.teams.home.name} vs {match.teams.away.name}
              </p>
              <p className="text-center text-green-400 font-bold text-xl">
                {match.goals.home} - {match.goals.away}
              </p>
              <p className="text-center text-sm text-gray-300 mt-1">
                {match.fixture.status.long}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No live matches currently.</p>
        )}
      </div>
    </div>
  );
};

export default LiveMatches;
