const ProductCard = ({ image, name, price }) => {
  return (
    <article className="flex flex-col gap-4 items-start w-[223px] max-md:w-[calc(50%_-_12px)] max-sm:w-full">
      <div className="flex justify-center items-center p-6 w-full rounded-2xl bg-zinc-900">
        <img src={image} alt={name} className="h-[234px] w-[164px]" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h3 className="text-base font-medium">{name}</h3>
        <span className="text-lg text-amber-300">${price}</span>
      </div>
    </article>
  );
};

export default ProductCard;
