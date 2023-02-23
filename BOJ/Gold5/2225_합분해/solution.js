const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number); // prettier-ignore

const solution = (N, K) => {
  const dp = Array.from(Array(K + 1), () => Array(N + 1).fill(1));
  const mod = 1_000_000_000;

  for (let i = 2; i <= K; i++) {
    for (let j = 1; j <= N; j++) {
      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % mod;
    }
  }

  return dp[K][N] % mod;
};

console.log(solution(N, K));
