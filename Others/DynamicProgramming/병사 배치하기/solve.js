const [n, ...soldiers] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, soldiers) {
  const dp = new Array(n).fill(0);

  let count = 0;
  for (let i = 1; i < n; i++) {
    if (soldiers[i] > soldiers[i - 1]) count++;

    dp[i] = count;
  }

  console.log(dp);
}

Solution(n, soldiers);
