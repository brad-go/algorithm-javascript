const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const dp = new Array(n);

  for (let i = 0; i < n; i++) {
    dp[i] = input[i].split(" ").map((v) => +v);
  }

  for (let i = 1; i < n; i++) {
    const len = dp[i].length;

    for (let j = 0; j < len; j++) {
      if (j === 0) dp[i][j] += dp[i - 1][j];
      if (j === len - 1) dp[i][j] += dp[i - 1][j - 1];

      if (1 <= j && j < len - 1) {
        dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
      }
    }
  }

  const answer = Math.max(...dp[dp.length - 1]);
  console.log(answer);
}

Solution(n, input);
