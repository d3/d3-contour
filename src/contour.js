var DX = [1,0,1,1,-1,0,-1,1,0,0,0,0,-1,0,-1,NaN], // marching direction lookup
    DY = [0,-1,0,0,0,-1,0,0,1,-1,1,1,0,-1,0,NaN];

export default function(test, start) {
  // if (start == null) start = findStart(test);

  var points = [],
      x = +start[0],
      y = +start[1],
      dx = 0,
      dy = 0,
      dx0 = NaN,
      dy0 = NaN,
      i;

  // Determine marching squares index.
  do {
    i = 0;
    if (test(x - 1, y - 1)) i += 1;
    if (test(x, y - 1)) i += 2;
    if (test(x - 1, y)) i += 4;
    if (test(x, y)) i += 8;

    // Determine next direction.
    if (i === 6) {
      dx = dy0 === -1 ? -1 : 1;
      dy = 0;
    } else if (i === 9) {
      dx = 0;
      dy = dx0 === 1 ? -1 : 1;
    } else {
      dx = DX[i];
      dy = DY[i];
    }

    points.push([x, y]);
    x += dx0 = dx;
    y += dy0 = dy;
  } while (start[0] !== x || start[1] !== y);

  return points;
}

// // Search for a starting point; begin at origin and proceed along outward-expanding diagonals.
// function findStart(test) {
//   var x = 0,
//       y = 0;
//   while (!test(x, y)) {
//     if (x === 0) {
//       x = y + 1;
//       y = 0;
//     } else {
//       x = x - 1;
//       y = y + 1;
//     }
//   }
//   return [x, y];
// }
