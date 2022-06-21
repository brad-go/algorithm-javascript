// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const paper = input.map((row) => row.split(" ").map(Number));

const solution = (N, paper) => {
  const paperColors = {
    white: 0,
    blue: 0,
  };

  dividePaper(0, 0, N, paper, paperColors);
  console.log(paperColors.white);
  console.log(paperColors.blue);
};

const dividePaper = (x, y, size, paper, paperColors) => {
  if (checkColor(x, y, size, paper)) {
    paper[x][y] === 0 ? paperColors.white++ : paperColors.blue++;
    return;
  }

  const half = size / 2;

  dividePaper(x, y, half, paper, paperColors);
  dividePaper(x, y + half, half, paper, paperColors);
  dividePaper(x + half, y, half, paper, paperColors);
  dividePaper(x + half, y + half, half, paper, paperColors);
};

const checkColor = (x, y, size, paper) => {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== paper[x][y]) return false;
    }
  }

  return true;
};

solution(N, paper);
