"use client";
import React, { useState } from "react";
import MatchCard from "./MatchCard";

const MatchSection = () => {
  const [activeTab, setActiveTab] = useState("Latest Match");

  const tabs = [
    "Latest Match",
    "Coming Match",
    "Pre-season",
    "Live Games",
    "Fun Football",
  ];

  const matches = [
    {
      team1: "Argentina",
      team2: "Italy",
      score: "1 - 2",
      date: "18 December 2022",
      team1Image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e5e4ab7b5a396e70117355630268031f96f4ffbe?placeholderIfAbsent=true",
      team2Image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8025ca152ae8e4d21e77743e2eb619b077ca8878?placeholderIfAbsent=true",
    },
    {
      team1: "Portugal",
      team2: "Belgium",
      score: "2 - 3",
      date: "18 December 2022",
      team1Image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e06343bd88a1384233df3fb14a3690bc74f54ac6?placeholderIfAbsent=true",
      team2Image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/51e56dbdb2c406b81f7f75b8b2b9802f58c60dfb?placeholderIfAbsent=true",
    },
    // Add other matches...
  ];

  return (
    <section className="mb-12 w-full max-w-[1030px] max-md:max-w-full">
      <h2 className="mb-8 text-xl font-semibold">⚽ Football Match</h2>
      <div className="flex flex-col items-start mb-8">
        <div className="relative w-full h-1 bg-zinc-800" />
        <nav className="flex gap-10 -mt-8 max-md:gap-5 max-sm:flex-wrap max-sm:gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base cursor-pointer ${
                activeTab === tab
                  ? "text-white font-medium"
                  : "text-neutral-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        {matches.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </div>
    </section>
  );
};

export default MatchSection;
