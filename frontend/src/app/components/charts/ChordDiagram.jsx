import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getIncidents } from "../../services/api.js";

export default function ChordDiagram() {
  const ref = useRef();

  useEffect(() => {
    async function loadChart() {
      const data = await getIncidents();

      d3.select(ref.current).selectAll("*").remove();

      const isMobile = window.innerWidth < 768;

      const links = [];

      data.forEach((item) => {
        const country = item.Country;
        const category = item.Category;

        if (!country || !category) return;

        links.push({
          source: country,
          target: category,
          value: 1,
        });
      });

      // LIMIT DATA FOR MOBILE
      const limitedLinks = isMobile
        ? links.slice(0, 12)
        : links.slice(0, 40);

      const names = Array.from(
        new Set(
          limitedLinks.flatMap((d) => [
            d.source,
            d.target,
          ])
        )
      );

      const index = new Map(
        names.map((name, i) => [name, i])
      );

      const matrix = Array.from(
        { length: names.length },
        () => new Array(names.length).fill(0)
      );

      limitedLinks.forEach(
        ({ source, target, value }) => {
          matrix[index.get(source)][
            index.get(target)
          ] += value;
        }
      );

      const width = isMobile ? 360 : 900;
      const height = isMobile ? 360 : 900;

      const outerRadius =
        Math.min(width, height) * 0.5 -
        (isMobile ? 45 : 90);

      const innerRadius =
        outerRadius - (isMobile ? 18 : 28);

      const chord = d3
        .chordDirected()
        .padAngle(isMobile ? 0.03 : 0.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

      const chords = chord(matrix);

      const colors = [
        "#D9F154",
        "#DDE59A",
        "#CFCBEA",
        "#E7DCCF",
        "#C6D9F1",
        "#E6C7D9",
      ];

      const color = d3
        .scaleOrdinal()
        .domain(names)
        .range(colors);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr(
          "viewBox",
          [-width / 2, -height / 2, width, height]
        )
        .style("width", "100%")
        .style(
          "max-width",
          isMobile ? "340px" : "900px"
        )
        .style("height", "auto")
        .style("display", "block")
        .style("margin", "0 auto");

      const arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      const ribbon = d3
        .ribbonArrow()
        .radius(innerRadius - 2)
        .padAngle(0.01);

      const group = svg
        .append("g")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

      group
        .append("path")
        .attr(
          "fill",
          (d) => color(names[d.index])
        )
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .attr("d", arc);

      // LABELS ONLY DESKTOP
      if (!isMobile) {
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
              translate(${outerRadius + 22})
              ${d.angle > Math.PI ? "rotate(180)" : ""}
            `
          )
          .style("font-size", "15px")
          .style("font-weight", "700")
          .style("fill", "#111")
          .attr(
            "text-anchor",
            (d) =>
              d.angle > Math.PI
                ? "end"
                : "start"
          )
          .text((d) => names[d.index]);
      }

      svg
        .append("g")
        .attr("fill-opacity", 0.78)
        .selectAll("path")
        .data(chords)
        .join("path")
        .attr("d", ribbon)
        .attr(
          "fill",
          (d) => color(names[d.target.index])
        )
        .style("mix-blend-mode", "multiply");
    }

    loadChart();
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 lg:px-20">
      <div className="mb-8 md:mb-14">
        <span className="bg-[#D9F154] text-black px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium">
          D3.js Visualization
        </span>

        <h2 className="text-3xl md:text-6xl font-bold mt-4 md:mt-6">
          Global Incident Connections
        </h2>

        <p className="text-[#666] mt-4 md:mt-6 text-sm md:text-xl max-w-3xl">
          Visualizing relationships between countries,
          discrimination categories and reported
          incidents.
        </p>
      </div>

      <div
        className="
          bg-white
          border
          border-[#ecece8]
          rounded-[28px]
          md:rounded-[40px]
          p-4
          md:p-10
          flex
          justify-center
          items-center
          overflow-hidden
        "
      >
        <div
          ref={ref}
          className="w-full flex justify-center"
        />
      </div>
    </section>
  );
}