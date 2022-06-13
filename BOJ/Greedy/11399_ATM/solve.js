const [N, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);

const solution = (N, withdrawalTimes) => {
  withdrawalTimes.sort((a, b) => a - b);

  let answer = 0;

  for (let i = 0; i < N; i++) {
    answer += withdrawalTimes[i] * (N - i);
  }

  console.log(answer);
};

solution(N, input);
