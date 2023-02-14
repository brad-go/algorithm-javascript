const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...U] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number); // prettier-ignore

const solution = (N, U) => {
  const numbers = U.sort((a, b) => b - a);
  const sumSet = new Set();

  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      sumSet.add(numbers[i] + numbers[j]);
    }
  }

  for (const a of numbers) {
    for (const b of numbers) {
      if (sumSet.has(a - b)) return a;
    }
  }
};

console.log(solution(N, U));
