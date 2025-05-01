import React from 'react';

const teams = [
  {
    name: 'Barcelona',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    url: 'https://www.fcbarcelona.com/',
  },
  {
    name: 'Liverpool',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    url: 'https://www.liverpoolfc.com/',
  },
  {
    name: 'Real Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    url: 'https://www.realmadrid.com/',
  },
  {
    name: 'Man City',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    url: 'https://www.mancity.com/',
  },
  {
    name: 'Man United',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    url: 'https://www.manutd.com/',
  },
  {
    name: 'Arsenal',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    url: 'https://www.arsenal.com/',
  },
  {
    name: 'Chelsea',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    url: 'https://www.chelseafc.com/',
  },
  {
    name: 'PSG',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    url: 'https://www.psg.fr/',
  },
  {
    name: 'Atletico Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Atletico_Madrid_logo.svg/252px-Atletico_Madrid_logo.svg.png?20120407223229',
    url: 'https://en.atleticodemadrid.com/',
  },
  {
    name: 'Bayern Munich',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/900px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png',
    url: 'https://fcbayern.com/',
  },
  {
    name: 'Inter Milan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    url: 'https://www.inter.it/',
  },
  {
    name: 'AC Milan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    url: 'https://www.acmilan.com/',
  },
];

const TeamGallery = () => {
  return (
    <div className="bg-black py-4">
      <h2 className="text-xl font-bold mb-4 text-center">Top Football Teams</h2>
      <div className="flex overflow-x-auto space-x-8 px-4">
        {teams.map((team, index) => (
          <a
            key={index}
            href={team.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center min-w-[100px] hover:scale-105 transition-transform"
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="text-sm font-medium text-center text-blue-700 hover:underline">
              {team.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamGallery;
