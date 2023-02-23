const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +fs.readFileSync(filePath).toString().trim();

const solution = (N) => {
  const dp = Array.from(Array(N + 1), () => Array(3).fill(1));
  const mod = 9901;

  for (let i = 2; i <= N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % mod;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][1]) % mod;
    dp[i][2] = dp[i][1];
  }

  return dp[N].reduce((acc, cur) => acc + cur, 0) % mod;
};

console.log(solution(N));
