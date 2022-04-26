const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const dp = Array.from(Array(n), () => []);
  dp[0][0] = arr[0];

  for (let i = 1; i < n; i++) {
    const prev = dp[i - 1];
    dp[i] = prev;

    if (arr[i] > prev[prev.length - 2] && arr[i] < prev[prev.length - 1]) {
      dp[i] = prev
        .filter((num) => num !== prev[prev.length - 1])
        .concat(arr[i]);
    }

    if (arr[i] > prev[prev.length - 1]) dp[i] = prev.concat(arr[i]);

    console.log(dp);
  }

  console.log(dp[n - 1].length);
}

Solution(n, input);
