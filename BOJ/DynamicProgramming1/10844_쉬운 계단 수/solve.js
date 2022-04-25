const input = Number(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(n) {
  const BILLION = 1000000000;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 9;

  for (let i = 2; i < n + 1; i++) {
    dp[i] = (dp[i - 1] * 2 - (i - 1)) % BILLION;
  }

  console.log(dp[n]);
}

Solution(input);
