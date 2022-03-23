const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

// 내 제출

function Solution(input) {
  const stack = [];
  input.forEach((num) => {
    if (num === 0) stack.pop();
    else stack.push(num);
  });

  const total = stack.reduce((acc, cur) => acc + cur, 0);
  console.log(total);
}

Solution(input);
