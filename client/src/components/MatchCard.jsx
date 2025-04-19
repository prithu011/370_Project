const MatchCard = ({ team1, team2, score, date, team1Image, team2Image }) => {
  return (
    <article className="flex justify-between items-center px-6 py-4 w-full rounded-lg bg-zinc-900">
      <div className="flex gap-4 items-center">
        <img src={team1Image} alt={team1} className="w-8 h-8 rounded-[32px]" />
        <span className="text-base font-medium">{team1}</span>
      </div>
      <div className="px-4 py-1.5 text-sm font-semibold text-amber-300 rounded-2xl bg-amber-300 bg-opacity-10">
        {score}
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-base font-medium">{team2}</span>
        <img src={team2Image} alt={team2} className="w-8 h-8 rounded-[32px]" />
      </div>
      <div className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-white bg-opacity-10">
        Full - Time
      </div>
      <div className="flex gap-10 items-center">
        <span className="text-sm text-neutral-400">{date}</span>
        <button aria-label="Info" className="text-neutral-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
              fill="#A4A4A4"
            />
          </svg>
        </button>
        <button aria-label="Statistics" className="text-neutral-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.03133 3V19H21.2819V21H3V3H5.03133ZM20.5639 6.293L22 7.707L16.2036 13.414L13.1566 10.415L8.79639 14.707L7.36024 13.293L13.1566 7.586L16.2036 10.585L20.5639 6.293Z"
              fill="#A4A4A4"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default MatchCard;
