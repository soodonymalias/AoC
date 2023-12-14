function rotateClockwise(array) {
  let lenI = array.length;
  let lenJ = array[0].length;
  let out = new Array(lenJ);
  for (let x = 0; x < lenJ; x++) {
    out[x] = new Array(lenI);
  }
  for (let i = 0; i < lenI; i++) {
    for (let j = 0; j < lenJ; j++) {
      out[j][lenI-i-1] = array[i][j];
    }
  }
  return out;
}

function rotateCounterClockwise(array) {
  let lenI = array.length;
  let lenJ = array[0].length;
  let out = new Array(lenJ);
  for (let x = 0; x < lenJ; x++) {
    out[x] = new Array(lenI);
  }
  for (let i = 0; i < lenI; i++) {
    for (let j = 0; j < lenJ; j++) {
      out[lenJ-j-1][i] = array[i][j];
    }
  }
  return out;
}