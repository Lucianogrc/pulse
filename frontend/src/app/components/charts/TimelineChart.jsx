import { useEffect, useState } from "react";
import { getIncidents } from "../../services/api.js";

export default function TimelineChart() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getIncidents();
      setIncidents(data);
    }

    loadData();
  }, []);

  return (
    <section className="px-8 py-24 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <p className="text-lime-500 text-sm font-semibold uppercase tracking-wider">
            Incident Timeline
          </p>

          <h2 className="text-5xl font-bold text-black mt-4">
            Latest Reports
          </h2>
        </div>

        <div className="space-y-6">
          {incidents.map((item) => (
            <div
              key={item.id}
              className="bg-[#f5f5f3] border border-[#e8e8e5] rounded-3xl p-6 flex justify-between items-center hover:shadow-xl transition-all"
            >
              <div>
                <h3 className="text-2xl font-semibold text-black">
                  {item.category}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.city}, {item.country}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-lime-500">
                  {item.incidents}
                </p>

                <p className="text-sm text-gray-500">
                  Severity: {item.severity}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}