# d3-contour

…

## Installing

If you use NPM, `npm install d3-contour`. Otherwise, download the [latest release](https://github.com/d3/d3-contour/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-contour.v0.0.min.js) or as part of [D3 4.0](https://github.com/d3/d3). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-contour.v0.0.min.js"></script>
<script>

var points = d3.contour(geq(0));

function geq(value) {
  return function(i, j) {
    return i >= 0
        && j >= 0
        && i < width
        && j < height
        && values[i + j * width] >= value;
  };
}

</script>
```

[Try d3-contour in your browser.](https://tonicdev.com/npm/d3-contour)

## API Reference

<a name="contour" href="#contour">#</a> d3.<b>contour</b>(<i>test</i>[, <i>start</i>]) [<>](https://github.com/d3/d3-contour/blob/master/src/contour.js "Source")

…
