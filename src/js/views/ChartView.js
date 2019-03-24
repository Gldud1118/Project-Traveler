import * as d3Base from "d3";
import legendColor from "d3-svg-legend";
import View from "./view";

const d3 = Object.assign({}, d3Base, legendColor);

const ChartView = Object.create(View);

ChartView.setup = function(el) {
  this.init(el);

  return this;
};

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
  .value(d => d.total);

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

const color = d3.scaleOrdinal(d3["schemeSet3"]);

const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${dims.width + 40}, 10)`);

ChartView.drawPieChart = function(data) {
  this.updatePie(data);
};

ChartView.updatePie = function(data) {
  color.domain(data.map(d => d.category));

  const colorLegend = d3
    .legendColor()
    .shape("circle")
    .shapePadding(10)
    .scale(color);

  legendGroup.call(colorLegend);

  const paths = graph.selectAll("path").data(pie(data));

  paths
    .exit()
    .transition()
    .duration(750)
    .attrTween("d", arcTweenExit)
    .remove(); //삭제된 아이템과 함께 path도 제거됨

  paths
    .attr("d", arcPath) //현재 DOM Path를 업데이트
    .transition()
    .duration(750)
    .attrTween("d", arcTweenUpdate);

  paths
    .enter() //Virtual DOM
    .append("path")
    .attr("class", "arc") //path에다가 arc라는 클래스 줌
    .attr("d", arcPath) // 이 패스는 arc path임
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", d => color(d.data.category))
    .each(function(d) {
      this._current = d;
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTweenEnter);
};

function arcTweenEnter(d) {
  var i = d3.interpolate(d.endAngle, d.startAngle);
  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
}

function arcTweenExit(d) {
  var i = d3.interpolate(d.endAngle, d.startAngle);
  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
}

function arcTweenUpdate(d) {
  var i = d3.interpolate(this._current, d);
  this._current = i(1);
  return function(t) {
    return arcPath(i(t));
  };
}

export default ChartView;
