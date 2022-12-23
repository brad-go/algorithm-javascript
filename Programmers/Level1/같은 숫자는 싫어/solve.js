const arr = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (arr) => {
  return arr.filter((num, index) => num !== arr[index + 1]);
};

console.log(solution(arr));
