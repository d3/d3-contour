import assert from "assert";
import {polygonCentroid} from "d3-polygon";
import {contourDensity} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("density.size(…) validates the specified size", () => {
  assert.deepStrictEqual(contourDensity().size([1, 2]).size(), [1, 2]);
  assert.deepStrictEqual(contourDensity().size([0, 0]).size(), [0, 0]);
  assert.deepStrictEqual(contourDensity().size([1.5, 2.5]).size(), [1.5, 2.5]);
  assert.throws(() => void contourDensity().size([0, -1]), /invalid size/);
});

it("contourDensity(data) returns the expected result for empty data", () => {
  const c = contourDensity();
  assert.deepStrictEqual(c([]), []);
});

it("contourDensity(data) returns contours centered on a point", () => {
  const c = contourDensity().thresholds([0.00001, 0.0001]);
  for (const p of [[100, 100], [100.5, 102]]) {
    const contour = c([p]);
    assert.strictEqual(contour.length, 2);
    for (const b of contour) {
      const a = polygonCentroid(b.coordinates[0][0]);
      assertInDelta(a[0], p[0], 0.1);
      assertInDelta(a[1], p[1], 0.1);
    }
  }
});

it("contourDensity.thresholds(values[])(data) returns contours for the given values", () => {
  const points = [[1, 0], [0, 1], [1, 1]];
  const c = contourDensity();
  const c1 = c(points);
  const values1 = c1.map(d => d.value);
  const c2 = c.thresholds(values1)(points);
  const values2 = c2.map(d => d.value);
  assert.deepStrictEqual(values1, values2);
});

it("contourDensity.thresholds(values[])(data) returns contours for the given values at a different cellSize", () => {
  const points = [[1, 0], [0, 1], [1, 1]];
  const c = contourDensity().cellSize(16);
  const c1 = c(points);
  const values1 = c1.map(d => d.value);
  const c2 = c.thresholds(values1)(points);
  const values2 = c2.map(d => d.value);
  assert.deepStrictEqual(values1, values2);
});
