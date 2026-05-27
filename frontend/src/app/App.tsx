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

import ChordDiagram from "./components/charts/ChordDiagram";
import CustomBarChart from "./components/charts/BarChart";
import CustomPieChart from "./components/charts/PieChart";

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

      {/* MAP */}
      <InteractiveMap />

      {/* DATA VISUALIZATION */}
      <section className="px-4 sm:px-6 lg:px-10 xl:px-20 py-14 md:py-20 lg:py-24">

        {/* HEADER */}
        <div className="mb-10 md:mb-14 max-w-4xl">
          <span
            className="
              inline-block
              bg-[#D9F154]
              text-black
              px-4
              md:px-5
              py-2
              rounded-full
              text-xs
              md:text-sm
              font-medium
            "
          >
            Data Visualization
          </span>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              mt-5
              md:mt-6
              leading-tight
              text-black
            "
          >
            Understanding Football
            <br className="hidden md:block" />
            Through Real Data
          </h2>

          <p
            className="
              text-[#666]
              mt-5
              md:mt-6
              text-base
              md:text-lg
              leading-relaxed
              max-w-2xl
            "
          >
            Pulse transforms statistics into awareness
            by visualizing discrimination, abuse and
            inequality incidents across football
            communities worldwide.
          </p>
        </div>

        {/* FILTERS */}
        <div
          className="
            flex
            flex-wrap
            gap-3
            md:gap-4
            mb-10
            md:mb-14
          "
        >
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
                px-4
                md:px-6
                py-2.5
                md:py-3
                rounded-full
                transition-all
                duration-300
                font-medium
                text-sm
                md:text-base
                whitespace-nowrap

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

        {/* CHARTS */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
            lg:gap-8
          "
        >
          <CustomBarChart
            selectedCategory={selectedCategory}
          />

          <CustomPieChart
            selectedCategory={selectedCategory}
          />
        </div>

        {/* CHORD DIAGRAM */}
        <div className="mt-8 lg:mt-10 overflow-hidden">
          <ChordDiagram />
        </div>

      </section>

      {/* INSIGHTS */}
      <Insights />

      {/* SOURCES */}
      <Sources />

      {/* REPORT */}
      <ReportForm />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}