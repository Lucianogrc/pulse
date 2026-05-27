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
  const [highSeverityCount, setHighSeverityCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();

      setIncidents(data);

      const groupedCountries = {};

      data.forEach((item) => {
        const country = item.Country;
        if (!country) return;

        groupedCountries[country] =
          (groupedCountries[country] || 0) + 1;
      });

      const formattedCountries = Object.keys(groupedCountries)
        .map((country) => ({
          country,
          incidents: groupedCountries[country],
        }))
        .sort((a, b) => b.incidents - a.incidents);

      setTopCountries(formattedCountries.slice(0, 5));

      const groupedCategories = {};

      data.forEach((item) => {
        const category = item.Category;
        if (!category) return;

        groupedCategories[category] =
          (groupedCategories[category] || 0) + 1;
      });

      setCategoryData(
        Object.keys(groupedCategories).map((category) => ({
          category,
          value: groupedCategories[category],
        }))
      );

      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec",
      ];

      const monthlyCounts = {};

      months.forEach((month) => {
        monthlyCounts[month] = 0;
      });

      data.forEach((item) => {
        if (!item.Date) return;

        const date = new Date(item.Date);

        if (isNaN(date)) return;

        const month = months[date.getMonth()];

        monthlyCounts[month]++;
      });

      setMonthlyData(
        months.map((month) => ({
          month,
          incidents: monthlyCounts[month],
        }))
      );

      setHighSeverityCount(
        data.filter((item) => item.Severity === "High").length
      );
    }

    loadData();
  }, []);

  const totalIncidents = incidents.length;

  const countries = new Set(
    incidents.map((item) => item.Country).filter(Boolean)
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
      className="
        py-10 md:py-20
        px-4 sm:px-6 lg:px-12 xl:px-20
      "
    >
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Data Dashboard
          </h2>

          <p className="text-gray-500 text-sm md:text-lg mt-3 max-w-2xl mx-auto">
            Real-time analytics and discrimination insights
            across global football communities.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {[
            {
              icon: TrendingUp,
              title: "Total Incidents",
              value: totalIncidents,
              color: "bg-[#d9ff57]/20",
              subtitle: "Updated live",
            },
            {
              icon: Globe,
              title: "Countries",
              value: countries,
              color: "bg-[#f3f5d7]",
              subtitle: "Active monitoring",
            },
            {
              icon: Calendar,
              title: "This Month",
              value: thisMonth,
              color: "bg-[#ece9ff]",
              subtitle: "Current month reports",
            },
            {
              icon: AlertTriangle,
              title: "High Severity",
              value: highSeverityCount,
              color: "bg-[#fff2e2]",
              subtitle: "Action required",
            },
          ].map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  p-4 md:p-6
                  border border-[#ececec]
                  shadow-sm
                "
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`
                      size-10 rounded-full
                      ${card.color}
                      flex items-center justify-center
                    `}
                  >
                    <Icon className="size-4 text-black" />
                  </div>

                  <p className="text-xs md:text-sm text-gray-500">
                    {card.title}
                  </p>
                </div>

                <p className="text-2xl md:text-4xl font-bold text-black">
                  {card.value}
                </p>

                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">

          {/* MONTHLY */}
          <div className="bg-white rounded-3xl p-4 md:p-8 border border-[#ececec] shadow-sm">
            <h3 className="text-lg md:text-2xl font-semibold text-black">
              Monthly Trend
            </h3>

            <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-8">
              Incident reports
            </p>

            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncidents">
                    <stop offset="5%" stopColor="#d9ff57" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#d9ff57" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis tick={{ fontSize: 8 }} dataKey="month" />
                <YAxis tick={{ fontSize: 8 }} />
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
          <div className="bg-white rounded-3xl p-4 md:p-8 border border-[#ececec] shadow-sm">
            <h3 className="text-lg md:text-2xl font-semibold text-black">
              Top Countries
            </h3>

            <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-8">
              Most incidents
            </p>

            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={topCountries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis tick={{ fontSize: 8 }} dataKey="country" />
                <YAxis tick={{ fontSize: 8 }} />
                <Tooltip />

                <Bar dataKey="incidents" radius={[10, 10, 0, 0]}>
                  {topCountries.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CATEGORY */}
          <div className="col-span-2 bg-white rounded-3xl p-4 md:p-8 border border-[#ececec] shadow-sm">
            <h3 className="text-lg md:text-2xl font-semibold text-black">
              Incident Categories
            </h3>

            <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-8">
              Distribution by type
            </p>

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis tick={{ fontSize: 9 }} dataKey="category" />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#d9ff57"
                  strokeWidth={4}
                  dot={{ r: 4, fill: "#d9ff57" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </section>
  );
}