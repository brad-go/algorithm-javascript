const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [T, ...numbers] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number); // prettier-ignore

const solution = (number) => {
  const dp = new Array(number + 1).fill(0);

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= number; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[number];
};

for (let i = 0; i < T; i++) {
  console.log(solution(numbers[i]));
}
