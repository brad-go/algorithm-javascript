const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(n, input) {
  const commands = [...input];

  const stack = [];
  const result = [];

  for (let i = 0; i < n; i++) {
    switch (commands[i]) {
      case "pop":
        result.push(stack.pop() || -1);
        break;
      case "size":
        result.push(stack.length);
        break;
      case "empty":
        result.push(stack.length ? 0 : 1);
        break;
      case "top":
        result.push(stack[stack.length - 1] || -1);
        break;
      default:
        stack.push(commands[i].split(" ")[1]);
    }
  }

  console.log(result.join("\n"));
}

Solution(n, input);
