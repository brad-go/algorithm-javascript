const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input5.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const costs = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, costs) => {
  for (let i = 1; i < N; i++) {
    costs[i][0] += Math.min(costs[i - 1][1], costs[i - 1][2]);
    costs[i][1] += Math.min(costs[i - 1][0], costs[i - 1][2]);
    costs[i][2] += Math.min(costs[i - 1][0], costs[i - 1][1]);
  }

  return Math.min(...dp[N - 1]);
};

console.log(solution(N, costs));
