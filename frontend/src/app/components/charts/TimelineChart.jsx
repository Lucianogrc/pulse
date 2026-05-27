import { useEffect, useState } from "react";
import { getIncidents } from "../../services/api.js";

export default function TimelineChart() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();

      const grouped = {};

      data.forEach((item) => {
        const match = item.Match;
        const country = item.Country;
        const category = item.Category;
        const severity = item.Severity;

        if (!match || !country || !category) return;

        const key = `${match}-${category}`;

        if (!grouped[key]) {
          grouped[key] = {
            match,
            country,
            category,
            severity,
            total: 0,
          };
        }

        grouped[key].total += 1;
      });

      const formatted = Object.values(grouped);

      formatted.sort((a, b) => b.total - a.total);

      setIncidents(formatted.slice(0, 6));
    }

    loadData();
  }, []);

  const CARD_COLORS = [
    "#D9F154",
    "#DDE59A",
    "#CFCBEA",
    "#E7DCCF",
    "#C6D9F1",
    "#E6C7D9",
  ];

  return (
    <section className="px-4 md:px-8 py-10 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6 md:mb-12">
          <p className="text-lime-500 text-xs md:text-sm font-semibold uppercase tracking-wider">
            Incident Timeline
          </p>

          <h2 className="text-2xl md:text-5xl font-bold text-black mt-3 md:mt-4">
            Latest Reports
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {incidents.map((item, index) => (
            <div
              key={index}
              className="
                bg-[#f7f7f4]
                border
                border-[#ecece8]
                rounded-[24px] md:rounded-[36px]
                p-4 md:p-8
                hover:shadow-xl
                transition-all
              "
            >
              {/* TOP */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="
                    w-14 h-14
                    md:w-24 md:h-24
                    rounded-[18px] md:rounded-[28px]
                    flex
                    items-center
                    justify-center
                    text-black
                    font-bold
                    text-xl md:text-3xl
                    shrink-0
                  "
                  style={{
                    backgroundColor:
                      CARD_COLORS[index % CARD_COLORS.length],
                  }}
                >
                  {item.total}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg md:text-2xl font-bold text-black truncate">
                    {item.match}
                  </h3>

                  <p className="text-gray-500 mt-1 text-sm md:text-lg">
                    {item.country}
                  </p>
                </div>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
                <span
                  className="
                    bg-[#ece9df]
                    text-black
                    px-3 md:px-4
                    py-2
                    rounded-full
                    text-xs md:text-sm
                    font-medium
                  "
                >
                  {item.category}
                </span>

                <span
                  className={`
                    px-3 md:px-4
                    py-2
                    rounded-full
                    text-xs md:text-sm
                    font-medium
                    ${
                      item.severity === "High"
                        ? "bg-[#f4dede] text-[#d84d4d]"
                        : item.severity === "Medium"
                        ? "bg-[#fff4d8] text-[#c58a00]"
                        : "bg-[#e8f8e8] text-[#2f8f2f]"
                    }
                  `}
                >
                  {item.severity}
                </span>
              </div>

              {/* BOTTOM */}
              <div className="flex justify-between items-end">
                <p className="text-gray-500 text-sm md:text-base">
                  Reports
                </p>

                <p className="text-3xl md:text-5xl font-bold text-black">
                  {item.total}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}