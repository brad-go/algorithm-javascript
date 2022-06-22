// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const paper = input.map((row) => row.split(" "));

const solution = (N, paper) => {
  const counts = {
    "-1": 0,
    0: 0,
    1: 0,
  };

  devidePaper(0, 0, N, paper, counts);

  console.log(counts[-1] + "\n" + counts[0] + "\n" + counts[1]);
};

const devidePaper = (x, y, size, paper, counts) => {
  if (isSameNumbers(x, y, size, paper)) {
    counts[paper[x][y]]++;
    return;
  }

  const third = size / 3;

  for (let i = 0; i < 9; i++) {
    const auxX = Math.floor(i / 3) * third;
    const auxY = (i % 3) * third;

    devidePaper(x + auxX, y + auxY, third, paper, counts);
  }
};

const isSameNumbers = (x, y, size, paper) => {
  const fiducialValue = paper[x][y];

  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== fiducialValue) return false;
    }
  }

  return true;
};

solution(N, paper);
