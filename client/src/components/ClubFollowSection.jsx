import React from "react";
import NavigationArrows from "./NavigationArrows";

const ClubFollowSection = () => {
  const clubs = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0725e5c0729d4ebad9d5540404af44549a46b89f?placeholderIfAbsent=true",
      name: "Club 1",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/963a6b7f13f820fb9f46726e7f2fc891a946bbcd?placeholderIfAbsent=true",
      name: "Club 2",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f929735e92fd087ca994b1bc4ba7d07d17c406e1?placeholderIfAbsent=true",
      name: "Club 3",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/038cdd713e450944ec83c927652f48f53c049267?placeholderIfAbsent=true",
      name: "Club 4",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f4170d42933e08f0f2c5f3ad5a43c06cc27ffee2?placeholderIfAbsent=true",
      name: "Club 5",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8a29e4d0225140ee4bf809d22a2b8bca87a1e89e?placeholderIfAbsent=true",
      name: "Club 6",
    },
  ];

  return (
    <section className="mb-12 w-full max-w-[1030px] max-md:max-w-full">
      <header className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-semibold">🎮 Follow Club</h2>
        <NavigationArrows />
      </header>

      <div className="flex gap-5 items-center overflow-x-auto">
        {clubs.map((club, index) => (
          <article
            key={index}
            className="flex gap-4 justify-center items-center p-8 bg-zinc-900 h-[124px] rounded-[104px] w-[124px] flex-shrink-0"
          >
            <img src={club.image} alt={club.name} className="w-full h-auto" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default ClubFollowSection;
