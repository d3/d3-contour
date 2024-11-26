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

function svgContours(data, {width = 500, smooth = true} = {}) {
  const n = data.width;
  const m = data.height;
  const height = Math.round(m / n * width);
  const path = geoPath().projection(geoIdentity().scale(width / n));
  const color = scaleSequential(interpolateTurbo).domain(extent(data.values, (d) => isFinite(d) ? d : NaN)).nice();
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
      .attr("d", (d) => path(contours().smooth(smooth).size([n, m]).contour(data.values, d)))
      .attr("fill", color);
  return svg.node();
}

export async function volcanoContours() {
  return svgContours(await json("data/volcano.json"), {width: 928});
}

export async function volcanoContoursRugged() {
  return svgContours(await json("data/volcano.json"), {width: 928, smooth: false});
}

export function matrixContours1() {
  const n = 16;
  const data = {values: new Uint32Array(n * n), width: n, height: n};
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < n; ++j)
      data.values[i + n * j] = i * j;
  return svgContours(data);
}

export function matrixContours2() {
  const n = 16;
  const data = {values: new Float32Array(n * n), width: n, height: n};
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < n; ++j)
      data.values[i + n * j] = i + j;
  return svgContours(data);
}

export function matrixContours3() {
  const n = 200;
  const data = {values: new Float32Array(n * n), width: n, height: n};
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < n; ++j)
      data.values[i + n * j] = Math.sin(2 * i / n + 2 * (j / n)**2);
  return svgContours(data);
}


export function matrixContours4Holes() {
  const n = 200;
  const data = {values: new Float32Array(n * n), width: n, height: n};
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < n; ++j)
      data.values[i + n * j] = Math.cos(2 * i / n + 2 * (j / n)**2);
  data.values[1256] = NaN;
  data.values[6900] = -Infinity;
  data.values[18700] = +Infinity;
  return svgContours(data);
}

export function grid2() {
  return svgContours({
    values: [
      [
        3.931884, 3.949764, 3.967644, 3.985524, 4.003405, 4.021285,
        4.039165, 4.057045, 4.074925, 4.092805, 4.110685, 4.128565,
        4.146446, 4.164326, 4.182206, 4.200086
      ],
      [
        3.890766, 3.910306, 3.929845, 3.949385, 3.968925, 3.988464,
        4.008004, 4.027544, 4.047084, 4.066623, 4.086163, 4.105703,
        4.125243, 4.144782, 4.164322, 4.183862
      ],
      [
        3.849648, 3.870847, 3.892046, 3.913245, 3.934445, 3.955644,
        3.976844, 3.998043, 4.019242, 4.040442, 4.061641, 4.08284, 4.10404,
        4.125239, 4.146438, 4.167637
      ],
      [
        3.808529, 3.831388, 3.854247, 3.877106, 3.899965, 3.922824,
        3.945683, 3.968542, 3.991401, 4.014259, 4.037118, 4.059978,
        4.082836, 4.105695, 4.128554, 4.151413
      ],
      [
        3.767411, 3.791929, 3.816448, 3.840966, 3.865485, 3.890004,
        3.914522, 3.939041, 3.963559, 3.988078, 4.012596, 4.037115,
        4.061633, 4.086152, 4.11067, 4.135189
      ],
      [
        3.726293, 3.752471, 3.778649, 3.804827, 3.831005, 3.857183,
        3.883361, 3.909539, 3.935718, 3.961896, 3.988074, 4.014252, 4.04043,
        4.066608, 4.092786, 4.118965
      ],
      [
        3.685174, 3.713012, 3.74085, 3.768687, 3.796525, 3.824363, 3.852201,
        3.880038, 3.907876, 3.935714, 3.963552, 3.991389, 4.019227,
        4.047065, 4.074903, 4.10274
      ],
      [
        3.644056, 3.673553, 3.703051, 3.732548, 3.762045, 3.791543, 3.82104,
        3.850537, 3.880035, 3.909532, 3.939029, 3.968527, 3.998024,
        4.027521, 4.057019, 4.086516
      ],
      [
        3.602938, 3.634095, 3.665252, 3.696409, 3.727566, 3.758723,
        3.789879, 3.821036, 3.852193, 3.88335, 3.914507, 3.945664, 3.976821,
        4.007978, 4.039135, 4.070292
      ],
      [
        3.56182, 3.594636, 3.627453, 3.660269, 3.693086, 3.725902, 3.758719,
        3.791535, 3.824352, 3.857168, 3.889985, 3.922801, 3.955618,
        3.988434, 4.021251, 4.054067
      ],
      [
        3.520701, 3.555177, 3.589653, 3.62413, 3.658606, 3.693082, 3.727558,
        3.762034, 3.79651, 3.830986, 3.865462, 3.899939, 3.934415, 3.968891,
        4.003367, 4.037843
      ],
      [
        3.479583, 3.515719, 3.551854, 3.58799, 3.624126, 3.660262, 3.696397,
        3.732533, 3.768669, 3.804804, 3.84094, 3.877076, 3.913212, 3.949347,
        3.985483, 4.021619
      ],
      [
        3.438465, 3.47626, 3.514055, 3.551851, 3.589646, 3.627441, 3.665237,
        3.703032, 3.740827, 3.778623, 3.816418, 3.854213, 3.892009,
        3.929804, 3.967599, 4.005394
      ],
      [
        3.397346, 3.436801, 3.476256, 3.515711, 3.555166, 3.594621,
        3.634076, 3.673531, 3.712986, 3.752441, 3.791896, 3.83135, 3.870805,
        3.91026, 3.949715, 3.98917
      ],
      [
        3.356228, 3.397343, 3.438457, 3.479572, 3.520686, 3.561801,
        3.602915, 3.64403, 3.685144, 3.726259, 3.767373, 3.808488, 3.849602,
        3.890717, 3.931831, 3.972946
      ],
      [
        3.31511, 3.357884, 3.400658, 3.443432, 3.486206, 3.52898, 3.571754,
        3.614529, 3.657303, 3.700077, 3.742851, 3.785625, 3.828399,
        3.871173, 3.913947, 3.956722
      ]
    ]
      .flat()
      .map((d) => 5 * d),
    width: 16,
    height: 16
  });
}