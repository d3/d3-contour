import {extent, ticks} from "d3-array";
import {axisBottom, axisLeft} from "d3-axis";
import {autoType} from "d3-dsv";
import {tsv, json} from "d3-fetch";
import {geoIdentity, geoPath} from "d3-geo";
import {scaleLinear, scaleSequential} from "d3-scale";
import {interpolateTurbo} from "d3-scale-chromatic";
import {create, select} from "d3-selection";
import {svg} from "htl";
import {contours, contourDensity} from "d3-contour";

export async function faithfulContours() {
  const faithful = await tsv("data/faithful.tsv", autoType);

  const width = 960,
        height = 500,
        marginTop = 20,
        marginRight = 30,
        marginBottom = 30,
        marginLeft = 40;

  const x = scaleLinear()
      .domain(extent(faithful, d => d.waiting)).nice()
      .rangeRound([marginLeft, width - marginRight]);

  const y = scaleLinear()
      .domain(extent(faithful, d => d.eruptions)).nice()
      .rangeRound([height - marginBottom, marginTop]);

  const contours = contourDensity()
      .x(d => x(d.waiting))
      .y(d => y(d.eruptions))
      .size([width, height])
      .bandwidth(30)
      .thresholds(30)
    (faithful);

  const path = geoPath();

  return svg`<svg viewBox="0 0 ${width} ${height}" width=${width} height=${height} style="max-width: 100%; height: auto; height: intrinsic;">
    ${select(svg`<g transform="translate(${marginLeft},0)">`).call(axisLeft(y)).call(g => g.select(".domain").remove())}
    ${select(svg`<g transform="translate(0,${height - marginBottom})">`).call(axisBottom(x)).call(g => g.select(".domain").remove())}
    <g>${faithful.map(d => svg`<circle cx=${x(d.waiting)} cy=${y(d.eruptions)} r=2>`)}</g>
    <g fill=none stroke=blue>${contours.map(c => svg`<path d=${path(c)}>`)}</g>
  </svg>`;
}

export async function faithfulContour() {
  const faithful = await tsv("data/faithful.tsv", autoType);

  const width = 960,
        height = 500,
        marginTop = 20,
        marginRight = 30,
        marginBottom = 30,
        marginLeft = 40;

  const x = scaleLinear()
      .domain(extent(faithful, d => d.waiting)).nice()
      .rangeRound([marginLeft, width - marginRight]);

  const y = scaleLinear()
      .domain(extent(faithful, d => d.eruptions)).nice()
      .rangeRound([height - marginBottom, marginTop]);

  const contour = contourDensity()
      .x(d => x(d.waiting))
      .y(d => y(d.eruptions))
      .size([width, height])
      .bandwidth(30)
    .contours(faithful);

  const thresholds = ticks(0, contour.max, 30).slice(1);

  const path = geoPath();

  return svg`<svg viewBox="0 0 ${width} ${height}" width=${width} height=${height} style="max-width: 100%; height: auto; height: intrinsic;">
    ${select(svg`<g transform="translate(${marginLeft},0)">`).call(axisLeft(y)).call(g => g.select(".domain").remove())}
    ${select(svg`<g transform="translate(0,${height - marginBottom})">`).call(axisBottom(x)).call(g => g.select(".domain").remove())}
    <g>${faithful.map(d => svg`<circle cx=${x(d.waiting)} cy=${y(d.eruptions)} r=2>`)}</g>
    <g fill=none stroke=red>${thresholds.map(t => svg`<path d=${path(contour(t))}>`)}</g>
  </svg>`;
}

export async function volcanoContours() {
  const data = await json("data/volcano.json");
  const n = data.width;
  const m = data.height;
  const width = 928;
  const height = Math.round(m / n * width);
  const path = geoPath().projection(geoIdentity().scale(width / n));
  const color = scaleSequential(interpolateTurbo).domain(extent(data.values)).nice();
  const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
  svg.append("g")
      .attr("stroke", "black")
    .selectAll()
    .data(color.ticks(20))
    .join("path")
      .attr("d", d => path(contours().size([n, m]).contour(data.values, d)))
      .attr("fill", color);
  return svg.node();
}
