const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const numbers = input.slice(1).map(Number);

const solution = (N, numbers) => {
  const stack = [];

  let answer = "";
  let index = 0;

  for (let i = 1; i <= N; i++) {
    stack.push(i);
    answer += "+\n";

    while (stack.length && stack[stack.length - 1] === numbers[index]) {
      stack.pop();
      answer += "-\n";
      index++;
    }
  }

  return stack.length ? "NO" : answer.trim();
};

console.log(solution(N, numbers));
