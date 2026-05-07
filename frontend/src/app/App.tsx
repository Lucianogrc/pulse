// @ts-nocheck

import { useState } from "react";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Awareness from "./components/Awareness";
import Dashboard from "./Dashboard";

import IncidentTimeline from "./components/IncidentTimeline";
import InteractiveMap from "./components/InteractiveMap";
import Insights from "./components/Insights";
import Sources from "./components/Sources";
import ReportForm from "./components/ReportForm";
import Footer from "./components/Footer";

// Charts

import ChordDiagram from "./components/charts/ChordDiagram";
import CustomBarChart from "./components/charts/BarChart";
import CustomPieChart from "./components/charts/PieChart";
import TimelineChart from "./components/charts/TimelineChart";
import MapChart from "./components/charts/MapChart";

export default function App() {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#111111] overflow-x-hidden">

      {/* NAVIGATION */}

      <Navigation />

      {/* HERO */}

      <Hero />

      {/* AWARENESS */}

      <Awareness />

      {/* DASHBOARD */}

      <Dashboard
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* TIMELINE */}

      <IncidentTimeline />

      {/* INTERACTIVE MAP */}

      <InteractiveMap />

      {/* DATA VISUALIZATION */}

      <section className="px-6 lg:px-20 py-24">

        {/* HEADER */}

        <div className="mb-14">

          <span className="bg-[#D9F154] text-black px-5 py-2 rounded-full text-sm font-medium">
            Data Visualization
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mt-6 leading-tight text-black">
            Understanding Football <br />
            Through Real Data
          </h2>

          <p className="text-[#666] mt-6 max-w-2xl text-lg leading-relaxed">
            Pulse transforms statistics into awareness
            by visualizing discrimination, abuse and
            inequality incidents across football
            communities worldwide.
          </p>

        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-4 mb-14">

          {[
            "All",
            "Racism",
            "Homophobia",
            "Violence",
            "Discrimination",
          ].map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-6 py-3 rounded-full transition-all duration-300 font-medium
                ${
                  selectedCategory === category
                    ? "bg-[#D9F154] text-black shadow-md"
                    : "bg-white text-black border border-[#e5e5e5] hover:bg-[#ececec]"
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

        {/* TOP CHARTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <CustomBarChart
            selectedCategory={selectedCategory}
          />

          <CustomPieChart
            selectedCategory={selectedCategory}
          />

        </div>

        

        {/* MAP CHART */}

        <div className="mt-8">

          
<ChordDiagram />
        </div>

      </section>

      {/* INSIGHTS */}

      <Insights />
<Sources />
      {/* REPORT FORM */}

      <ReportForm />

      {/* FOOTER */}

      <Footer />

    </div>
  );
}