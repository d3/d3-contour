# d3-contour

Compute contour polygons using marching squares.

[<img alt="Contour Plot" src="https://raw.githubusercontent.com/d3/d3-contour/master/img/volcano.gif" width="420" height="295">](https://bl.ocks.org/mbostock/4241134)

[<img alt="Contour Plot II" src="https://raw.githubusercontent.com/d3/d3-contour/master/img/goldstein-price.png" width="420" height="219">](https://bl.ocks.org/mbostock/f48ff9c1af4d637c9a518727f5fdfef5)[<img alt="Contour Plot III" src="https://raw.githubusercontent.com/d3/d3-contour/master/img/sin-cos.png" width="420" height="219">](https://bl.ocks.org/mbostock/bf2f5f02b62b5b3bb92ae1b59b53da36)

## Installing

If you use NPM, `npm install d3-contour`. Otherwise, download the [latest release](https://github.com/d3/d3-contour/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-contour.v1.min.js) or as part of [D3 4.0](https://github.com/d3/d3). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-contour.v1.min.js"></script>
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

Constructs a new contour generator with the default settings.

<a name="_contours" href="#_contours">#</a> <i>contours</i>(<i>values</i>) [<>](https://github.com/d3/d3-contour/blob/master/src/contours.js#L34 "Source")

Computes the contours for the given array of *values*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects). Each geometry object represents the area where the input <i>values</i> area greater than or equal to the corresponding [threshold value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. For example, to construct a 256×256 grid for the [Goldstein–Price function](https://en.wikipedia.org/wiki/Test_functions_for_optimization) where -2 ≤ <i>x</i> ≤ 2 and -2 ≤ <i>y</i> ≤ 1:

```js
var n = 256, m = 256, values = new Array(n * m);
for (var j = 0.5, k = 0; j < m; ++j) {
  for (var i = 0.5; i < n; ++i, ++k) {
    values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
  }
}

function goldsteinPrice(x, y) {
  return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
      * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
}
```

The returned geometry objects are typically passed to [d3.geoPath](https://github.com/d3/d3-geo/blob/master/README.md#geoPath) to display, using null or [d3.geoIdentity](https://github.com/d3/d3-geo/blob/master/README.md#geoIdentity) as the associated projection.

<a name="contours_size" href="#contours_size">#</a> <i>contours</i>.<b>size</b>([<i>size</i>]) [<>](https://github.com/d3/d3-contour/blob/master/src/contours.js#L185 "Source")

If *size* is specified, sets the expected size of the input *values* grid to the [contour generator](#_contour) and returns the contour generator. The *size* is specified as an array \[<i>n</i>, <i>m</i>\] where <i>n</i> is the number of columns in the grid and <i>m</i> is the number of rows; *n* and *m* must be positive integers. If *size* is not specified, returns the current size which defaults to [1, 1].

<a name="contours_smooth" href="#contours_smooth">#</a> <i>contours</i>.<b>smooth</b>([<i>smooth</i>]) [<>](https://github.com/d3/d3-contour/blob/master/src/contours.js#L196 "Source")

If *smooth* is specified, sets whether or not the generated contour polygons are smoothed using linear interpolation. If *smooth* is not specified, returns the current smoothing flag, which defaults to true.

<a name="contours_thresholds" href="#contours_thresholds">#</a> <i>contours</i>.<b>thresholds</b>([<i>thresholds</i>]) [<>](https://github.com/d3/d3-contour/blob/master/src/contours.js#L192 "Source")

If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](https://github.com/d3/d3-array/blob/master/README.md#thresholdSturges).

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first [generated contour](#_contour) corresponds to the area where the input values are greater than or equal to *x0*; the second contour corresponds to the area where the input values are greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value.

If a *count* is specified instead of an array of *thresholds*, then the input values’ [extent](https://github.com/d3/d3-array/blob/master/README.md#extent) will be uniformly divided into approximately *count* bins; see [d3.ticks](https://github.com/d3/d3-array/blob/master/README.md#ticks).
