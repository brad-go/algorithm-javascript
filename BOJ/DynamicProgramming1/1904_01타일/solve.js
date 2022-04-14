const input = Number(
  require("fs").readFileSync("./input.txt").toString().trim()
);

function Solution(n) {
  const dp = new Array(n + 1).fill(-1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 0; i < dp.length; i++) {
    if (dp[i] === -1) {
      dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
    }
  }

  console.log(dp[n]);
}

Solution(input);
