const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const advices = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, advices) => {
  const dp = new Array(N).fill(0);
  const [lastAdiveTime, lastAdivePrice] = advices[N - 1];

  dp[N - 1] = lastAdiveTime === 1 ? lastAdivePrice : 0;

  for (let i = N - 2; i >= 0; i--) {
    const [time, price] = advices[i];

    dp[i] =
      i + time > N
        ? dp[i + 1]
        : Math.max((dp[i + time] || 0) + price, dp[i + 1]);
  }

  return dp[0];
};

console.log(solution(N, advices));
