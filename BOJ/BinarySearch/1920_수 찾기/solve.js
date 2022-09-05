const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const numbers = new Set(input[1].split(" ").map(Number)); // prettier-ignore
const targets = input[3].split(" ").map(Number);

function solution(numbers, targets) {
  const answer = targets.map((target) => (numbers.has(target) ? 1 : 0));
  return answer.join("\n");
}

console.log(solution(numbers, targets));
