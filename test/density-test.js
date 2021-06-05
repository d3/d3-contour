import assert from "assert";
import {contourDensity} from "../src/index.js";

it("density.size(…) validates the specified size", () => {
  assert.deepStrictEqual(contourDensity().size([1, 2]).size(), [1, 2]);
  assert.deepStrictEqual(contourDensity().size([0, 0]).size(), [0, 0]);
  assert.deepStrictEqual(contourDensity().size([1.5, 2.5]).size(), [1.5, 2.5]);
  assert.throws(() => void contourDensity().size([0, -1]), /invalid size/);
});
