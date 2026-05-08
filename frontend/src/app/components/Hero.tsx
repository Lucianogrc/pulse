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

  // TOTAL INCIDENTS

  const totalIncidents = incidents.length;

  // UNIQUE COUNTRIES

  const totalCountries = new Set(
    incidents
      .map((item) => item.Country)
      .filter(Boolean)
  ).size;

  // HIGH SEVERITY

  const highSeverity = incidents.filter(
    (item) =>
      item.Severity?.toLowerCase() === "high"
  ).length;

  return (

    <section className="pt-44 pb-24 px-6 lg:px-20">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}

        <div>

          {/* TAG */}

          <div className="inline-flex items-center bg-[#eef5c8] px-5 py-2 rounded-full mb-8">

            <span className="text-sm font-medium text-black">
              Data-Driven Awareness
            </span>

          </div>

          {/* TITLE */}

          <h1 className="text-[5rem] leading-[0.95] font-bold tracking-tight text-black">

            Visualizing

            <span className="block text-[#D9F75A] mt-4">
              Discrimination
            </span>

            <span className="block mt-4">
              in Football
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="text-[#666] text-xl leading-relaxed mt-10 max-w-xl">

            Pulse transforms data into awareness.
            We track, analyze, and visualize
            discrimination incidents across global
            football to drive meaningful change.

          </p>

          {/* BUTTONS */}

          <div className="flex gap-5 mt-10 flex-wrap">

            <button className="bg-black text-white px-8 py-5 rounded-full flex items-center gap-3 hover:scale-105 transition-all">

              Explore Data

              <ArrowRight className="size-5" />

            </button>

            <button className="bg-white border border-[#e5e5e5] px-8 py-5 rounded-full hover:bg-[#f5f5f5] transition-all">

              View Reports

            </button>

          </div>

          {/* STATS */}

          <div className="flex flex-wrap gap-5 mt-14">

            {/* INCIDENTS */}

            <div className="bg-white border border-[#ececec] rounded-[28px] px-8 py-6 flex items-center gap-5 shadow-sm">

              <div className="size-14 rounded-full bg-[#eef5c8] flex items-center justify-center">

                <TrendingUp className="size-6 text-[#b7d63f]" />

              </div>

              <div>

                <p className="text-4xl font-bold text-black">

                  {totalIncidents}

                </p>

                <p className="text-[#666] text-sm">
                  Tracked Incidents
                </p>

              </div>

            </div>

            {/* COUNTRIES */}

            <div className="bg-white border border-[#ececec] rounded-[28px] px-8 py-6 flex items-center gap-5 shadow-sm">

              <div className="size-14 rounded-full bg-[#f7f2e8] flex items-center justify-center">

                <AlertTriangle className="size-6 text-[#c6a56b]" />

              </div>

              <div>

                <p className="text-4xl font-bold text-black">

                  {totalCountries}

                </p>

                <p className="text-[#666] text-sm">
                  Countries
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="relative">

          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#ececec]">

            {/* LIVE TAG */}

            <div className="absolute -top-6 right-8 bg-white rounded-3xl px-8 py-5 shadow-lg border border-[#ececec] z-10">

              <p className="text-sm text-[#666]">
                Live Updates
              </p>

              <p className="font-bold text-xl text-black">
                Real-time tracking
              </p>

            </div>

            {/* IMAGE */}

            <div className="relative rounded-[32px] overflow-hidden h-[520px]">

              <img
                src="/fut.avif"
                alt="Football discrimination awareness"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />

            </div>

            {/* BOTTOM STATS */}

            <div className="grid grid-cols-2 gap-5 mt-6">

              {/* THIS MONTH */}

              <div className="bg-[#f5f7e8] rounded-[28px] p-6 border border-[#ececec]">

                <p className="text-[#666] text-sm mb-2">
                  This Month
                </p>

                <p className="text-5xl font-bold text-black">

                  +{incidents.length}

                </p>

                <p className="text-[#666] mt-2 text-sm">
                  Live reports added
                </p>

              </div>

              {/* HIGH SEVERITY */}

              <div className="bg-[#f8f7fc] rounded-[28px] p-6 border border-[#ececec]">

                <p className="text-[#666] text-sm mb-2">
                  High Severity
                </p>

                <p className="text-5xl font-bold text-black">

                  {highSeverity}

                </p>

                <p className="text-[#666] mt-2 text-sm">
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