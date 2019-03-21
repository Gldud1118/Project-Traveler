import * as d3Base from "d3";
import legendColor from "d3-svg-legend";

const d3 = Object.assign({}, d3Base, legendColor);

const dims = { width: 250, height: 250, radius: 125 };
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 125)
  .attr("height", dims.height + 125);

const graph = svg
  .append("g")
  .attr("transform", `translate(${cent.x}, ${cent.y})`);

const pie = d3
  .pie()
  .sort(null)
  .value(d => d.cost);

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

const color = d3.scaleOrdinal(d3["schemeSet3"]);

const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${dims.width + 40}, 10)`);

var data = [
  { name: "Eat", cost: 7000 },
  { name: "Take", cost: 15000 },
  { name: "See", cost: 5000 },
  { name: "Shop", cost: 2000 },
  { name: "Sleep", cost: 3000 },
  { name: "Etc", cost: 4000 }
];

color.domain(data.map(d => d.name));

const colorLegend = d3
  .legendColor()
  .shape("circle")
  .shapePadding(10)
  .scale(color);

legendGroup.call(colorLegend);

const paths = graph.selectAll("path").data(pie(data));

paths
  .enter() //Virtual DOM
  .append("path")
  .attr("class", "arc") //path에다가 arc라는 클래스 줌
  .attr("d", arcPath) // 이 패스는 arc path임
  .attr("stroke", "#fff")
  .attr("stroke-width", 3)
  .attr("fill", d => color(d.data.name));
