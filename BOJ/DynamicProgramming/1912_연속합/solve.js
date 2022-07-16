const [n, ...input] = require("fs")
  .readFileSync("./input5.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const dp = new Array(n).fill(0);
  dp[0] = arr[0];

  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
  }

  console.log(Math.max(...dp));
}

Solution(n, input);
