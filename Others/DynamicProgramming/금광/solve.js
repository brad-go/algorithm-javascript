const [t, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(t, input) {
  for (let tc = 0; tc < t; tc++) {
    const [n, m] = input
      .shift()
      .split(" ")
      .map((v) => +v);
    const golds = input
      .shift()
      .split(" ")
      .map((v) => +v);

    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
      dp[i] = new Array(m).fill().map((_, idx) => golds[idx + i * 4]);
    }

    for (let i = 1; i < m; i++) {
      for (let j = 0; j < n; j++) {
        let leftUp = 0;
        let leftDown = 0;
        let left = dp[j][i - 1];

        if (j !== 0) leftUp = dp[j - 1][i - 1];
        if (j !== n - 1) leftDown = dp[j + 1][i - 1];

        dp[j][i] = dp[j][i] + Math.max(leftUp, left, leftDown);
      }
    }

    let result = 0;

    for (let i = 0; i < n; i++) {
      result = Math.max(result, dp[i][m - 1]);
    }
    console.log(result);
  }
}

Solution(t, input);

// 내 풀이
// function Solution(t, input) {
//   for (let i = 0; i < t; i++) {
//     const [n, m] = input
//       .shift()
//       .split(" ")
//       .map((v) => +v);
//     const golds = input
//       .shift()
//       .split(" ")
//       .map((v) => +v);

//     const goldMine = new Array(n).fill(0);

//     for (let j = 0; j < n; j++) {
//       goldMine[j] = [];
//       for (let k = j * 4; k < j * 4 + 4; k++) {
//         goldMine[j].push(golds[k]);
//       }
//     }

//     const dp = Array.from(Array(n), () => Array(m).fill(0));

//     for (let j = 0; j < n; j++) {
//       dp[j][0] = goldMine[j][0];
//     }

//     for (let j = 1; j < m; j++) {
//       for (let k = 0; k < n; k++) {
//         let top = 0;
//         let bottom = 0;

//         if (k - 1 >= 0) top = dp[k - 1][j - 1] || 0;
//         if (k + 1 < n) bottom = dp[k + 1][j - 1] || 0;

//         const max = Math.max(top, dp[k][j - 1] || 0, bottom);
//         dp[k][j] = max + goldMine[k][j];
//       }
//     }

//     let max = dp[0][m - 1];
//     for (let j = 1; j < n; j++) {
//       if (max < dp[j][m - 1]) max = dp[j][m - 1];
//     }
//     console.log(max);
//   }
// }

// Solution(t, input);
