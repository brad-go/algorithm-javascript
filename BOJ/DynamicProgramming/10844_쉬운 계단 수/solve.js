const input = Number(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(n) {
  const BILLION = 1000000000;
  const MAX_NATURAL_NUM = 9;

  const dp = Array.from(Array(n), () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  dp[0] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= MAX_NATURAL_NUM; j++) {
      dp[i][j] = (dp[i - 1][j - 1] || 0) + ((dp[i - 1][j + 1] || 0) % BILLION);
    }
  }

  const answer = dp[n - 1].reduce((acc, cur) => (acc + cur) % BILLION, 0);
  console.log(answer % BILLION);
}

Solution(input);
