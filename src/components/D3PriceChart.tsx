import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

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
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Setup chart group
    const g = svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.price) || 0,
        d3.max(data, (d) => d.price) || 2000,
      ])
      .nice()
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    // Area generator (for gradient fill)
    const area = d3
      .area<DataPoint>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    // Gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#EA580C") // Tailwind orange-600
      .attr("stop-opacity", 0.4);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#EA580C")
      .attr("stop-opacity", 0);

    // Grid lines (Y)
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => ""),
      )
      .style("stroke-dasharray", "3 3")
      .style("stroke-opacity", 0.1);

    // Draw Area
    g.append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // Draw Line
    const path = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#EA580C")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Animate Line
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat("%b %d") as any); // Cast to any to fix type mismatch with D3/TS if needed, usually works

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `€${d}`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("font-size", "10px")
      .attr("color", "#6B7280"); // gray-500

    g.append("g")
      .call(yAxis)
      .attr("font-size", "10px")
      .attr("color", "#6B7280")
      .select(".domain")
      .remove(); // Remove Y axis line for cleaner look

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

    // Points
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.price))
      .attr("r", 4)
      .attr("fill", "#fff")
      .attr("stroke", "#EA580C")
      .attr("stroke-width", 2)
      .style("opacity", 0) // Hide initially
      .on("mouseover", function (_event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)
          .style("opacity", 1);

        tooltip
          .style("visibility", "visible")
          .html(
            `<strong>${d3.timeFormat("%B %d")(d.date)}</strong><br/>€${d.price}`,
          );
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4)
          .style("opacity", 0); // Hide again
        tooltip.style("visibility", "hidden");
      });

    // Show dots on hover of the chart area generally (advanced) or just keep them hidden/visible on proximity?
    // For simplicity/cleanliness, let's keep dots hidden until specific hover, or just show them all small.
    // Let's fade them in after the line animation.
    g.selectAll(".dot")
      .transition()
      .delay(1500)
      .duration(500)
      .style("opacity", 1);

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div className="w-full h-full min-h-[300px] bg-white rounded-xl shadow-sm p-4 relative">
      <h3 className="text-gray-700 font-semibold mb-4">
        Price Trend (April 2026)
      </h3>
      <svg ref={svgRef} className="w-full h-full overflow-visible"></svg>
    </div>
  );
};

export default D3PriceChart;
