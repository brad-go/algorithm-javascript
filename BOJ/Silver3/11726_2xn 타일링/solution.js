const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +fs.readFileSync(filePath).toString().trim();

const solution = (N) => {
  const dp = new Array(N).fill(0);

  dp[0] = 1;
  dp[1] = 2;

  for (let i = 2; i < N; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }

  return dp[N - 1] % 10007;
};

console.log(solution(N));
