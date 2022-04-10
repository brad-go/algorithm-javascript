const [n, m, ...currency] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, m, currency) {
  const dp = new Array(m + 1).fill(m + 1);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    for (let j = currency[i]; j < m + 1; j++) {
      if (dp[j - currency[i]] !== m + 1)
        dp[j] = Math.min(dp[j], dp[j - currency[i]] + 1);
    }
  }

  console.log(dp[m] === m + 1 ? -1 : dp[m]);
}

Solution(n, m, currency);
