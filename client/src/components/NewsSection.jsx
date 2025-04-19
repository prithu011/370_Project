"use client";
import React, { useState } from "react";
import NewsCard from "./NewsCard";

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState("All News");

  const tabs = ["All News", "Hot News", "Transfer"];

  const news = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?placeholderIfAbsent=true",
      category: "PREMIER LEAGUE",
      title: "Signs of Arsenal getting stronger in the Premier League",
      description:
        "The victory over Wolves provided a comfortable distance for Arsenal at the top of the Premier League standings",
    },
    // Add other news...
  ];

  return (
    <section className="mb-12 w-full max-w-[1030px] max-md:max-w-full">
      <h2 className="mb-8 text-base font-medium leading-6">
        📰 All News and Transfer Today
      </h2>

      <div className="flex flex-col items-start mb-8">
        <div className="relative w-full h-1 bg-zinc-800" />
        <nav className="flex gap-10 -mt-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base cursor-pointer ${
                activeTab === tab
                  ? "font-medium text-white"
                  : "text-neutral-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex gap-4 items-center max-md:flex-wrap max-md:justify-center max-sm:flex-wrap max-sm:justify-center">
        {news.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
