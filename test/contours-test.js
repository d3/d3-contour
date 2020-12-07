var d3 = require("../"),
    tape = require("tape");

tape("contours(values) returns the expected result for an empty polygon", function(test) {
  var contours = d3.contours().size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});

tape("contours.smooth('linearDual')(values) returns the expected result for an empty polygon", function(test) {
  var contours = d3.contours().smooth('linearDual').size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});



tape("contours(values) returns the expected result for a simple polygon", function(test) {
  var contours = d3.contours().size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});

tape("contours.smooth(false)(values) returns the expected result for a simple polygon", function(test) {
  var contours = d3.contours().smooth(false).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            [6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], // Right edge
            [5.5, 3], [4.5, 3], [3.5, 3], // Top edge
            [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], // Left edge
            [3.5, 8], [4.5, 8], [5.5, 8], // Bottom edge
            [6, 7.5]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth(true)(values) returns the expected result for a simple polygon", function(test) {
  var contours = d3.contours().smooth(true).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            [6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], // Right edge
            [5.5, 3], [4.5, 3], [3.5, 3], // Top edge
            [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], // Left edge
            [3.5, 8], [4.5, 8], [5.5, 8], // Bottom edge
            [6, 7.5]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth('linearDual')(values) returns the expected result for a simple polygon", function(test) {
  var contours = d3.contours().smooth('linearDual').size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            [6, 7], [6, 6], [6, 5], [6, 4], [5.75, 3.25], // Right edge
            [5, 3], [4, 3], [3.25, 3.25], // Top edge
            [3, 4], [3, 5], [3, 6], [3, 7], [3.25, 7.75], // Left edge
            [4, 8], [5, 8], [5.75, 7.75], // Bottom edge
            [6, 7]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours(values).contour(value) returns the expected result for a simple polygon", function(test) {
  var contours = d3.contours().size([10, 10]);
  test.deepEqual(contours.contour([
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
  test.end();
});

tape("contours(values) returns the expected result for a corner polygon", function(test) {
  var contours = d3.contours().size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
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
      "coordinates": [
        [
          [
            [2, 1.5], [2, 0.5], // Right edge
            [1.5, 0], [0.5, 0], // Top edge
            [0, 0.5], [0, 1.5], // Left edge
            [0.5, 2], [1.5, 2], // Bottom edge
            [2, 1.5]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth(false)(values) returns the expected result for a polygon in the corner", function(test) {
  var contours = d3.contours().smooth(false).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
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
      "coordinates": [
        [
          [
            [2, 1.5], [2, 0.5], // Right edge
            [1.5, 0], [0.5, 0], // Top edge
            [0, 0.5], [0, 1.5], // Left edge
            [0.5, 2], [1.5, 2], // Bottom edge
            [2, 1.5]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth('linearDual')(values) returns the expected result for polygon in the corner", function(test) {
  var contours = d3.contours().smooth('linearDual').size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
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
      "coordinates": [
        [
          [
            [2, 1], [1.75, 0.25], // Right edge
            [1, 0], [0.25, 0.25], // Top edge
            [0, 1], [0.25, 1.75], // Left edge
            [1, 2], [1.75, 1.75], // Bottom edge
            [2, 1]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth(false)(values) returns the expected result for a complex polygon", function(test) {
  var contours = d3.contours().smooth(false).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});

tape("contours.smooth(true)(values) returns the expected result for a complex polygon", function(test) {
  var contours = d3.contours().smooth(true).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            [6.25, 7.5], [6.25, 6.5], [6, 5.5], [6.25, 4.5], [6.25, 3.5], // Right edge
            [5.5, 2.75], [4.5, 3], [3.5, 2.75], // Top edge
            [2.75, 3.5], [2.75, 4.5], [3, 5.5], [2.75, 6.5], [2.75, 7.5], // Left edge
            [3.5,  8.25], [4.5,  8], [5.5, 8.25], // Bottom edge
            [6.25, 7.5]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth('linearDual')(values) returns the expected result for a complex polygon", function(test) {
  var contours = d3.contours().smooth('linearDual').size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            [6.25, 7], [6.125, 6], [6.125, 5], [6.25, 4], [5.875, 3.125], // Right edge
            [5, 2.875], [4, 2.875], [3.125, 3.125], // Top edge
            [2.75, 4], [2.875, 5], [2.875, 6], [2.75, 7], [3.125, 7.875], // Left edge
            [4, 8.125], [5, 8.125], [5.875, 7.875], // Bottom edge
            [6.25, 7]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours(values) returns the expected result for a polygon with a hole", function(test) {
  var contours = d3.contours().size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});

tape("contours.smooth(true)(values) returns the expected result for a polygon with a hole", function(test) {
  var contours = d3.contours().smooth(true).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            // Outer polygon, counter-clockwise path
            [6, 7.5], [6, 6.5], [6, 5.5], [6, 4.5], [6, 3.5], // Right edge
            [5.5, 3], [4.5, 3], [3.5, 3], // Top edge
            [3, 3.5], [3, 4.5], [3, 5.5], [3, 6.5], [3, 7.5], // Left edge
            [3.5, 8], [4.5, 8], [5.5, 8], // Bottom edge
            [6, 7.5]
          ],
          [
            // Inner polygon, clockwise path
            [4.5, 7], // Bottom point
            [4, 6.5], [4, 5.5], [4, 4.5], // Left edge
            [4.5, 4], // Top point
            [5, 4.5], [5, 5.5], [5, 6.5], // Right edge
            [4.5, 7]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth('linearDual')(values) returns the expected result for a polygon with a hole", function(test) {
  var contours = d3.contours().smooth('linearDual').size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            // Outer polygon, counter-clockwise path
            [6, 7], [6, 6], [6, 5], [6, 4], [5.75, 3.25], // Right edge
            [5, 3], [4, 3], [3.25, 3.25], // Top edge
            [3, 4], [3, 5], [3, 6], [3, 7], [3.25, 7.75], // Left edge
            [4, 8], [5, 8], [5.75, 7.75], // Bottom edge
            [6, 7]
          ],
          [
            // Inner polygon, clockwise path
            [4.25, 6.75], // Bottom edge
            [4, 6], [4, 5], // Left edge
            [4.25, 4.25], [4.75, 4.25], // Top edge
            [5, 5], [5, 6], // Right edge
            [4.75, 6.75], [4.25, 6.75] // Bottom edge
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours(values) returns the expected result for a multipolygon", function(test) {
  var contours = d3.contours().size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});

tape("contours(values) returns the expected result for a multipolygon with holes", function(test) {
  var contours = d3.contours().size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
  test.end();
});

tape("contours.smooth(false)(values) returns the expected result for a multipolygon with holes", function(test) {
  var contours = d3.contours().smooth(false).size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            // Outer left polygon, counter-clockwise path
            [4, 5.5], [4, 4.5], [4, 3.5], // Right edge
            [3.5, 3], [2.5, 3], [1.5, 3], // Top edge
            [1, 3.5], [1, 4.5], [1, 5.5], // Left edge
            [1.5, 6], [2.5, 6], [3.5, 6], // Bottom edge
            [4,5.5]
          ],
          [
            // Inner left polygon, clockwise path
            [2.5, 5], // Bottom
            [2, 4.5], // Left
            [2.5, 4], // Top
            [3, 4.5], // Right
            [2.5, 5]
          ]
        ],
        [
          [
            // Outer right polygon, counter-clockwise path
            [8, 5.5], [8, 4.5], [8, 3.5], // Right edge
            [7.5, 3], [6.5, 3], [5.5, 3], // Top edge
            [5, 3.5], [5, 4.5], [5, 5.5], // Left edge
            [5.5, 6], [6.5, 6], [7.5, 6], // Bottom edge
            [8, 5.5]
          ],
          [
            // Inner right polygon, clockwise path
            [6.5, 5], // Bottom
            [6, 4.5], // Left
            [6.5, 4], // Top
            [7, 4.5], // Right
            [6.5, 5]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.smooth('linearDual')(values) returns the expected result for a multipolygon with holes", function(test) {
  var contours = d3.contours().smooth('linearDual').size([10, 10]).thresholds([0.5]);
  test.deepEqual(contours([
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
          [
            // Outer left polygon, counter-clockwise path
            [4, 5], [4, 4], // Right edge
            [3.75, 3.25], [3, 3], [2, 3], [1.25, 3.25], // Top edge
            [1, 4], [1, 5], // Left edge
            [1.25, 5.75], [2, 6], [3, 6], [3.75, 5.75], // Bottom edge
            [4, 5]
          ],
          [
            // Inner left polygon, clockwise path
            [2.25, 4.75], // Bottom-left
            [2.25, 4.25], // Top-left
            [2.75, 4.25], // Top-right
            [2.75, 4.75], // Bottom-right
            [2.25, 4.75]
          ]
        ],
        [
          [
            // Outer right polygon, counter-clockwise path
            [8, 5], [8, 4], // Right edge
            [7.75, 3.25], [7, 3], [6, 3], [5.25, 3.25], // Top edge
            [5, 4], [5, 5], // Left edge
            [5.25, 5.75], [6, 6], [7, 6], [7.75, 5.75], // Bottom edge
            [8, 5]
          ],
          [
            // Inner right polygon, clockwise path
            [6.25, 4.75], // Bottom-left
            [6.25, 4.25], // Top-left
            [6.75, 4.25], // Top-right
            [6.75, 4.75], // Bottom-right
            [6.25, 4.75]
          ]
        ]
      ]
    }
  ]);
  test.end();
});

tape("contours.size(…) validates the specified size", function(test) {
  test.deepEqual(d3.contours().size([1, 2]).size(), [1, 2]);
  test.deepEqual(d3.contours().size([0, 0]).size(), [0, 0]);
  test.deepEqual(d3.contours().size([1.5, 2.5]).size(), [1, 2]);
  try {
    d3.contours().size([0, -1]);
    test.fail();
  } catch (error) {
    test.equal(error.message, "invalid size");
  }
  test.end();
});
