"use client";
import React from "react";
import MatchSection from "./MatchSection";
import StandingsSection from "./StandingsSection";
import ClubFollowSection from "./ClubFollowSection";
import ShoppingSection from "./ShoppingSection";
import NewsSection from "./NewsSection";

const FootballDashboard = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="flex flex-col items-center px-6 py-8 mx-auto max-w-none text-white bg-neutral-800 max-md:p-6 max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
        <MatchSection />
        <StandingsSection />
        <ClubFollowSection />

        <section className="relative mb-12 w-full max-w-[1030px] max-md:max-w-full">
          <div className="absolute top-0 left-0 w-full rounded-3xl bg-zinc-900 h-[350px]" />
          <div className="flex absolute top-14 flex-col gap-2 left-[27px] w-[306px] max-md:left-0 max-md:top-8 max-md:px-4 max-md:py-0 max-md:w-full max-sm:left-0 max-sm:top-4 max-sm:px-2 max-sm:py-0 max-sm:w-full">
            <span className="text-base font-medium text-amber-300">
              New Platform
            </span>
            <h2 className="text-3xl font-semibold leading-9 max-md:text-2xl max-sm:text-xl">
              Get one of our sports apps, which is only available on
            </h2>
            <div className="flex flex-col gap-4">
              <span className="text-base">Download Apps :</span>
              <div className="flex gap-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?placeholderIfAbsent=true"
                  alt="App Store"
                  className="w-auto h-[39px] max-md:w-[100px] max-sm:w-20"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?placeholderIfAbsent=true"
                  alt="Google Play"
                  className="w-auto h-[39px] max-md:w-[100px] max-sm:w-20"
                />
              </div>
            </div>
          </div>
        </section>

        <ShoppingSection />
        <NewsSection />
      </main>
    </>
  );
};

export default FootballDashboard;
