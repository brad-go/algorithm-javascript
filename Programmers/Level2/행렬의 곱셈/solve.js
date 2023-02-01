const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const division = input.findIndex((value) => value === "");
const arr1 = input.slice(0, division).map((str) => str.split(" ").map(Number));
const arr2 = input.slice(division + 1).map((str) => str.split(" ").map(Number));

const solution = (arr1, arr2) => {
  return arr1.map((row) => {
    return arr2[0].map((_, n) => {
      return row.reduce((acc, cur, k) => acc + cur * arr2[k][n], 0);
    });
  });
};

console.log(solution(arr1, arr2));
