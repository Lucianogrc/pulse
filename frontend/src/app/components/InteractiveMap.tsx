import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getIncidents } from "../services/api.js";

const countryCoordinates = {
  Mexico: [23.6345, -102.5528],
  Spain: [40.4637, -3.7492],
  Brazil: [-14.235, -51.9253],
  Argentina: [-38.4161, -63.6167],
  England: [52.3555, -1.1743],
  France: [46.2276, 2.2137],
  Germany: [51.1657, 10.4515],
  Italy: [41.8719, 12.5674],
  USA: [37.0902, -95.7129],
  Poland: [51.9194, 19.1451],
  Japan: [36.2048, 138.2529],
  "South Korea": [35.9078, 127.7669],
};

const COLORS = [
  "#D9F154",
  "#DDE59A",
  "#CFCBEA",
  "#E7DCCF",
  "#C6D9F1",
  "#E6C7D9",
];

export default function InteractiveMap() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();

      const grouped = {};

      data.forEach((item) => {
        const country = item.Country;
        const category = item.Category;

        if (!country) return;

        if (!grouped[country]) {
          grouped[country] = {
            country,
            category,
            incidents: 0,
          };
        }

        grouped[country].incidents += 1;
      });

      const formatted = Object.values(grouped)
        .sort((a, b) => b.incidents - a.incidents)
        .map((item, index) => ({
          ...item,
          position:
            countryCoordinates[item.country] || [20, 0],
          color: COLORS[index % COLORS.length],
        }));

      setIncidents(formatted);
    }

    loadData();
  }, []);

  return (
    <section
      id="analytics"
      className="
        py-10 md:py-24
        px-4 sm:px-6 lg:px-20
        max-w-[1400px]
        mx-auto
      "
    >
      <div className="space-y-8 md:space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-3 md:space-y-5">
          <span className="inline-block bg-[#D9F154] text-black px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium">
            Global Monitoring
          </span>

          <h2 className="text-3xl md:text-6xl font-bold leading-tight">
            Global Heat Map
          </h2>

          <p className="text-sm md:text-xl text-[#666] max-w-2xl mx-auto leading-relaxed">
            Interactive visualization of discrimination
            incidents across football communities worldwide.
          </p>
        </div>

        {/* MAP */}
        <div
          className="
            bg-white
            rounded-[24px] md:rounded-[3rem]
            border border-[#ececec]
            shadow-xl
            overflow-hidden
            p-3 md:p-8
          "
        >
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={true}
            className="h-[320px] md:h-[700px] w-full rounded-[18px] md:rounded-[2rem] z-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {incidents.map((incident, index) => (
              <CircleMarker
                key={index}
                center={incident.position}
                radius={
                  window.innerWidth < 768
                    ? Math.min(
                        6 + incident.incidents,
                        16
                      )
                    : Math.min(
                        12 + incident.incidents * 1.5,
                        35
                      )
                }
                pathOptions={{
                  color: incident.color,
                  fillColor: incident.color,
                  fillOpacity: 0.85,
                  weight: window.innerWidth < 768 ? 2 : 4,
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[160px] md:min-w-[220px]">
                    <div
                      className="w-4 h-4 rounded-full mb-3"
                      style={{
                        backgroundColor: incident.color,
                      }}
                    />

                    <h3 className="text-lg md:text-2xl font-bold">
                      {incident.country}
                    </h3>

                    <div className="space-y-2 mt-3">
                      <p className="text-sm md:text-base">
                        <span className="font-semibold">
                          Category:
                        </span>{" "}
                        {incident.category}
                      </p>

                      <p className="text-sm md:text-base">
                        <span className="font-semibold">
                          Reports:
                        </span>{" "}
                        {incident.incidents}
                      </p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* LEGEND */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {[
            ["#D9F154", "Very High Activity"],
            ["#DDE59A", "High Activity"],
            ["#CFCBEA", "Medium Activity"],
          ].map(([color, label], index) => (
            <div
              key={index}
              className="flex items-center gap-2 md:gap-3"
            >
              <div
                className="size-3 md:size-4 rounded-full"
                style={{ backgroundColor: color }}
              />

              <span className="text-xs md:text-sm text-[#666]">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* COUNTRY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {incidents.slice(0, 8).map((country, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl md:rounded-3xl
                p-4 md:p-6
                border border-[#ececec]
                shadow-sm
                hover:shadow-lg
                transition
              "
            >
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full mb-3 md:mb-4"
                style={{
                  backgroundColor: country.color,
                }}
              />

              <h3 className="text-2xl md:text-4xl font-bold">
                {country.incidents}
              </h3>

              <p className="text-[#666] mt-2 text-xs md:text-lg truncate">
                {country.country}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}