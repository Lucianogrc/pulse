import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  TrendingUp,
  Globe,
  Calendar,
  AlertTriangle,
} from "lucide-react";

import { getIncidents } from "./services/api";

const monthlyData = [
  { month: "Jan", incidents: 45 },
  { month: "Feb", incidents: 52 },
  { month: "Mar", incidents: 48 },
  { month: "Apr", incidents: 67 },
  { month: "May", incidents: 73 },
  { month: "Jun", incidents: 89 },
  { month: "Jul", incidents: 95 },
  { month: "Aug", incidents: 112 },
  { month: "Sep", incidents: 98 },
  { month: "Oct", incidents: 87 },
  { month: "Nov", incidents: 76 },
  { month: "Dec", incidents: 64 },
];

const categoryData = [
  { category: "Racism", value: 412 },
  { category: "Homophobia", value: 287 },
  { category: "Sexism", value: 231 },
  { category: "Xenophobia", value: 189 },
];

const BAR_COLORS = [
  "#D9F154",
  "#3fb5d6",
  "#e477b5",
  "#f2a335",
  "#8b5cf6",
];

export default function Dashboard() {

  const [incidents, setIncidents] = useState([]);
  const [topCountries, setTopCountries] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      const data = await getIncidents();

      setIncidents(data);

      // GROUP COUNTRIES
      const groupedCountries = {};

      data.forEach((item) => {

        const country = item.country;

        if (!groupedCountries[country]) {
          groupedCountries[country] = 0;
        }

        groupedCountries[country] += Number(
          item.incidents || 1
        );

      });

      // FORMAT
      const formattedCountries = Object.keys(
        groupedCountries
      ).map((country) => ({
        country,
        incidents: groupedCountries[country],
      }));

      // SORT
      formattedCountries.sort(
        (a, b) => b.incidents - a.incidents
      );

      // TOP COUNTRIES
      setTopCountries(formattedCountries);

    }

    loadData();

  }, []);

  const totalIncidents = incidents.reduce(
    (acc, item) =>
      acc + parseInt(item.incidents || 0),
    0
  );

  const countries = new Set(
    incidents.map((item) => item.country)
  ).size;

  return (

    <section
      id="dashboard"
      className="py-32 px-6 max-w-[1400px] mx-auto"
    >

      <div className="space-y-16">

        {/* HEADER */}

        <div className="text-center space-y-4">

          <h2 className="text-5xl font-bold text-black">
            Data Dashboard
          </h2>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Real-time analytics and discrimination
            insights across global football communities.
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* TOTAL */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center gap-3 mb-4">

              <div className="size-11 rounded-full bg-[#d9ff57]/20 flex items-center justify-center">
                <TrendingUp className="size-5 text-black" />
              </div>

              <p className="text-sm text-gray-500">
                Total Incidents
              </p>

            </div>

            <p className="text-4xl font-bold text-black">
              {totalIncidents}
            </p>

            <p className="text-sm text-[#9cc300] mt-2">
              Updated live from backend
            </p>

          </div>

          {/* COUNTRIES */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center gap-3 mb-4">

              <div className="size-11 rounded-full bg-[#f3f5d7] flex items-center justify-center">
                <Globe className="size-5 text-black" />
              </div>

              <p className="text-sm text-gray-500">
                Countries
              </p>

            </div>

            <p className="text-4xl font-bold text-black">
              {countries}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Active monitoring
            </p>

          </div>

          {/* THIS MONTH */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center gap-3 mb-4">

              <div className="size-11 rounded-full bg-[#ece9ff] flex items-center justify-center">
                <Calendar className="size-5 text-black" />
              </div>

              <p className="text-sm text-gray-500">
                This Month
              </p>

            </div>

            <p className="text-4xl font-bold text-black">
              127
            </p>

            <p className="text-sm text-red-500 mt-2">
              +23% vs last month
            </p>

          </div>

          {/* SEVERITY */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center gap-3 mb-4">

              <div className="size-11 rounded-full bg-[#fff2e2] flex items-center justify-center">
                <AlertTriangle className="size-5 text-black" />
              </div>

              <p className="text-sm text-gray-500">
                Severity
              </p>

            </div>

            <p className="text-4xl font-bold text-black">
              High
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Action required
            </p>

          </div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* MONTHLY TREND */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm">

            <div className="mb-8">

              <h3 className="text-2xl font-semibold text-black mb-2">
                Monthly Trend
              </h3>

              <p className="text-sm text-gray-500">
                Incident reports over the past year
              </p>

            </div>

            <ResponsiveContainer width="100%" height={320}>

              <AreaChart data={monthlyData}>

                <defs>

                  <linearGradient
                    id="colorIncidents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#d9ff57"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="95%"
                      stopColor="#d9ff57"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f1f1"
                />

                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="#d9ff57"
                  strokeWidth={3}
                  fill="url(#colorIncidents)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          {/* TOP COUNTRIES */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm">

            <div className="mb-8">

              <h3 className="text-2xl font-semibold text-black mb-2">
                Top Countries
              </h3>

              <p className="text-sm text-gray-500">
                Most reported incidents
              </p>

            </div>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={topCountries}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f1f1"
                />

                <XAxis
                  dataKey="country"
                  stroke="#888"
                />

                <YAxis stroke="#888" />

                <Tooltip />

                <Bar
                  dataKey="incidents"
                  radius={[12, 12, 0, 0]}
                >

                  {topCountries.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        BAR_COLORS[
                          index % BAR_COLORS.length
                        ]
                      }
                    />

                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* CATEGORY */}

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm lg:col-span-2">

            <div className="mb-8">

              <h3 className="text-2xl font-semibold text-black mb-2">
                Incident Categories
              </h3>

              <p className="text-sm text-gray-500">
                Distribution by discrimination type
              </p>

            </div>

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={categoryData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f1f1"
                />

                <XAxis
                  dataKey="category"
                  stroke="#888"
                />

                <YAxis stroke="#888" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#d9ff57"
                  strokeWidth={4}
                  dot={{
                    r: 6,
                    fill: "#d9ff57",
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </section>
  );
}