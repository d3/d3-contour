import assert from "assert";
import {contours} from "../src/index.js";

it("contours(values) returns the expected result for an empty polygon", () => {
  const c = contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
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
  const c = contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
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
  const c = contours().size([10, 10]);
  assert.deepStrictEqual(c.contour([
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
  const c = contours().smooth(false).size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
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
  const c = contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
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
  const c = contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
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
  const c = contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
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
  assert.deepStrictEqual(contours().size([1, 2]).size(), [1, 2]);
  assert.deepStrictEqual(contours().size([0, 0]).size(), [0, 0]);
  assert.deepStrictEqual(contours().size([1.5, 2.5]).size(), [1, 2]);
  assert.throws(() => void contours().size([0, -1]), /invalid size/);
});

it("contours(values) returns the expected thresholds", () => {
  const c = contours().size([10, 10]).thresholds(20);
  assert.deepStrictEqual(c([
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
  ]).map(d => d.value), [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]);
});

it("contours(values) ignores infinite values when computing the thresholds", () => {
  const c = contours().size([10, 10]).thresholds(20);
  assert.deepStrictEqual(c([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, -Infinity, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 0, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, Infinity, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]).map(d => d.value), [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]);
});

it("contours(values) treats null, undefined, NaN and -Infinity as holes", () => {
  const c = contours().size([10, 10]);
  assert.deepStrictEqual(c.contour([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -Infinity, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, null, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 2, 2, 2, 1,
    1, 1, NaN, 1, 1, 1, 2, -Infinity, 2, 1,
    1, 1, 1, 1, 1, 1, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ], 0), {"type":"MultiPolygon","value":0,"coordinates":[[[[10,9.5],[10,8.5],[10,7.5],[10,6.5],[10,5.5],[10,4.5],[10,3.5],[10,2.5],[10,1.5],[10,0.5],[9.5,0],[8.5,0],[7.5,0],[6.5,0],[5.5,0],[4.5,0],[3.5,0],[2.5,0],[1.5,0],[0.5,0],[0,0.5],[0,1.5],[0,2.5],[0,3.5],[0,4.5],[0,5.5],[0,6.5],[0,7.5],[0,8.5],[0,9.5],[0.5,10],[1.5,10],[2.5,10],[3.5,10],[4.5,10],[5.5,10],[6.5,10],[7.5,10],[8.5,10],[9.5,10],[10,9.5]],[[1.5,2.5],[0.5,1.5],[1.5,0.5],[2.5,1.5],[1.5,2.5]],[[3.5,5.5],[2.5,4.5],[3.5,3.5],[4.5,4.5],[3.5,5.5]],[[2.5,8.5],[1.5,7.5],[2.5,6.5],[3.5,7.5],[2.5,8.5]],[[7.5,8.5],[6.5,7.5],[7.5,6.5],[8.5,7.5],[7.5,8.5]]]]});
});

it("contours(values) returns the expected result for a +Infinity value", () => {
  const c = contours().size([10, 10]).thresholds([0.5]);
  assert.deepStrictEqual(c([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, +Infinity, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, +Infinity, 1, 0, 0, 0, 0,
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

it("contour(values, invalid value) throws an error", () => {
  for (const value of [NaN, null, undefined, "a string"]) {
    assert.throws(() => contours().size([3, 3]).contour([1, 2, 3, 4, 5, 6, 7, 8, 9], value),  /invalid value/);
  }
});

it("contours(values) uses the expected nice thresholds", () => {
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(14)([-149.76192742819748, 321.19300631539585]).map((c) => c.value), [-150, -100, -50, 0, 50, 100, 150, 200, 250, 300]);
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(5)([-149.76192742819748, 321.19300631539585]).map((c) => c.value), [-200, -100, 0, 100, 200, 300]);
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(14)([149.76192742819748, -321.19300631539585]).map((c) => c.value), [-350, -300, -250, -200, -150, -100, -50, 0, 50, 100]);
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(5)([149.76192742819748, -321.19300631539585]).map((c) => c.value), [-400, -300, -200, -100, 0, 100]);
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(12)([-29, 50]).map((c) => c.value), [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45]);
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(10)([-41, 245]).map((c) => c.value), [-50, 0, 50, 100, 150, 200]);
  assert.deepStrictEqual(contours().size([2, 1]).thresholds(9)([-22, 242]).map((c) => c.value), [-50, 0, 50, 100, 150, 200]);
});
