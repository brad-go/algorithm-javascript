const [n, ...input] = require("fs")
  .readFileSync("./input5.txt")
  .toString()
  .trim()
  .split("\n");

// function Solution(n, input) {
//   const costs = input.map((cost) => cost.split(" ").map((v) => +v));

//   const dp = Array.from(Array(n + 1), () => Array(3).fill(0));
//   dp[1] = costs[0];

//   for (let i = 2; i <= n; i++) {
//     dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i - 1][0];
//     dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i - 1][1];
//     dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i - 1][2];
//   }
//   console.log(Math.min(...dp[n]));
// }

// Solution(Number(n), input);

function Solution(n, input) {
  const dp = input.map((costs) => costs.split(" ").map((cost) => +cost));

  for (let i = 1; i < n; i++) {
    dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1]);
  }
  console.log(Math.min(...dp[n - 1]));
}

Solution(Number(n), input);
