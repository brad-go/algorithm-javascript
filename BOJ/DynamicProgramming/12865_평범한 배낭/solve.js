const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// function Solution(input) {
//   const [N, K] = input
//     .shift()
//     .split(" ")
//     .map((v) => +v);
//   const items = input.map((item) => item.split(" ").map((v) => +v));
//   items.unshift([0, 0]);

//   const dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));

//   for (let i = 1; i <= N; i++) {
//     const [curWeight, curValue] = items[i];

//     for (let j = 1; j <= K; j++) {
//       dp[i][j] = dp[i - 1][j];

//       if (curWeight <= j && curValue + dp[i - 1][j - curWeight] > dp[i - 1][j])
//         dp[i][j] = curValue + dp[i - 1][j - curWeight];
//     }
//   }

//   console.log(dp[N][K]);
// }

// Solution(input);

function Solution(input) {
  const [N, K] = input
    .shift()
    .split(" ")
    .map((v) => +v);
  const items = input.map((item) => item.split(" ").map((v) => +v));
  items.unshift([0, 0]);

  const dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    const [curWeight, curValue] = items[i];

    for (let j = 1; j <= K; j++) {
      dp[i][j] = dp[i - 1][j];

      if (curWeight <= j)
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - curWeight] + curValue);
    }
  }

  console.log(dp[N][K]);
}

Solution(input);
