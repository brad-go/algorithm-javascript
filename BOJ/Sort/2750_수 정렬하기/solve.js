const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(input) {
  const answer = input.sort((a, b) => a - b);
  answer.forEach((num) => console.log(num));
}

Solution(input);
