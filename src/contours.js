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

    var fragments = [];

    // Accumulate contour polygons. TODO Assign holes.
    tz.forEach(function(v) {
      contour((x, y) => {
        return x >= x0
            && y >= y0
            && x < x1
            && y < y1
            && values[(y - y0) * (x1 - x0) + (x - x0)] < v; // TODO inclusive?
      }, fragments);
    });

    return fragments;
  }

  function contour(test, fragments) {
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
            delete fragmentByEnd[f.end];
            delete fragmentByStart[f.start];
            f.push(end);
            f.end = end;
            if (g = fragmentByStart[end]) {
              delete fragmentByStart[g.start];
              delete fragmentByEnd[g.end];
              if (g === f) throw new Error("not yet implemented");
              fg = g === f ? f : (f.pop(), f.concat(g));
              fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
            } else if (g = fragmentByEnd[end]) {
              delete fragmentByStart[g.start];
              delete fragmentByEnd[g.end];
              if (g === f) throw new Error("not yet implemented");
              fg = (f.pop(), f.reverse(), g.concat(f));
              fragmentByStart[fg.start = g.start] = fragmentByEnd[fg.end = f.start] = fg;
            } else {
              fragmentByStart[f.start] = f;
              fragmentByEnd[f.end] = f;
            }
          } else if (f = fragmentByStart[end]) {
            delete fragmentByStart[f.start];
            delete fragmentByEnd[f.end];
            f.unshift(start);
            f.start = start;
            if (g = fragmentByEnd[start]) {
              delete fragmentByStart[g.start];
              delete fragmentByEnd[g.end];
              if (g === f) throw new Error("not yet implemented");
              fg = g === f ? f : (g.pop(), g.concat(f));
              fragmentByStart[fg.start = g.start] = fragmentByEnd[fg.end = f.end] = fg;
            } else if (g = fragmentByStart[start]) {
              if (g === f) throw new Error("not yet implemented");
              fg = (f.reverse(), f.pop(), f.concat(g));
              fragmentByStart[fg.start = f.end] = fragmentByEnd[fg.end = g.end] = fg;
            } else {
              fragmentByStart[f.start] = f;
              fragmentByEnd[f.end] = f;
            }
          } else if (f = fragmentByStart[start]) {
            delete fragmentByStart[f.start];
            delete fragmentByEnd[f.end];
            f.unshift(end);
            f.start = end;
            if (g = fragmentByEnd[end]) {
              delete fragmentByStart[g.start];
              delete fragmentByEnd[g.end];
              if (g === f) throw new Error("not yet implemented");
              fg = g === f ? f : (g.pop(), g.concat(f));
              fragmentByStart[fg.start = g.start] = fragmentByEnd[fg.end = f.end] = fg;
            } else { // Note: fragmentByStart[end] is null!
              fragmentByStart[f.start] = f;
              fragmentByEnd[f.end] = f;
            }
          } else if (f = fragmentByEnd[end]) {
            delete fragmentByStart[f.start];
            delete fragmentByEnd[f.end];
            f.push(start);
            f.end = start;
            if (g = fragmentByStart[start]) {
              delete fragmentByStart[g.start];
              delete fragmentByEnd[g.end];
              if (g === f) throw new Error("not yet implemented");
              fg = g === f ? f : (f.pop(), f.concat(g));
              fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
            } else { // Note: fragmentByEnd[start] is null!
              fragmentByStart[f.start] = f;
              fragmentByEnd[f.end] = f;
            }
          } else {
            f = [start, end];
            fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
          }
        });
      }
    }

    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete f.start;
      delete f.end;
      fragments.push(f);
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
