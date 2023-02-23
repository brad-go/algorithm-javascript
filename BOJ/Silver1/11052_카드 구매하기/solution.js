const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const cards = input[1].split(" ").map(Number);

const solution = (N, cards) => {
  const dp = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] = Math.max(dp[i], cards[j - 1] + dp[i - j]);
    }
  }

  return dp[N];
};

console.log(solution(N, cards));
