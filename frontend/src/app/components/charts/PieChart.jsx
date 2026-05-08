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

        // SKIP EMPTY VALUES
        if (!category) return;

        if (!grouped[category]) {
          grouped[category] = 0;
        }

        // EACH ROW = 1 INCIDENT
        grouped[category] += 1;

      });

      const formatted = Object.keys(grouped).map(
        (key) => ({
          name: key,
          value: grouped[key],
        })
      );

      // SORT DESCENDING
      formatted.sort(
        (a, b) => b.value - a.value
      );

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

          <div
            className="
              bg-[#f7f7f4]
              border border-[#ecece8]
              rounded-[32px]
              p-10
              h-[500px]
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
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  cornerRadius={8}
                >

                  {data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "18px",
                    border: "1px solid #ececec",
                    background: "#fff",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="space-y-6">

            {data.map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between
                  bg-[#f7f7f4]
                  border border-[#ecece8]
                  rounded-[24px]
                  px-8
                  py-6
                "
              >

                <div className="flex items-center gap-5">

                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <p className="text-2xl font-semibold text-black">
                    {item.name}
                  </p>

                </div>

                <p className="text-3xl font-bold text-black">
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