import assert from "assert";
import * as d3 from "../src/index.js";

it("contours(values) returns the expected result for an empty polygon", () => {
  const contours = d3.contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(contours([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]), [
    {
      "type": "MultiPolygon",
      "value": 0.5,
      "coordinates": []
    }
  ]);
});

it("contours(values) returns the expected result for a simple polygon", () => {
  const contours = d3.contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(contours([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]), [
    {
      "type": "MultiPolygon",
      "value": 0.5,
      "coordinates": [
        [
          [[6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], [5.5, 3], [4.5, 3],
           [3.5, 3], [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], [3.5, 8],
           [4.5, 8], [5.5, 8], [6, 7.5]]
        ]
      ]
    }
  ]);
});

it("contours(values).contour(value) returns the expected result for a simple polygon", () => {
  const contours = d3.contours().size([10, 10]);
  assert.deepStrictEqual(contours.contour([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ], 0.5), {
    "type": "MultiPolygon",
    "value": 0.5,
    "coordinates": [
      [
        [[6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], [5.5, 3], [4.5, 3],
         [3.5, 3], [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], [3.5, 8],
         [4.5, 8], [5.5, 8], [6, 7.5]]
      ]
    ]
  });
});

it("contours.smooth(false)(values) returns the expected result for a simple polygon", () => {
  const contours = d3.contours().smooth(false).size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(contours([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 1, 2, 0, 0, 0, 0,
    0, 0, 0, 2, 2, 2, 0, 0, 0, 0,
    0, 0, 0, 1, 2, 1, 0, 0, 0, 0,
    0, 0, 0, 2, 2, 2, 0, 0, 0, 0,
    0, 0, 0, 2, 1, 2, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]), [
    {
      "type": "MultiPolygon",
      "value": 0.5,
      "coordinates": [
        [
          [[6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], [5.5, 3], [4.5, 3],
           [3.5, 3], [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], [3.5, 8],
           [4.5, 8], [5.5, 8], [6, 7.5]]
        ]
      ]
    }
  ]);
});

it("contours(values) returns the expected result for a polygon with a hole", () => {
  const contours = d3.contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(contours([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]), [
    {
      "type": "MultiPolygon",
      "value": 0.5,
      "coordinates": [
        [
          [[6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], [5.5, 3], [4.5, 3],
           [3.5, 3], [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], [3.5, 8],
           [4.5, 8], [5.5, 8], [6, 7.5]],
          [[4.5, 7], [4, 6.5], [4, 5.5], [4, 4.5], [4.5, 4], [5, 4.5], [5, 5.5],
           [5, 6.5], [4.5, 7]]
        ]
      ]
    }
  ]);
});

it("contours(values) returns the expected result for a multipolygon", () => {
  const contours = d3.contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(contours([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]), [
    {
      "type": "MultiPolygon",
      "value": 0.5,
      "coordinates": [
        [
          [[5, 7.5], [5, 6.5], [5, 5.5], [5, 4.5], [5, 3.5], [4.5, 3], [3.5, 3],
           [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], [3.5, 8], [4.5, 8],
           [5, 7.5]]
        ],
        [
          [[7, 7.5], [7, 6.5], [7, 5.5], [7, 4.5], [7, 3.5], [6.5, 3], [6, 3.5],
           [6, 4.5], [6, 5.5], [6, 6.5], [6, 7.5], [6.5, 8], [7, 7.5]]
        ]
      ]
    }
  ]);
});

it("contours(values) returns the expected result for a multipolygon with holes", () => {
  const contours = d3.contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(contours([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 0, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]), [
    {
      "type": "MultiPolygon",
      "value": 0.5,
      "coordinates": [
        [
          [[4, 5.5], [4, 4.5], [4, 3.5], [3.5, 3], [2.5, 3], [1.5, 3], [1, 3.5],
           [1, 4.5], [1, 5.5], [1.5, 6], [2.5, 6], [3.5, 6], [4, 5.5]],
          [[2.5, 5], [2, 4.5], [2.5, 4], [3, 4.5], [2.5, 5]]
        ],
        [
          [[8, 5.5], [8, 4.5], [8, 3.5], [7.5, 3], [6.5, 3], [5.5, 3], [5, 3.5],
           [5, 4.5], [5, 5.5], [5.5, 6], [6.5, 6], [7.5, 6], [8, 5.5]],
          [[6.5, 5], [6, 4.5], [6.5, 4], [7, 4.5], [6.5, 5]]
        ]
      ]
    }
  ]);
});

it("contours.size(…) validates the specified size", () => {
  assert.deepStrictEqual(d3.contours().size([1, 2]).size(), [1, 2]);
  assert.deepStrictEqual(d3.contours().size([0, 0]).size(), [0, 0]);
  assert.deepStrictEqual(d3.contours().size([1.5, 2.5]).size(), [1, 2]);
  try {
    d3.contours().size([0, -1]);
    assert.fail();
  } catch (error) {
    assert.strictEqual(error.message, "invalid size");
  }
});
