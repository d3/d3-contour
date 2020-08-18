var d3 = require("../"),
    tape = require("tape");

tape("density.size(…) validates the specified size", function(test) {
  test.deepEqual(d3.contourDensity().size([1, 2]).size(), [1, 2]);
  test.deepEqual(d3.contourDensity().size([0, 0]).size(), [0, 0]);
  test.deepEqual(d3.contourDensity().size([1.5, 2.5]).size(), [1.5, 2.5]);
  try {
    d3.contourDensity().size([0, -1]);
    test.fail();
  } catch (error) {
    test.equal(error.message, "invalid size");
  }
  test.end();
});
