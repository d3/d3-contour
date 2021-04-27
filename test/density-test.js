import assert from "assert";
import * as d3 from "../src/index.js";

it("density.size(…) validates the specified size", () => {
  assert.deepStrictEqual(d3.contourDensity().size([1, 2]).size(), [1, 2]);
  assert.deepStrictEqual(d3.contourDensity().size([0, 0]).size(), [0, 0]);
  assert.deepStrictEqual(d3.contourDensity().size([1.5, 2.5]).size(), [1.5, 2.5]);
  try {
    d3.contourDensity().size([0, -1]);
    assert.fail();
  } catch (error) {
    assert.strictEqual(error.message, "invalid size");
  }
});
