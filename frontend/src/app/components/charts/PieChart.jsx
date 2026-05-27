import { useEffect, useState } from "react";
import { getIncidents } from "../../services/api.js";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#D9F154",
  "#DDE59A",
  "#CFCBEA",
  "#E7DCCF",
  "#C6D9F1",
  "#E6C7D9",
];

export default function CustomPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const incidents = await getIncidents();

      const grouped = {};

      incidents.forEach((item) => {
        const category = item.Category;

        if (!category) return;

        grouped[category] =
          (grouped[category] || 0) + 1;
      });

      const formatted = Object.keys(grouped)
        .map((key) => ({
          name: key,
          value: grouped[key],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // SOLO TOP 5

      setData(formatted);
    }

    loadData();
  }, []);

  return (
    <section className="py-10 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6 md:mb-12">
          <p className="text-lime-500 text-xs md:text-sm font-semibold uppercase tracking-wider">
            Categories
          </p>

          <h2 className="text-2xl md:text-5xl font-bold text-black mt-3 md:mt-4">
            Discrimination Types
          </h2>
        </div>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 items-center">

          {/* PIE */}
          <div
            className="
              bg-[#f7f7f4]
              border
              border-[#ecece8]
              rounded-[24px] md:rounded-[32px]
              p-4 md:p-10
              h-[260px] md:h-[500px]
              flex
              items-center
              justify-center
            "
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={window.innerWidth < 768 ? 35 : 60}
                  outerRadius={window.innerWidth < 768 ? 60 : 90}
                  paddingAngle={4}
                  cornerRadius={8}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #ececec",
                    background: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* LEGEND */}
          <div className="space-y-3 md:space-y-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between
                  bg-[#f7f7f4]
                  border
                  border-[#ecece8]
                  rounded-[20px] md:rounded-[24px]
                  px-4 md:px-8
                  py-4 md:py-6
                "
              >
                <div className="flex items-center gap-3 md:gap-5">
                  <div
                    className="w-4 h-4 md:w-6 md:h-6 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <p className="text-sm md:text-2xl font-semibold text-black">
                    {item.name}
                  </p>
                </div>

                <p className="text-xl md:text-3xl font-bold text-black">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}