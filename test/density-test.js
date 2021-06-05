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
  const c = contourDensity().thresholds([0.0001, 0.001]);
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
