const [...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(input) {
  const lines = input.slice(0, -1);

  const open = ["(", "["];
  const close = [")", "]"];

  const result = [];

  for (let line of lines) {
    const stack = [];
    let valid = true;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (open.includes(char)) stack.push(char);
      else if (close.includes(char)) {
        if (stack.pop() !== open[close.indexOf(char)]) {
          result.push("no");
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      if (stack.length === 0) result.push("yes");
      else result.push("no");
    }
  }

  console.log(result.join("\n"));
}

Solution(input);
