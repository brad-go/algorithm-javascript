const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const M = +input[1];
const S = input[2];

const solution = (N, M, S) => {
  let answer = 0;
  let count = 0;

  for (let i = 1; i < M - 1; i++) {
    if (S[i - 1] === "I" && S[i] === "O" && S[i + 1] === "I") {
      count++;

      if (count === N) {
        count--;
        answer++;
      }

      i++;
    } else {
      count = 0;
    }
  }

  return answer;
};

console.log(solution(N, M, S));
