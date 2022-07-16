const [t, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(input) {
  input.forEach((n) => {
    const dp = new Array(n + 1).fill(0);

    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;

    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 2] + dp[i - 3];
    }

    console.log(dp[n]);
  });
}

Solution(input);
