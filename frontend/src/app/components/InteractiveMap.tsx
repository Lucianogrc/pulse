import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const incidents = [
  {
    id: 1,
    region: 'Western Europe',
    country: 'England',
    city: 'London',
    position: [51.5072, -0.1276],
    incidents: 1247,
    category: 'Racism',
    color: '#D9F75A',
  },
  {
    id: 2,
    region: 'Southern Europe',
    country: 'Spain',
    city: 'Madrid',
    position: [40.4168, -3.7038],
    incidents: 892,
    category: 'Homophobia',
    color: '#C9D94A',
  },
  {
    id: 3,
    region: 'Eastern Europe',
    country: 'Poland',
    city: 'Warsaw',
    position: [52.2297, 21.0122],
    incidents: 456,
    category: 'Xenophobia',
    color: '#C8C7F7',
  },
  {
    id: 4,
    region: 'South America',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    position: [-22.9068, -43.1729],
    incidents: 234,
    category: 'Sexism',
    color: '#D6C5B4',
  },
  {
    id: 5,
    region: 'North America',
    country: 'USA',
    city: 'New York',
    position: [40.7128, -74.0060],
    incidents: 123,
    category: 'Racism',
    color: '#B7C0D8',
  },
];

export default function InteractiveMap() {
  return (
    <section
      id="analytics"
      className="py-32 px-6 max-w-[1400px] mx-auto"
    >
      <div className="space-y-16">

        {/* Header */}
        <div className="text-center space-y-5">

          <span className="inline-block bg-[#D9F75A] text-black px-6 py-2 rounded-full text-sm font-medium">
            Global Monitoring
          </span>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Global Heat Map
          </h2>

          <p className="text-xl text-[#666] max-w-2xl mx-auto">
            Interactive visualization of discrimination incidents
            across football communities worldwide.
          </p>

        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">

          <button className="px-6 py-3 bg-black text-white rounded-full transition hover:scale-105">
            All Categories
          </button>

          <button className="px-6 py-3 bg-white border border-[#e5e5e5] rounded-full hover:bg-[#f5f5f5] transition">
            Racism
          </button>

          <button className="px-6 py-3 bg-white border border-[#e5e5e5] rounded-full hover:bg-[#f5f5f5] transition">
            Homophobia
          </button>

          <button className="px-6 py-3 bg-white border border-[#e5e5e5] rounded-full hover:bg-[#f5f5f5] transition">
            Sexism
          </button>

          <button className="px-6 py-3 bg-white border border-[#e5e5e5] rounded-full hover:bg-[#f5f5f5] transition">
            Xenophobia
          </button>

        </div>

        {/* MAP */}
        <div className="bg-white rounded-[3rem] border border-[#ececec] shadow-xl overflow-hidden p-8">

          <MapContainer
            center={[30, 10]}
            zoom={2}
            scrollWheelZoom={true}
            className="h-[700px] w-full rounded-[2rem] z-0"
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {incidents.map((incident) => (
              <CircleMarker
                key={incident.id}
                center={incident.position}
                radius={16}
                pathOptions={{
                  color: incident.color,
                  fillColor: incident.color,
                  fillOpacity: 0.9,
                  weight: 5,
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

                    <h3 className="text-xl font-bold">
                      {incident.city}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {incident.country}
                    </p>

                    <div className="space-y-2">

                      <p>
                        <span className="font-semibold">
                          Category:
                        </span>{' '}
                        {incident.category}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Reported Incidents:
                        </span>{' '}
                        {incident.incidents}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Region:
                        </span>{' '}
                        {incident.region}
                      </p>

                    </div>

                  </div>

                </Popup>

              </CircleMarker>
            ))}

          </MapContainer>

        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6">

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#D9F75A]" />
            <span className="text-sm text-[#666]">
              1000+ incidents
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#C9D94A]" />
            <span className="text-sm text-[#666]">
              500-999 incidents
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#C8C7F7]" />
            <span className="text-sm text-[#666]">
              100-499 incidents
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#D6C5B4]" />
            <span className="text-sm text-[#666]">
              50-99 incidents
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 rounded-full bg-[#B7C0D8]" />
            <span className="text-sm text-[#666]">
              &lt;50 incidents
            </span>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          {incidents.map((region) => (
            <div
              key={region.id}
              className="bg-white rounded-3xl p-6 border border-[#ececec] shadow-sm hover:shadow-lg transition"
            >

              <div
                className="w-4 h-4 rounded-full mb-4"
                style={{
                  backgroundColor: region.color,
                }}
              />

              <h3 className="text-3xl font-bold">
                {region.incidents}
              </h3>

              <p className="text-[#666] mt-2">
                {region.region}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}