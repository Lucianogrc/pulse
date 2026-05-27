import { useEffect, useState } from "react";
import { getIncidents } from "../../services/api.js";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#D9F154",
  "#DDE58B",
  "#CFC9E8",
  "#F2D6C9",
  "#B8E3EA",
  "#E9E4D8",
];

export default function CustomBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const incidents = await getIncidents();

      const groupedCountries = {};

      incidents.forEach((item) => {
        const country = item.Country;

        if (!country) return;

        groupedCountries[country] =
          (groupedCountries[country] || 0) + 1;
      });

      const formatted = Object.keys(groupedCountries)
        .map((country) => ({
          country,
          incidents: groupedCountries[country],
        }))
        .sort((a, b) => b.incidents - a.incidents)
        .slice(0, 6); // SOLO TOP 6 PARA MÓVIL

      setData(formatted);
    }

    loadData();
  }, []);

  return (
    <section
      className="
        py-6 md:py-16
        px-4 md:px-8
        bg-white
        rounded-[24px] md:rounded-[32px]
        border
        border-[#ecece8]
      "
    >
      <div className="mb-6 md:mb-12">
        <p className="text-[#9ACD32] text-xs md:text-sm font-semibold uppercase tracking-wider">
          Analytics
        </p>

        <h2 className="text-2xl md:text-5xl font-bold text-black mt-3 md:mt-4">
          Incidents by Country
        </h2>
      </div>

      <div className="h-[220px] md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ecece8"
            />

            <XAxis
              dataKey="country"
              tick={{
                fill: "#666",
                fontSize: window.innerWidth < 768 ? 9 : 14,
              }}
            />

            <YAxis
              tick={{
                fill: "#666",
                fontSize: window.innerWidth < 768 ? 9 : 14,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #ecece8",
                background: "#fff",
              }}
            />

            <Bar
              dataKey="incidents"
              radius={[12, 12, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}