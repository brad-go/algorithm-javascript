const n = Number(require("fs").readFileSync("./input.txt").toString().trim());

// 상향식 풀이
function Solution(n) {
  const dp = new Array(n).fill(0);

  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + 1;

    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    if (i % 5 === 0) dp[i] = Math.min(dp[i], dp[i / 5] + 1);
  }

  console.log(dp);
}

Solution(n);
