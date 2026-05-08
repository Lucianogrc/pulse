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

const BAR_COLORS = [
  "#D9F154",
  "#B8E3EA",
  "#CFC9E8",
  "#F2D6C9",
  "#B8E3EA",
];

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [highSeverityCount, setHighSeverityCount] =
    useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();

      setIncidents(data);

      // TOP COUNTRIES
      const groupedCountries = {};

      data.forEach((item) => {
        const country = item.Country;

        if (!country) return;

        if (!groupedCountries[country]) {
          groupedCountries[country] = 0;
        }

        groupedCountries[country] += 1;
      });

      const formattedCountries = Object.keys(
        groupedCountries
      ).map((country) => ({
        country,
        incidents: groupedCountries[country],
      }));

      formattedCountries.sort(
        (a, b) => b.incidents - a.incidents
      );

      setTopCountries(formattedCountries.slice(0, 5));

      // CATEGORY DATA
      const groupedCategories = {};

      data.forEach((item) => {
        const category = item.Category;

        if (!category) return;

        if (!groupedCategories[category]) {
          groupedCategories[category] = 0;
        }

        groupedCategories[category] += 1;
      });

      const formattedCategories = Object.keys(
        groupedCategories
      ).map((category) => ({
        category,
        value: groupedCategories[category],
      }));

      setCategoryData(formattedCategories);

      // MONTHLY DATA
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyCounts = {};
      months.forEach((month) => {
        monthlyCounts[month] = 0;
      });

      data.forEach((item) => {
        if (!item.Date) return;

        const date = new Date(item.Date);

        if (isNaN(date)) return;

        const month =
          months[date.getMonth()];

        monthlyCounts[month] += 1;
      });

      const formattedMonthly = months.map(
        (month) => ({
          month,
          incidents: monthlyCounts[month],
        })
      );

      setMonthlyData(formattedMonthly);

      // HIGH SEVERITY
      const highCount = data.filter(
        (item) => item.Severity === "High"
      ).length;

      setHighSeverityCount(highCount);
    }

    loadData();
  }, []);

  const totalIncidents = incidents.length;

  const countries = new Set(
    incidents
      .map((item) => item.Country)
      .filter(Boolean)
  ).size;

  const thisMonth = incidents.filter((item) => {
    if (!item.Date) return false;

    const date = new Date(item.Date);
    const now = new Date();

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <section
      id="dashboard"
      className="py-32 px-6 max-w-[1400px] mx-auto"
    >
      <div className="space-y-16">

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
              Updated live
            </p>
          </div>

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
              {thisMonth}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Current month reports
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-11 rounded-full bg-[#fff2e2] flex items-center justify-center">
                <AlertTriangle className="size-5 text-black" />
              </div>

              <p className="text-sm text-gray-500">
                High Severity
              </p>
            </div>

            <p className="text-4xl font-bold text-black">
              {highSeverityCount}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Action required
            </p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* MONTHLY */}
          <div className="bg-white rounded-[2rem] p-8 border border-[#ececec] shadow-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-black mb-2">
                Monthly Trend
              </h3>

              <p className="text-sm text-gray-500">
                Incident reports over the year
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

                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="month" />
                <YAxis />
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

          {/* COUNTRIES */}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="incidents" radius={[12, 12, 0, 0]}>
                  {topCountries.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        BAR_COLORS[index % BAR_COLORS.length]
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
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="category" />
                <YAxis />
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