import {blur, extent, nice, thresholdSturges, ticks} from "d3-array";
import {slice} from "./array.js";
import ascending from "./ascending.js";
import area from "./area.js";
import constant from "./constant.js";
import contains from "./contains.js";
import noop from "./noop.js";

const cases = [
  [],
  [[[1.0, 1.5], [0.5, 1.0]]],
  [[[1.5, 1.0], [1.0, 1.5]]],
  [[[1.5, 1.0], [0.5, 1.0]]],
  [[[1.0, 0.5], [1.5, 1.0]]],
  [[[1.0, 1.5], [0.5, 1.0]], [[1.0, 0.5], [1.5, 1.0]]],
  [[[1.0, 0.5], [1.0, 1.5]]],
  [[[1.0, 0.5], [0.5, 1.0]]],
  [[[0.5, 1.0], [1.0, 0.5]]],
  [[[1.0, 1.5], [1.0, 0.5]]],
  [[[0.5, 1.0], [1.0, 0.5]], [[1.5, 1.0], [1.0, 1.5]]],
  [[[1.5, 1.0], [1.0, 0.5]]],
  [[[0.5, 1.0], [1.5, 1.0]]],
  [[[1.0, 1.5], [1.5, 1.0]]],
  [[[0.5, 1.0], [1.0, 1.5]]],
  []
];

const blurEdges = 0.5;

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

