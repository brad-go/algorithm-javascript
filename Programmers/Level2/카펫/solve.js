const [brown, yellow] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (brown, yellow) => {
  for (let col = 3; col <= Math.floor((brown + yellow) / col); col++) {
    const row = Math.floor((brown + yellow) / col);

    if ((row - 2) * (col - 2) === yellow) {
      return [row, col];
    }
  }

  return [0, 0];
};

console.log(solution(brown, yellow));
