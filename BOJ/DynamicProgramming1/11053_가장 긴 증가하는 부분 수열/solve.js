const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const dp = new Array(n).fill(1);
  dp[0] = arr[0];

  for (let i = 1; i < n; i++) {
    if (arr[i] > dp[i - 1]) dp[i] = arr[i];
    else dp[i] = dp[i - 1];
  }

  const answer = [...new Set(dp)].length;
  console.log(answer);
}

Solution(n, input);
