const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    const cur = arr[i];
    const values = [1];

    for (let j = 0; j < i; j++) {
      const prev = arr[j];

      if (cur > prev) values.push(dp[j] + 1);
    }

    dp[i] = Math.max(...values);
  }
  console.log(Math.max(...dp));
}

Solution(n, input);
