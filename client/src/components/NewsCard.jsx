const NewsCard = ({ image, category, title, description }) => {
  return (
    <article className="flex flex-col gap-4 items-start w-[246px] max-md:w-[calc(50%_-_12px)] max-sm:w-full">
      <img src={image} alt={title} className="h-44 rounded-2xl w-[244px]" />
      <span className="text-xs font-semibold text-amber-300">{category}</span>
      <div className="flex flex-col gap-2">
        <h3 className="mb-8 text-base font-medium leading-6">{title}</h3>
        <p className="overflow-hidden text-sm leading-4 whitespace-nowrap text-ellipsis text-neutral-400">
          {description}
        </p>
      </div>
    </article>
  );
};

export default NewsCard;
