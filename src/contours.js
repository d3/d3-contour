import {extent, thresholdSturges, ticks} from "d3-array";
import {slice} from "./array";
import constant from "./constant";

var cases = [
  [],
  [[[0.5,1],[1,1.5]]],
  [[[1,1.5],[1.5,1]]],
  [[[0.5,1],[1.5,1]]],
  [[[1,0.5],[1.5,1]]],
  [[[0.5,1],[1,0.5]],[[1,1.5],[1.5,1]]],
  [[[1,0.5],[1,1.5]]],
  [[[0.5,1],[1,0.5]]],
  [[[0.5,1],[1,0.5]]],
  [[[1,0.5],[1,1.5]]],
  [[[0.5,1],[1,1.5]],[[1,0.5],[1.5,1]]],
  [[[1,0.5],[1.5,1]]],
  [[[0.5,1],[1.5,1]]],
  [[[1,1.5],[1.5,1]]],
  [[[0.5,1],[1,1.5]]],
  []
];

export default function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      domain = extent,
      threshold = thresholdSturges;

  function contours(value) {
    if (!(y1 >= y0) || !(x1 >= x0)) throw new Error; // TODO move to contours.{size,extent}

    var values = new Array((x1 - x0) * (y1 - y0));

    // Compute the grid of values.
    // TODO Allow the grid to be precomputed, so new thresholds can be dynamically computed.
    // TODO But if we do that, then we can’t generate smooth contours using the value function…
    // TODO However, we CAN generate smooth contours using linear interpolation of the gridded values.
    for (var y = y0, i = 0; y < y1; ++y) {
      for (var x = x0; x < x1; ++x, ++i) {
        values[i] = value(x, y);
      }
    }

    var vz = domain(values),
        v0 = vz[0],
        v1 = vz[1],
        tz = threshold(values, v0, v1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) tz = ticks(v0, v1, tz);

    var rings = [];

    // Accumulate contour polygons. TODO Assign holes.
    tz.forEach(function(v) {
      contour((x, y) => {
        return x >= x0
            && y >= y0
            && x < x1
            && y < y1
            && values[(y - y0) * (x1 - x0) + (x - x0)] < v; // TODO inclusive?
      }, rings);
    });

    return rings;
  }

  function contour(test, rings) {
    var fragmentByStart = {},
        fragmentByEnd = {};

    for (var y = y0 - 1; y < y1; ++y) {
      for (var x = x0 - 1; x < x1; ++x) {
        var c = (test(x, y + 1) << 0)
            | (test(x + 1, y + 1) << 1)
            | (test(x + 1, y) << 2)
            | (test(x, y) << 3);
        cases[c].forEach(line => {
          var start = [line[0][0] + x, line[0][1] + y],
              end = [line[1][0] + x, line[1][1] + y],
              f, g, fg;

          if (f = fragmentByEnd[start]) {
            if (g = fragmentByStart[end]) {
              delete fragmentByEnd[f.end];
              delete fragmentByStart[g.start];
              fg = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
              fragmentByStart[fg.start] = fragmentByEnd[fg.end] = fg;
            } else if (g = fragmentByEnd[end]) {
              delete fragmentByStart[f.start];
              delete fragmentByEnd[f.end];
              delete fragmentByEnd[g.end];
              fg = {start: g.start, end: f.start, ring: g.ring.concat(f.ring.reverse())};
              fragmentByStart[fg.start] = fragmentByEnd[fg.end] = fg;
            } else {
              delete fragmentByEnd[f.end];
              f.ring.push(end);
              f.end = end;
              fragmentByEnd[f.end] = f;
            }
          } else if (f = fragmentByStart[end]) {
            if (g = fragmentByEnd[start]) {
              delete fragmentByStart[f.start];
              delete fragmentByEnd[g.end];
              fg = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
              fragmentByStart[fg.start] = fragmentByEnd[fg.end] = fg;
            } else if (g = fragmentByStart[start]) {
              delete fragmentByStart[f.start];
              delete fragmentByEnd[f.end];
              delete fragmentByStart[g.start];
              fg = {start: f.end, end: g.end, ring: f.ring.reverse().concat(g.ring)};
              fragmentByStart[fg.start] = fragmentByEnd[fg.end] = fg;
            } else {
              delete fragmentByStart[f.start];
              f.ring.unshift(start);
              f.start = start;
              fragmentByStart[f.start] = f;
            }
          } else if (f = fragmentByStart[start]) {
            if (g = fragmentByEnd[end]) {
              delete fragmentByStart[f.start];
              delete fragmentByEnd[g.end];
              fg = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
              fragmentByStart[fg.start] = fragmentByEnd[fg.end] = fg;
            } else { // Note: fragmentByStart[end] is null!
              delete fragmentByStart[f.start];
              f.ring.unshift(end);
              f.start = end;
              fragmentByStart[f.start] = f;
            }
          } else if (f = fragmentByEnd[end]) {
            if (g = fragmentByStart[start]) {
              delete fragmentByEnd[f.end];
              delete fragmentByStart[g.start];
              fg = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
              fragmentByStart[fg.start] = fragmentByEnd[fg.end] = fg;
            } else { // Note: fragmentByEnd[start] is null!
              delete fragmentByEnd[f.end];
              f.ring.push(start);
              f.end = start;
              fragmentByEnd[f.end] = f;
            }
          } else {
            f = {start: start, end: end, ring: [start, end]};
            fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
          }
        });
      }
    }

    for (var k in fragmentByEnd) {
      rings.push(fragmentByEnd[k].ring);
    }
  }

  contours.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = Math.ceil(_[0]), y1 = Math.ceil(_[1]), contours) : [x1 - x0, y1 - y0];
  };

  contours.extent = function(_) {
    return arguments.length ? (x0 = Math.floor(_[0][0]), y0 = Math.floor(_[0][1]), x1 = Math.ceil(_[1][0]), y1 = Math.ceil(_[1][1]), contours) : [[x0, y0], [x1, y1]];
  };

  contours.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), contours) : domain;
  };

  contours.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), contours) : threshold;
  };

  return contours;
}
