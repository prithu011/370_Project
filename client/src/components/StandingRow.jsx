const StandingRow = ({ position, clubLogo, clubName, stats, matchIcons }) => {
  return (
    <article className="flex justify-between items-center px-2 py-4 rounded-lg bg-slate-600 bg-opacity-40 max-md:px-1 max-md:py-2 max-sm:flex-col max-sm:items-start max-sm:px-0 max-sm:py-2">
      <div className="flex gap-4 justify-center items-center p-8 bg-zinc-900 h-[124px] rounded-[104px] w-[124px]">
        <span className="text-base font-medium">{position}</span>
        <img src={clubLogo} alt={clubName} className="w-8 h-8" />
        <span className="text-base font-medium">{clubName}</span>
      </div>
      <div className="flex gap-16 max-md:gap-8 max-sm:gap-2.5">
        <span>{stats.wins}</span>
        <span>{stats.draws}</span>
        <span>{stats.losses}</span>
        <span>{stats.points}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: matchIcons }} />
    </article>
  );
};

export default StandingRow;
