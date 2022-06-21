// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const map = input.map((row) => row.split("").map((v) => +v));
let result = "";

const solution = (N) => {
  compress(0, 0, N);
  console.log(result);
};

const compress = (x, y, size) => {
  if (size === 1 || checkData(x, y, size)) {
    result += map[x][y];
    return;
  }

  const half = size / 2;

  result += "(";

  compress(x, y, half);
  compress(x, y + half, half);
  compress(x + half, y, half);
  compress(x + half, y + half, half);

  result += ")";
};

const checkData = (x, y, size) => {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (map[i][j] !== map[x][y]) return false;
    }
  }
  return true;
};

solution(N);
