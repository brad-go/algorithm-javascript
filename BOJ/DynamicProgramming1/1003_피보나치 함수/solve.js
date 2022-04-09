const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

// 상향식
// function Solution(input) {
//   for (let n of input) {
//     const dp = new Array(n + 1).fill(-1);
//     dp[0] = 0;
//     dp[1] = 1;

//     for (let i = 2; i <= n; i++) {
//       dp[i] = dp[i - 1] + dp[i - 2];
//     }

//     if (n === 0) dp.reverse();
//     console.log(dp[dp.length - 2], dp[dp.length - 1]);
//   }
// }

// Solution(input);

// 하향식
function Solution(input) {
  for (let n of input) {
    const dp = new Array(n + 1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;

    const fibonacci = (n) => {
      if (dp[n] === -1) {
        dp[n] = fibonacci(n - 1) + fibonacci(n - 2);
      }
      return dp[n];
    };

    fibonacci(n);

    if (n === 0) dp.reverse();
    console.log(dp[dp.length - 2], dp[dp.length - 1]);
  }
}

Solution(input);

// 단순 재귀

// const [T, ...input] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n")
//   .map((v) => +v);

// function Solution(input) {
//   const fibonacci = (n, answer) => {
//     if (n === 0) {
//       answer[0]++;
//       return;
//     } else if (n === 1) {
//       answer[1]++;
//       return;
//     } else {
//       return fibonacci(n - 1, answer) + fibonacci(n - 2, answer);
//     }
//   };

//   for (let n of input) {
//     const answer = [0, 0];

//     fibonacci(n, answer);
//     console.log(answer.join(" "));
//   }
// }

// Solution(input);
