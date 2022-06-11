const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [N, K] = input[0].split(" ").map(Number);
const COINS = input.slice(1).map(Number);

const solution = (n, k, coins) => {
  let answer = 0;
  let idx = n - 1;

  while (k !== 0) {
    if (k - coins[idx] < 0) {
      idx--;
      continue;
    }

    const quotient = Math.floor(k / coins[idx]);
    const rest = k % coins[idx];

    let canDevided = false;

    if (rest !== 0) {
      for (let i = 0; i < idx; i++) {
        if (rest % coins[i] === 0) canDevided = true;
      }

      if (!canDevided) {
        idx--;
        continue;
      }
    }

    answer += quotient;
    k = rest;
  }

  console.log(answer);
};

solution(N, K, COINS);
