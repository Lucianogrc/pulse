import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
} from "lucide-react";

import { getIncidents } from "../services/api.js";

export default function IncidentTimeline() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();

      const sorted = [...data]
        .reverse()
        .filter(
          (incident) =>
            incident.Match &&
            incident.Match.trim() !== ""
        );

      setIncidents(sorted);
    }

    loadData();
  }, []);

  const cardColors = [
    "bg-[#D9F75A]",
    "bg-[#e9ef9c]",
    "bg-[#d9d6f2]",
  ];

  return (
    <section
      className="
        py-10 md:py-24
        px-4 sm:px-6 lg:px-20
      "
    >
      {/* TITLE */}
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl md:text-6xl font-bold text-black">
          Recent Incidents
        </h2>

        <p className="text-[#666] text-sm md:text-xl mt-3 md:mt-5 max-w-2xl mx-auto">
          A timeline of documented discrimination
          cases across global football
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {incidents.slice(0, 6).map((incident, index) => (
          <div
            key={index}
            className="
              bg-white
              border border-[#ececec]
              rounded-[24px] md:rounded-[36px]
              p-4 md:p-8
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
            "
          >
            {/* TOP */}
            <div
              className={`
                ${cardColors[index % cardColors.length]}
                rounded-[20px] md:rounded-[28px]
                p-4 md:p-7
              `}
            >
              <div className="bg-white/80 rounded-[18px] md:rounded-[24px] p-4 md:p-6">
                <h3 className="text-lg md:text-2xl font-bold text-black line-clamp-2">
                  {incident.Match}
                </h3>

                <div className="flex items-center gap-2 mt-3 md:mt-4 text-[#666]">
                  <MapPin className="size-4 md:size-5" />

                  <span className="text-sm md:text-lg truncate">
                    {incident.Country}
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-5 md:mt-8">
              {/* DATE */}
              <div className="flex items-center gap-2 md:gap-3 text-[#666]">
                <CalendarDays className="size-4 md:size-5" />

                <span className="text-xs md:text-lg">
                  {incident.Date || "Recently reported"}
                </span>
              </div>

              {/* TAGS */}
              <div className="flex gap-2 md:gap-3 mt-4 md:mt-6 flex-wrap">
                <span
                  className="
                    bg-[#f3efe4]
                    text-black
                    px-3 md:px-5
                    py-2
                    rounded-full
                    text-xs md:text-sm
                    font-medium
                  "
                >
                  {incident.Category}
                </span>

                <span
                  className={`
                    px-3 md:px-5
                    py-2
                    rounded-full
                    text-xs md:text-sm
                    font-medium

                    ${
                      incident.Severity === "High"
                        ? "bg-[#ffe5e5] text-red-500"
                        : incident.Severity === "Medium"
                        ? "bg-[#fff7d6] text-[#b59b00]"
                        : "bg-[#e7ffe7] text-green-600"
                    }
                  `}
                >
                  {incident.Severity}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p
                className="
                  text-[#666]
                  text-sm md:text-lg
                  leading-relaxed
                  mt-4 md:mt-6
                  line-clamp-3
                "
              >
                {incident.Description ||
                  "New discrimination incident reported through Pulse."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}