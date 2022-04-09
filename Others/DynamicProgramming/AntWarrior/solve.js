const [n, ...food] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

// 상향식 풀이
function Solution(n, food) {
  const dp = new Array(n);
  dp[0] = food[0];
  dp[1] = Math.max(food[0], food[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + food[i]);
  }

  console.log(Math.max(...dp));
}

Solution(n, food);
