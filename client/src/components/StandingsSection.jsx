import React from "react";
import StandingRow from "./StandingRow";

const StandingsSection = () => {
  const standings = [
    {
      position: 1,
      clubName: "Chelsea F.C",
      clubLogo: "URL_CHELSEA",
      stats: { wins: 14, draws: 3, losses: 1, points: 35 },
      matchIcons: `<svg>...</svg>`, // SVG content for match results
    },
    // Add other standings...
  ];

  return (
    <section className="mb-12 w-full max-w-[1030px] max-md:max-w-full">
      <header className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-semibold">🏆 Standings</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center text-base font-medium">
            <span>Premier League</span>
            <button aria-label="Toggle dropdown">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 13.5913L17.5558 8.5L19 9.95436L12.5 16.5L6 9.95436L7.44422 8.5L12.5 13.5913Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <button className="flex gap-1 items-center text-base cursor-pointer text-neutral-400">
            <span>View All</span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0913 13L8 7.94422L9.45436 6.5L16 13L9.45436 19.5L8 18.0558L13.0913 13Z"
                fill="#A4A4A4"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center p-2 text-base text-neutral-400 max-md:px-1 max-md:py-2 max-sm:flex-col max-sm:items-start max-sm:px-0 max-sm:py-2">
          <span>Club</span>
          <div className="flex gap-16 max-md:gap-8 max-sm:gap-2.5">
            <span>W</span>
            <span>D</span>
            <span>L</span>
            <span>Poin</span>
          </div>
          <span>Last Match</span>
        </div>

        {standings.map((standing, index) => (
          <StandingRow key={index} {...standing} />
        ))}
      </div>

      <footer className="flex gap-4 items-center mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4920EB]" />
          <span className="text-sm">Champions League</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF0137]" />
          <span className="text-sm">Europa League</span>
        </div>
      </footer>
    </section>
  );
};

export default StandingsSection;
