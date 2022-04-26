const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

// function Solution(n, arr) {
//   const dp = new Array(n).fill(1);

//   for (let i = 1; i < n; i++) {
//     const cur = arr[i];
//     const values = [1];

//     for (let j = 0; j < i; j++) {
//       const prev = arr[j];

//       if (cur > prev) values.push(dp[j] + 1);
//     }

//     dp[i] = Math.max(...values);
//   }
//   console.log(Math.max(...dp));
// }

// Solution(n, input);

// Solution 2

// function Solution(n, arr) {
//   const dp = [];

//   for (let i = 0; i < n; i++) {
//     dp[i] = 1;
//     for (let j = 0; j < i; j++) {
//       console.log(`j, i: ${j},${i}`);
//       console.log(arr[j], arr[i]);
//       console.log(dp[i], dp[j]);
//       if (arr[j] < arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
//       console.log(dp);
//     }
//     console.log("---");
//   }

//   console.log(Math.max(...dp));
// }

// Solution(n, input);

// Solution 2

function Solution(n, arr) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  console.log(Math.max(...dp));
}

Solution(n, input);
