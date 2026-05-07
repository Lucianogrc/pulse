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
  "#3fb5d6",
  "#e477b5",
  "#f2a335",
];

export default function CustomPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const incidents = await getIncidents();

      const grouped = {};

      incidents.forEach((item) => {
        if (!grouped[item.category]) {
          grouped[item.category] = 0;
        }

        grouped[item.category] += Number(item.incidents);
      });

      const formatted = Object.keys(grouped).map((key) => ({
        name: key,
        value: grouped[key],
      }));

      setData(formatted);
    }

    loadData();
  }, []);

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <p className="text-lime-500 text-sm font-semibold uppercase tracking-wider">
            Categories
          </p>

          <h2 className="text-5xl font-bold text-black mt-4">
            Discrimination Types
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="bg-[#f7f7f4] border border-[#ecece8] rounded-[32px] p-10 h-[500px]">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="space-y-6">

            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#f7f7f4] border border-[#ecece8] rounded-2xl px-6 py-5"
              >
                <div className="flex items-center gap-4">

                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <p className="text-lg font-medium text-black">
                    {item.name}
                  </p>

                </div>

                <p className="text-2xl font-bold text-black">
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