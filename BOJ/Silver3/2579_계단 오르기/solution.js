const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...scores] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number); // prettier-ignore

const solution = (N, scores) => {
  const dp = new Array(N).fill(0);

  dp[0] = scores[0];
  dp[1] = scores[0] + scores[1];
  dp[2] = Math.max(scores[0] + scores[2], scores[1] + scores[2]);

  for (let i = 0; i < N; i++) {
    dp[i] =
      scores[i] +
      Math.max(dp[i - 2] || 0, (scores[i - 1] || 0) + (dp[i - 3] || 0));
  }

  return dp[N - 1];
};

console.log(solution(N, scores));
