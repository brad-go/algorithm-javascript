const input = Number(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(x) {
  const dp = new Array(x + 1).fill(0);

  for (let i = 2; i < x + 1; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }

  console.log(dp[x]);
}

Solution(input);
