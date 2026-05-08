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

      // GROUP BY COUNTRY
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
        .map((item, index) => ({

          ...item,

          position:
            countryCoordinates[item.country] ||
            [20, 0],

          color:
            COLORS[index % COLORS.length],

        }));

      setIncidents(formatted);

    }

    loadData();

  }, []);

  return (

    <section
      id="analytics"
      className="py-32 px-6 max-w-[1400px] mx-auto"
    >

      <div className="space-y-16">

        {/* HEADER */}

        <div className="text-center space-y-5">

          <span className="inline-block bg-[#D9F154] text-black px-6 py-2 rounded-full text-sm font-medium">
            Global Monitoring
          </span>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Global Heat Map
          </h2>

          <p className="text-xl text-[#666] max-w-2xl mx-auto">
            Interactive visualization of discrimination
            incidents across football communities worldwide.
          </p>

        </div>

        {/* MAP */}

        <div className="bg-white rounded-[3rem] border border-[#ececec] shadow-xl overflow-hidden p-8">

          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={true}
            className="h-[700px] w-full rounded-[2rem] z-0"
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
                  Math.min(
                    12 + incident.incidents * 1.5,
                    35
                  )
                }
                pathOptions={{
                  color: incident.color,
                  fillColor: incident.color,
                  fillOpacity: 0.85,
                  weight: 4,
                }}
              >

                <Popup>

                  <div className="p-2 min-w-[220px]">

                    <div
                      className="w-4 h-4 rounded-full mb-4"
                      style={{
                        backgroundColor: incident.color,
                      }}
                    />

                    <h3 className="text-2xl font-bold">
                      {incident.country}
                    </h3>

                    <div className="space-y-2 mt-4">

                      <p>
                        <span className="font-semibold">
                          Category:
                        </span>{" "}
                        {incident.category}
                      </p>

                      <p>
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

        <div className="flex flex-wrap justify-center gap-6">

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#D9F154]" />
            <span className="text-sm text-[#666]">
              Very High Activity
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#DDE59A]" />
            <span className="text-sm text-[#666]">
              High Activity
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#CFCBEA]" />
            <span className="text-sm text-[#666]">
              Medium Activity
            </span>
          </div>

        </div>

        {/* COUNTRY STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {incidents.map((country, index) => (

            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                p-6
                border border-[#ececec]
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <div
                className="w-4 h-4 rounded-full mb-4"
                style={{
                  backgroundColor: country.color,
                }}
              />

              <h3 className="text-4xl font-bold">
                {country.incidents}
              </h3>

              <p className="text-[#666] mt-2 text-lg">
                {country.country}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}