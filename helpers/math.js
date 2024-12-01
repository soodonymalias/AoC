function gcd(a, b) {
  // https://stackoverflow.com/a/17445322
  a = Math.abs(a);
  b = Math.abs(b);
  if (b > a) {var temp = a; a = b; b = temp;}
  while (true) {
    if (b == 0) return a;
    a %= b;
    if (a == 0) return b;
    b %= a;
  }
}

function lcm(values) {
  let curr = 1;
  for (let v of values) {
    if (v == 0) return 0;
    curr = (curr * v) / gcd(curr, v);
  }
  return curr;
}

function intSortAscending(array) {
  array.sort((a, b) => a - b);
  return array;
}

function intSortDescending(array) {
  array.sort((a, b) => b - a);
  return array;
}