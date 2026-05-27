import { useEffect, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import { getIncidents } from "../services/api.js";

export default function Hero() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();
      setIncidents(data);
    }

    loadData();
  }, []);

  const totalIncidents = incidents.length;

  const totalCountries = new Set(
    incidents
      .map((item) => item.country || item.Country)
      .filter(Boolean)
  ).size;

  const highSeverity = incidents.filter(
    (item) =>
      (item.severity || item.Severity)?.toLowerCase() === "high"
  ).length;

  return (
    <section className="pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-24 px-4 sm:px-6 lg:px-16 xl:px-20">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-14 items-center">
        
        {/* LEFT SIDE */}
        <div className="order-2 xl:order-1">
          {/* TAG */}
          <div className="inline-flex items-center bg-[#eef5c8] px-4 py-2 rounded-full mb-6 md:mb-8">
            <span className="text-xs md:text-sm font-medium text-black">
              Data-Driven Awareness
            </span>
          </div>

          {/* TITLE */}
          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-[5.2rem]
            leading-[0.95]
            font-bold
            tracking-tight
            text-black
          ">
            Visualizing

            <span className="block text-[#D9F75A] mt-2 md:mt-4">
              Discrimination
            </span>

            <span className="block mt-2 md:mt-4">
              in Football
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="
            text-[#666]
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            mt-6 md:mt-10
            max-w-xl
          ">
            Pulse transforms data into awareness.
            We track, analyze, and visualize
            discrimination incidents across global
            football to drive meaningful change.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 mt-8 md:mt-10">
            <button className="
              bg-black
              text-white
              px-6 md:px-8
              py-4 md:py-5
              rounded-full
              flex
              items-center
              justify-center
              gap-3
              hover:scale-105
              transition-all
            ">
              Explore Data
              <ArrowRight className="size-5" />
            </button>

            <button className="
              bg-white
              border
              border-[#e5e5e5]
              px-6 md:px-8
              py-4 md:py-5
              rounded-full
              hover:bg-[#f5f5f5]
              transition-all
            ">
              View Reports
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-10 md:mt-14">
            {/* INCIDENTS */}
            <div className="
              bg-white
              border
              border-[#ececec]
              rounded-[28px]
              px-5 md:px-8
              py-5 md:py-6
              flex
              items-center
              gap-4
              shadow-sm
            ">
              <div className="size-12 md:size-14 rounded-full bg-[#eef5c8] flex items-center justify-center">
                <TrendingUp className="size-5 md:size-6 text-[#b7d63f]" />
              </div>

              <div>
                <p className="text-2xl md:text-4xl font-bold text-black">
                  {totalIncidents}
                </p>

                <p className="text-[#666] text-xs md:text-sm">
                  Tracked Incidents
                </p>
              </div>
            </div>

            {/* COUNTRIES */}
            <div className="
              bg-white
              border
              border-[#ececec]
              rounded-[28px]
              px-5 md:px-8
              py-5 md:py-6
              flex
              items-center
              gap-4
              shadow-sm
            ">
              <div className="size-12 md:size-14 rounded-full bg-[#f7f2e8] flex items-center justify-center">
                <AlertTriangle className="size-5 md:size-6 text-[#c6a56b]" />
              </div>

              <div>
                <p className="text-2xl md:text-4xl font-bold text-black">
                  {totalCountries}
                </p>

                <p className="text-[#666] text-xs md:text-sm">
                  Countries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative order-1 xl:order-2">
          <div className="bg-white rounded-[30px] md:rounded-[40px] p-4 md:p-6 lg:p-8 shadow-xl border border-[#ececec]">
            
            {/* LIVE TAG */}
            <div className="
              absolute
              top-4
              right-4
              md:-top-5
              md:right-8
              bg-white
              rounded-3xl
              px-4 md:px-6
              py-3 md:py-4
              shadow-lg
              border
              border-[#ececec]
              z-10
            ">
              <p className="text-xs md:text-sm text-[#666]">
                Live Updates
              </p>

              <p className="font-bold text-sm md:text-lg text-black">
                Real-time tracking
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-[260px] sm:h-[350px] md:h-[420px] lg:h-[500px]">
              <img
                src="/fut.avif"
                alt="Football discrimination awareness"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* BOTTOM STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-5 md:mt-6">
              <div className="bg-[#f5f7e8] rounded-[24px] md:rounded-[28px] p-5 md:p-6 border border-[#ececec]">
                <p className="text-[#666] text-xs md:text-sm mb-2">
                  This Month
                </p>

                <p className="text-3xl md:text-5xl font-bold text-black">
                  +{incidents.length}
                </p>

                <p className="text-[#666] mt-2 text-xs md:text-sm">
                  Live reports added
                </p>
              </div>

              <div className="bg-[#f8f7fc] rounded-[24px] md:rounded-[28px] p-5 md:p-6 border border-[#ececec]">
                <p className="text-[#666] text-xs md:text-sm mb-2">
                  High Severity
                </p>

                <p className="text-3xl md:text-5xl font-bold text-black">
                  {highSeverity}
                </p>

                <p className="text-[#666] mt-2 text-xs md:text-sm">
                  Action required
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}