const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

// 내 제출

function Solution(n, input) {
  const numbers = [...input];
  const sorted = numbers.sort((a, b) => a - b);

  let operation = "";
  const stack = [];

  for (let i = 0; i < n; i++) {
    while (sorted[0] <= input[i] && stack[stack.length - 1] !== input[i]) {
      stack.push(sorted.shift());
      operation += "+\n";
    }

    if (stack[stack.length - 1] === input[i]) {
      stack.pop();
      operation += "-\n";
    } else {
      operation = "NO";
      break;
    }
  }
  console.log(operation.trim());
}

Solution(n, input);
