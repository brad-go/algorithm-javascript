const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const triangle = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, triangle) => {
  const dp = [...triangle.map((numbers) => [...numbers])];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i + 1; j++) {
      dp[i][j] += Math.max(dp[i - 1][j - 1] || 0, dp[i - 1][j] || 0);
    }
  }

  return Math.max(...dp[N - 1]);
};

console.log(solution(N, triangle));
