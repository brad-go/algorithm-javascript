const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const N = Number(n);
  const pole = input
    .map((line) => line.split(" ").map((v) => +v))
    .sort((a, b) => a[0] - b[0]);

  const dp = new Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (pole[j][1] < pole[i][1]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  const answer = N - Math.max(...dp);
  console.log(answer);
}

Solution(n, input);
