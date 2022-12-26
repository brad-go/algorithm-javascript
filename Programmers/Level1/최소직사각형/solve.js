const sizes = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ').map(Number)); // prettier-ignore

const solution = (sizes) => {
  const maxWidth = Math.max(
    ...sizes.map(([width, height]) => Math.max(width, height))
  );
  const maxHeight = Math.max(
    ...sizes.map(([width, height]) => Math.min(width, height))
  );

  return maxWidth * maxHeight;
};

console.log(solution(sizes));
