const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(n, stair) {
  const dp = new Array(n).fill(0);

  dp[0] = stair[0];
  dp[1] = Math.max(stair[0] + stair[1], stair[1]);
  dp[2] = Math.max(stair[0] + stair[2], stair[1] + stair[2]);

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(stair[i] + dp[i - 2], stair[i] + stair[i - 1] + dp[i - 3]);
  }

  console.log(dp[n - 1]);
}

Solution(n, input);
