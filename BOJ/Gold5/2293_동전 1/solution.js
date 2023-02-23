const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [NK, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, K] = NK.split(" ").map(Number);
const coins = input.map(Number);

const solution = (N, K, coins) => {
  const dp = new Array(K + 1).fill(0);

  dp[0] = 1;

  coins.forEach((coin) => {
    for (let i = coin; i <= K; i++) {
      dp[i] += dp[i - coin];
    }
  });

  return dp[K];
};

console.log(solution(N, K, coins));
