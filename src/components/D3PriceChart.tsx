import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { COLORS, DATE_FORMATS } from "../constants/theme";

interface DataPoint {
  date: Date;
  price: number;
}

interface D3PriceChartProps {
  data: DataPoint[];
}

const D3PriceChart: React.FC<D3PriceChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Dimensions
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 10, bottom: 40, left: 10 }; // Minimized side margins
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Setup chart group
    const g = svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "none")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date.toISOString())) // Use ISO string for uniqueness
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price) || 2000]) // Start from 0 for bar charts usually
      .nice()
      .range([innerHeight, 0]);

    // Tooltip interaction overlay
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "#1F2937") // gray-800
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "50");

    // Draw Bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.date.toISOString())!)
      .attr("y", innerHeight) // Start from bottom for animation
      .attr("width", xScale.bandwidth())
      .attr("height", 0) // Start with 0 height
      .attr("fill", COLORS.chartBar)
      .attr("rx", 4) // Rounded top corners
      .attr("ry", 4)
      .on("mouseover", function (_event, d) {
        d3.select(this)
          .attr("fill", COLORS.chartBarHover)
          .style("cursor", "pointer");

        tooltip
          .style("visibility", "visible")
          .html(
            `<strong>${d3.timeFormat(DATE_FORMATS.chartTooltip)(d.date)}</strong><br/>€${d.price}`,
          );
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 40 + "px")
          .style("left", event.pageX - 20 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", COLORS.chartBar);
        tooltip.style("visibility", "hidden");
      })
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => yScale(d.price))
      .attr("height", (d) => innerHeight - yScale(d.price));

    // To align the time-axis ticks with the bands, we need the range to match the band centers.
    // Easier approach: Use the band scale for axis, but hide some ticks.
    const axisGroup = g
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale).tickFormat((d) => {
          // d is ISO string. Parse back to date.
          const date = new Date(d);
          return d3.timeFormat(DATE_FORMATS.chartAxis)(date);
        }),
      )
      .attr("font-size", "10px")
      .attr("color", COLORS.text.secondary);

    // Fix crowding: rotate text or hide every 2nd
    axisGroup
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dy", "1em")
      .each(function (_d, i) {
        if (i % 2 !== 0) d3.select(this).remove(); // Show every 2nd label
      });

    axisGroup.select(".domain").remove(); // Remove line

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div className="w-full h-full min-h-[300px] bg-white rounded-xl shadow-sm p-4 relative">
      <h3 className="text-gray-700 font-bold font-title mb-4">
        Day of Purchase
      </h3>
      <svg ref={svgRef} className="w-full h-full overflow-visible"></svg>
    </div>
  );
};

export default D3PriceChart;
