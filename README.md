# d3-contour

…

## Installing

If you use NPM, `npm install d3-contour`. Otherwise, download the [latest release](https://github.com/d3/d3-contour/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-contour.v0.0.min.js) or as part of [D3 4.0](https://github.com/d3/d3). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-contour.v0.0.min.js"></script>
<script>

// Populate a grid of n×m values where -2 ≤ x ≤ 2 and -2 ≤ y ≤ 1.
var n = 256, m = 256, values = new Array(n * m);
for (var j = 0.5, k = 0; j < m; ++j) {
  for (var i = 0.5; i < n; ++i, ++k) {
    values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
  }
}

// Compute the contour polygons at log-spaced intervals; returns an array of MultiPolygon.
var contours = d3.contours()
    .size([n, m])
    .thresholds(d3.range(2, 21).map(p => Math.pow(2, p)))
    (values);

// See https://en.wikipedia.org/wiki/Test_functions_for_optimization
function goldsteinPrice(x, y) {
  return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
      * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
}

</script>
```

[Try d3-contour in your browser.](https://tonicdev.com/npm/d3-contour)

## API Reference

<a name="contours" href="#contours">#</a> d3.<b>contours</b>() [<>](https://github.com/d3/d3-contour/blob/master/src/contours.js "Source")

…

<a name="_contours" href="#_contours">#</a> <i>contours</i>(<i>values</i>)

…

<a name="contours_size" href="#contours_size">#</a> <i>contours</i>.<b>size</b>([<i>size</i>])

…

<a name="contours_smooth" href="#contours_smooth">#</a> <i>contours</i>.<b>smooth</b>([<i>smooth</i>])

…

<a name="contours_thresholds" href="#contours_thresholds">#</a> <i>contours</i>.<b>thresholds</b>([<i>thresholds</i>])

…
