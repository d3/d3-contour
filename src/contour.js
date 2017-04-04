var DX = [1,0,1,1,-1,0,-1,1,0,0,0,0,-1,0,-1,NaN], // marching direction lookup
    DY = [0,-1,0,0,0,-1,0,0,1,-1,1,1,0,-1,0,NaN];

export default function(test, start) {
  var s = start || findStart(test),
      c = [],    // contour polygon
      x = s[0],  // current x position
      y = s[1],  // current y position
      dx = 0,    // next x direction
      dy = 0,    // next y direction
      pdx = NaN, // previous x direction
      pdy = NaN, // previous y direction
      i = 0;

  do {
    // determine marching squares index
    i = 0;
    if (test(x - 1, y - 1)) i += 1;
    if (test(x, y - 1)) i += 2;
    if (test(x - 1, y)) i += 4;
    if (test(x, y)) i += 8;

    // determine next direction
    if (i === 6) {
      dx = pdy === -1 ? -1 : 1;
      dy = 0;
    } else if (i === 9) {
      dx = 0;
      dy = pdx === 1 ? -1 : 1;
    } else {
      dx = DX[i];
      dy = DY[i];
    }

    // update contour polygon
    if (dx != pdx && dy != pdy) {
      c.push([x, y]);
      pdx = dx;
      pdy = dy;
    }

    x += dx;
    y += dy;
  } while (s[0] != x || s[1] != y);

  return c;
}

// search for a starting point; begin at origin
// and proceed along outward-expanding diagonals
function findStart(test) {
  var x = 0,
      y = 0;
  while (!test(x, y)) {
    if (x === 0) {
      x = y + 1;
      y = 0;
    } else {
      x = x - 1;
      y = y + 1;
    }
  }
  return [x, y];
}
