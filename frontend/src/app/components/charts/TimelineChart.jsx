import { useEffect, useState } from "react";
import { getIncidents } from "../../services/api.js";

export default function TimelineChart() {

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {

    async function loadData() {

      const data = await getIncidents();

      // GROUP SAME MATCHES
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

      // CONVERT TO ARRAY
      const formatted = Object.values(grouped);

      // SORT DESCENDING
      formatted.sort(
        (a, b) => b.total - a.total
      );

      // ONLY LAST 6
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

    <section className="px-8 py-24 bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="mb-12">

          <p className="text-lime-500 text-sm font-semibold uppercase tracking-wider">
            Incident Timeline
          </p>

          <h2 className="text-5xl font-bold text-black mt-4">
            Latest Reports
          </h2>

        </div>

        <div className="space-y-8">

          {incidents.map((item, index) => (

            <div
              key={index}
              className="
                bg-[#f7f7f4]
                border border-[#ecece8]
                rounded-[36px]
                p-8
                flex
                justify-between
                items-center
                hover:shadow-xl
                transition-all
              "
            >

              <div className="flex items-center gap-8">

                <div
                  className="
                    w-24
                    h-24
                    rounded-[28px]
                    flex
                    items-center
                    justify-center
                    text-black
                    font-bold
                    text-3xl
                  "
                  style={{
                    backgroundColor:
                      CARD_COLORS[
                        index % CARD_COLORS.length
                      ],
                  }}
                >
                  {item.total}
                </div>

                <div>

                  <h3 className="text-3xl font-bold text-black">
                    {item.match}
                  </h3>

                  <p className="text-gray-500 mt-2 text-lg">
                    {item.country}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <span
                      className="
                        bg-[#ece9df]
                        text-black
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                      "
                    >
                      {item.category}
                    </span>

                    <span
                      className="
                        bg-[#f4dede]
                        text-[#d84d4d]
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                      "
                    >
                      {item.severity}
                    </span>

                  </div>

                </div>

              </div>

              <div className="text-right">

                <p className="text-5xl font-bold text-black">
                  {item.total}
                </p>

                <p className="text-gray-500 mt-2">
                  Reports
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}