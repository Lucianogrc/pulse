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

      // GROUP COUNTRIES
      const groupedCountries = {};

      incidents.forEach((item) => {

        const country = item.Country;

        if (!country) return;

        if (!groupedCountries[country]) {
          groupedCountries[country] = 0;
        }

        // EACH ROW = 1 INCIDENT
        groupedCountries[country] += 1;

      });

      // FORMAT DATA
      const formatted = Object.keys(groupedCountries).map(
        (country) => ({
          country,
          incidents: groupedCountries[country],
        })
      );

      // SORT DESCENDING
      formatted.sort(
        (a, b) => b.incidents - a.incidents
      );

      setData(formatted);

    }

    loadData();

  }, []);

  return (

    <section className="py-24 px-8 bg-white rounded-[32px] border border-[#ecece8]">

      <div className="mb-12">

        <p className="text-[#9ACD32] text-sm font-semibold uppercase tracking-wider">
          Analytics
        </p>

        <h2 className="text-5xl font-bold text-black mt-4">
          Incidents by Country
        </h2>

      </div>

      <div className="h-[500px]">

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
                fontSize: 14,
              }}
            />

            <YAxis
              tick={{
                fill: "#666",
                fontSize: 14,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "20px",
                border: "1px solid #ecece8",
                background: "#fff",
              }}
            />

            <Bar
              dataKey="incidents"
              radius={[16, 16, 0, 0]}
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>

  );

}