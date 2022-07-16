const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(n, wines) {
  const dp = new Array(n).fill(0);

  dp[0] = wines[0];
  dp[1] = wines[0] + wines[1];
  dp[2] = Math.max(dp[1], wines[0] + wines[2], wines[1] + wines[2]);

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      wines[i] + dp[i - 2],
      wines[i] + wines[i - 1] + dp[i - 3]
    );
  }

  console.log(dp[n - 1]);
}

Solution(n, input);