export default function() {
  let dx = 1;
  let dy = 1;
  let threshold = thresholdSturges;
  let smooth = smoothLinear;

  function contours(values) {
    let tz = threshold(values);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      const e = extent(values, finite);
      tz = ticks(...nice(e[0], e[1], tz), tz);
      while (tz[tz.length - 1] >= e[1]) tz.pop();
      while (tz[1] < e[0]) tz.shift();
    } else {
      tz = tz.slice().sort(ascending);
    }

    return tz.map(value => contour(values, value));
  }

  // Accumulate, smooth contour rings, assign holes to exterior rings.
  // Based on https://github.com/mbostock/shapefile/blob/v0.6.2/shp/polygon.js
  function contour(values, value) {
    const v = value == null ? NaN : +value;
    if (isNaN(v)) throw new Error(`invalid value: ${value}`);

    // Don’t round the corners by clamping values on the edge. Note: to blur, we
    // need to ensure that the values are valid numbers.
    const bottom = Array.from(values.slice(0, dx), valid);
    const top = Array.from(values.slice(-dx), valid);
    const left = Array.from({length: dy}, (_, i) => valid(values[i * dx]));
    const right = Array.from({length: dy}, (_, i) => valid(values[i * dx + dx - 1]));
    blur(bottom, blurEdges);
    blur(top, blurEdges);
    blur(left, blurEdges);
    blur(right, blurEdges);

    function get(x, y) {
      const x0 = clamp(x, 0, dx - 1);
      const y0 = clamp(y, 0, dy - 1);
      if (y < 0) return bottom[x0];
      if (y >= dy) return top[x0];
      if (x < 0) return left[y0];
      if (x >= dx) return right[y0];
      return values[x0 + y0 * dx];
    }

    const polygons = [];
    const holes = [];

    isorings(get, value, function(ring) {
      smooth(ring, get, value);
      const r = [];
      let x0, y0;
      for (const point of ring) {
        const x = clamp(point[0], 0, dx);
        const y = clamp(point[1], 0, dy);
        if (x !== x0 || y !== y0) r.push([(x0 = x), (y0 = y)]);
      }
      const a = area(r);
      if (a > 0) polygons.push([r]);
      else if (a < 0) holes.push(r);
    });

    holes.forEach(function(hole) {
      for (let i = 0, n = polygons.length, polygon; i < n; ++i) {
        if (contains((polygon = polygons[i])[0], hole) !== -1) {
          polygon.push(hole);
          return;
        }
      }
    });

    return {
      type: "MultiPolygon",
      value: value,
      coordinates: polygons
    };
  }

  // Marching squares with isolines stitched into rings.
  // Based on https://github.com/topojson/topojson-client/blob/v3.0.0/src/stitch.js
  function isorings(get, value, callback) {
    const test = (x, y) => above(get(x, y), value);
    const fragmentByStart = new Array;
    const fragmentByEnd = new Array;
    let x, y, t0, t1, t2, t3;

    // Special case for the first row (y = -1, t2 = t3 = 0).
    x = y = -2;
    t1 = test(-1, -1);
    cases[t1 << 1].forEach(stitch);
    while (++x < dx) {
      t0 = t1, t1 = test(x + 1, -1);
      cases[t0 | t1 << 1].forEach(stitch);
    }
    cases[t1 << 0].forEach(stitch);

    // General case for the intermediate rows.
    while (++y < dy) {
      x = -2;
      t1 = test(x + 1, y + 1);
      t2 = test(x + 1, y);
      cases[t1 << 1 | t2 << 2].forEach(stitch);
      while (++x < dx) {
        t0 = t1, t1 = test(x + 1, y + 1);
        t3 = t2, t2 = test(x + 1, y);
        cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
      }
      cases[t1 | t2 << 3].forEach(stitch);
    }

    // Special case for the last row (y = dy - 1, t0 = t1 = 0).
    x = -2;
    t2 = test(x, y);
    cases[t2 << 2].forEach(stitch);
    while (++x < dx) {
      t3 = t2, t2 = test(x + 1, y);
      cases[t2 << 2 | t3 << 3].forEach(stitch);
    }
    cases[t2 << 3].forEach(stitch);

    function stitch(line) {
      const start = [line[0][0] + x, line[0][1] + y];
      const end = [line[1][0] + x, line[1][1] + y];
      const startIndex = index(start);
      const endIndex = index(end);
      let f, g;
      if (f = fragmentByEnd[startIndex]) {
        if (g = fragmentByStart[endIndex]) {
          delete fragmentByEnd[f.end];
          delete fragmentByStart[g.start];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[f.start] = fragmentByEnd[g.end] = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
          }
        } else {
          delete fragmentByEnd[f.end];
          f.ring.push(end);
          fragmentByEnd[f.end = endIndex] = f;
        }
      } else if (f = fragmentByStart[endIndex]) {
        if (g = fragmentByEnd[startIndex]) {
          delete fragmentByStart[f.start];
          delete fragmentByEnd[g.end];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[g.start] = fragmentByEnd[f.end] = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
          }
        } else {
          delete fragmentByStart[f.start];
          f.ring.unshift(start);
          fragmentByStart[f.start = startIndex] = f;
        }
      } else {
        fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {start: startIndex, end: endIndex, ring: [start, end]};
      }
    }
  }

  function index(point) {
    return point[0] * 2 + point[1] * (dx + 1) * 4;
  }

  function smoothLinear(ring, get, value) {
    ring.forEach(function(point) {
      const x = point[0];
      const y = point[1];
      const xt = x | 0;
      const yt = y | 0;
      const v1 = valid(get(xt, yt));
      if (x > 0 && x < dx && xt === x) point[0] = smooth1(x, valid(get(xt - 1, yt)), v1, value);
      if (y > 0 && y < dy && yt === y) point[1] = smooth1(y, valid(get(xt, yt - 1)), v1, value);
    });
  }

  contours.contour = contour;

  contours.size = function(_) {
    if (!arguments.length) return [dx, dy];
    const _0 = Math.floor(_[0]);
    const _1 = Math.floor(_[1]);
    if (!(_0 >= 0 && _1 >= 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, contours;
  };

  contours.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), contours) : threshold;
  };

  contours.smooth = function(_) {
    return arguments.length ? (smooth = _ ? smoothLinear : noop, contours) : smooth === smoothLinear;
  };

  return contours;
}

// When computing the extent, ignore infinite values (as well as invalid ones).
function finite(x) {
  return isFinite(x) ? x : NaN;
}

// Is the (possibly invalid) x greater than or equal to the (known valid) value?
// Treat any invalid value as below negative infinity.
function above(x, value) {
  return x == null ? false : +x >= value;
}

// During smoothing, treat any invalid value as negative infinity.
function valid(v) {
  return v == null || isNaN(v = +v) ? -Infinity : v;
}

function smooth1(x, v0, v1, value) {
  const a = value - v0;
  const b = v1 - v0;
  const d = isFinite(a) || isFinite(b) ? a / b : Math.sign(a) / Math.sign(b);
  return isNaN(d) ? x : x + d - 0.5;
}
