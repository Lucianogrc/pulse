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
    <section
      id="home"
      className="
        pt-24
        md:pt-36
        lg:pt-40
        pb-12
        md:pb-24
        px-4
        sm:px-6
        lg:px-16
        xl:px-20
      "
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-14 items-center">

        {/* LEFT SIDE */}
        <div className="order-1">
          <div className="inline-flex items-center bg-[#eef5c8] px-4 py-2 rounded-full mb-5 md:mb-8">
            <span className="text-xs md:text-sm font-medium text-black">
              Data-Driven Awareness
            </span>
          </div>

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-[5.2rem]
              leading-[0.95]
              font-bold
              tracking-tight
              text-black
            "
          >
            Visualizing

            <span className="block text-[#D9F75A] mt-2 md:mt-4">
              Discrimination
            </span>

            <span className="block mt-2 md:mt-4">
              in Football
            </span>
          </h1>

          <p
            className="
              text-[#666]
              text-base
              sm:text-lg
              md:text-xl
              leading-relaxed
              mt-6
              md:mt-10
              max-w-xl
            "
          >
            Pulse transforms data into awareness.
            We track, analyze, and visualize
            discrimination incidents across global
            football to drive meaningful change.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
            <button
              className="
                bg-black
                text-white
                px-6 md:px-8
                py-4
                rounded-full
                flex
                items-center
                justify-center
                gap-3
                hover:scale-105
                transition-all
              "
            >
              Explore Data
              <ArrowRight className="size-5" />
            </button>

            <button
              className="
                bg-white
                border
                border-[#e5e5e5]
                px-6 md:px-8
                py-4
                rounded-full
                hover:bg-[#f5f5f5]
                transition-all
              "
            >
              View Reports
            </button>
          </div>

          {/* SMALL MOBILE STATS */}
          <div className="grid grid-cols-2 gap-4 mt-8 md:mt-14">
            <div
              className="
                bg-white
                border
                border-[#ececec]
                rounded-3xl
                p-5
                flex
                items-center
                gap-3
                shadow-sm
              "
            >
              <div className="size-12 rounded-full bg-[#eef5c8] flex items-center justify-center">
                <TrendingUp className="size-5 text-[#b7d63f]" />
              </div>

              <div>
                <p className="text-2xl md:text-4xl font-bold text-black">
                  {totalIncidents}
                </p>

                <p className="text-xs md:text-sm text-[#666]">
                  Incidents
                </p>
              </div>
            </div>

            <div
              className="
                bg-white
                border
                border-[#ececec]
                rounded-3xl
                p-5
                flex
                items-center
                gap-3
                shadow-sm
              "
            >
              <div className="size-12 rounded-full bg-[#f7f2e8] flex items-center justify-center">
                <AlertTriangle className="size-5 text-[#c6a56b]" />
              </div>

              <div>
                <p className="text-2xl md:text-4xl font-bold text-black">
                  {totalCountries}
                </p>

                <p className="text-xs md:text-sm text-[#666]">
                  Countries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="order-2">
          <div className="bg-white rounded-[28px] md:rounded-[40px] p-4 md:p-6 shadow-xl border border-[#ececec]">

            <div
              className="
                absolute
                hidden
                md:block
                top-6
                right-8
                bg-white
                rounded-3xl
                px-6
                py-4
                shadow-lg
                border
                border-[#ececec]
                z-10
              "
            >
              <p className="text-sm text-[#666]">
                Live Updates
              </p>

              <p className="font-bold text-lg text-black">
                Real-time tracking
              </p>
            </div>

            <div
              className="
                rounded-[24px]
                overflow-hidden
                h-[220px]
                sm:h-[300px]
                md:h-[420px]
                lg:h-[500px]
              "
            >
              <img
                src="/fut.avif"
                alt="Football awareness"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}