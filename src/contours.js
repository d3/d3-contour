import {extent, thresholdSturges, ticks} from "d3-array";
import {slice} from "./array";
import constant from "./constant";

export default function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      domain = extent,
      threshold = thresholdSturges;

// var contours = d3.contours()
//     .size([width, height])
//     .thresholds(d3.range(2, 22).map(p => Math.pow(2, p)))
//     ((i, j) => goldsteinPrice(x.invert(i), y.invert(j)));

  function contours(value) {
    var values = new Array((x1 - x0) * (y1 - y0));

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

    return values;
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
