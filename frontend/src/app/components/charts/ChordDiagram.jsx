import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getIncidents } from "../../services/api.js";

export default function ChordDiagram() {

  const ref = useRef();

  useEffect(() => {

    async function loadChart() {

      const data = await getIncidents();

      d3.select(ref.current).selectAll("*").remove();

      // BUILD CONNECTIONS

      const links = [];

      data.forEach((item) => {

        links.push({
          source: item.country,
          target: item.category,
          value: Number(item.incidents || 1),
        });

      });

      const names = Array.from(
        new Set(
          links.flatMap((d) => [d.source, d.target])
        )
      );

      const index = new Map(
        names.map((name, i) => [name, i])
      );

      const matrix = Array.from(
        { length: names.length },
        () => new Array(names.length).fill(0)
      );

      links.forEach(({ source, target, value }) => {

        matrix[index.get(source)][index.get(target)] += value;

      });

      // SIZE

      const width = 850;
      const height = 850;

      const outerRadius =
        Math.min(width, height) * 0.5 - 60;

      const innerRadius = outerRadius - 30;

      // CHORD

      const chord = d3
        .chordDirected()
        .padAngle(0.03)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

      const chords = chord(matrix);

      // COLORS

      const colors = [
        "#D9F154",
        "#3fb5d6",
        "#e477b5",
        "#f2a335",
        "#9b87f5",
        "#56c596",
      ];

      const color = d3.scaleOrdinal()
        .domain(names)
        .range(colors);

      // SVG

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .style("width", "100%")
        .style("height", "100%");

      // ARCS

      const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      // RIBBONS

      const ribbon = d3.ribbonArrow()
        .radius(innerRadius)
        .padAngle(0.01);

      // GROUPS

      const group = svg
        .append("g")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

      group
        .append("path")
        .attr("fill", (d) => color(names[d.index]))
        .attr("stroke", "#ffffff")
        .attr("d", arc);

      // LABELS

      group
        .append("text")
        .each((d) => {
          d.angle =
            (d.startAngle + d.endAngle) / 2;
        })
        .attr("dy", "0.35em")
        .attr(
          "transform",
          (d) => `
            rotate(${(d.angle * 180) / Math.PI - 90})
            translate(${outerRadius + 18})
            ${d.angle > Math.PI ? "rotate(180)" : ""}
          `
        )
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("fill", "#111")
        .attr(
          "text-anchor",
          (d) => (d.angle > Math.PI ? "end" : "start")
        )
        .text((d) => names[d.index]);

      // RIBBONS

      svg
        .append("g")
        .attr("fill-opacity", 0.75)
        .selectAll("path")
        .data(chords)
        .join("path")
        .attr("d", ribbon)
        .attr("fill", (d) =>
          color(names[d.target.index])
        )
        .style("mix-blend-mode", "multiply")
        .append("title")
        .text(
          (d) =>
            `${names[d.source.index]} → ${names[d.target.index]}`
        );

    }

    loadChart();

  }, []);

  return (

    <section className="py-24 px-6 lg:px-20">

      <div className="mb-14">

        <span className="bg-[#D9F75A] text-black px-5 py-2 rounded-full text-sm font-medium">
          D3.js Visualization
        </span>

        <h2 className="text-6xl font-bold mt-6">
          Global Incident Connections
        </h2>

        <p className="text-[#666] mt-6 text-xl max-w-3xl">
          Visualizing relationships between countries,
          discrimination categories and reported incidents.
        </p>

      </div>

      <div
        className="
          bg-white
          border border-[#ecece8]
          rounded-[40px]
          p-10
          flex
          justify-center
          items-center
          overflow-hidden
        "
      >

        <div
          ref={ref}
          className="
            w-full
            flex
            justify-center
            items-center
          "
        />

      </div>

    </section>

  );

}