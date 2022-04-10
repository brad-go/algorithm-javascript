const [n, ...soldiers] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, soldiers) {
  soldiers.reverse();

  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (soldiers[j] < soldiers[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
      console.log(dp);
    }
  }

  console.log(n - Math.max(...dp));
}

Solution(n, soldiers);

// function Solution(n, soldiers) {
//   const dp = new Array(n).fill(0);

//   let count = 0;
//   for (let i = 1; i < n; i++) {
//     if (soldiers[i] > soldiers[i - 1]) count++;

//     dp[i] = count;
//   }

//   console.log(dp);
// }

// Solution(n, soldiers);
