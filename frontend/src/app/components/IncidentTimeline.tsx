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

      // MOST RECENT FIRST + ONLY INCIDENTS WITH MATCH
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

  // CARD COLORS

  const cardColors = [
    "bg-[#D9F75A]",
    "bg-[#e9ef9c]",
    "bg-[#d9d6f2]",
  ];

  return (

    <section className="py-24 px-6 lg:px-20">

      {/* TITLE */}

      <div className="text-center mb-16">

        <h2 className="text-6xl font-bold text-black">
          Recent Incidents
        </h2>

        <p className="text-[#666] text-xl mt-5">
          A timeline of documented discrimination
          cases across global football
        </p>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {incidents.slice(0, 6).map((incident, index) => (

          <div
            key={index}
            className="
              bg-white
              border border-[#ececec]
              rounded-[36px]
              p-8
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
            "
          >

            {/* TOP AREA */}

            <div
              className={`
                ${cardColors[index % cardColors.length]}
                rounded-[28px]
                p-7
              `}
            >

              <div className="bg-white/80 rounded-[24px] p-6">

                <h3 className="text-2xl font-bold text-black">
                  {incident.Match}
                </h3>

                <div className="flex items-center gap-2 mt-4 text-[#666]">

                  <MapPin className="size-5" />

                  <span className="text-lg">
                    {incident.Country}
                  </span>

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div className="mt-8">

              {/* DATE */}

              <div className="flex items-center gap-3 text-[#666]">

                <CalendarDays className="size-5" />

                <span className="text-lg">
                  {incident.Date || "Recently reported"}
                </span>

              </div>

              {/* TAGS */}

              <div className="flex gap-3 mt-6 flex-wrap">

                <span className="
                  bg-[#f3efe4]
                  text-black
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-medium
                ">
                  {incident.Category}
                </span>

                <span className={`
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-medium

                  ${
                    incident.Severity === "High"
                      ? "bg-[#ffe5e5] text-red-500"
                      : incident.Severity === "Medium"
                      ? "bg-[#fff7d6] text-[#b59b00]"
                      : "bg-[#e7ffe7] text-green-600"
                  }
                `}>
                  {incident.Severity}
                </span>

              </div>

              <p className="text-[#666] text-lg leading-relaxed mt-6">
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