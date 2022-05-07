const input = Number(
  require("fs").readFileSync("./input.txt").toString().trim()
);

function Solution(n) {
  const devideNumber = 1000000007;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  dp[1] = 2;

  for (let i = 2; i < n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % devideNumber;
  }

  console.log(dp[n - 1]);
}

Solution(input);
