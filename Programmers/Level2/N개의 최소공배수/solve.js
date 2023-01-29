const arr = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (arr) => {
  return arr.reduce((a, b) => (a * b) / euclidean(a, b));
};

const euclidean = (a, b) => {
  return a % b ? euclidean(b, a % b) : b;
};

console.log(solution(arr));
