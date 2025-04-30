import React from 'react';

const teams = [
  { name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
  { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
  { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
  { name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
  { name: 'Man United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' },
  { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
  { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
  { name: 'PSG', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
  
];

const TeamGallery = () => {
  return (
    <div className="bg-gray-100 ">
      <h2 className="text-xl font-bold mb-4 text-center">Top Football Teams</h2>
      <div className="flex overflow-x-auto space-x-3 px-2">
        {teams.map((team, index) => (
          <div key={index} className="flex flex-col items-center min-w-[100px]">
            <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain mb-2" />
            <span className="text-sm font-medium text-center">{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGallery;
