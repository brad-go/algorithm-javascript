const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(n, commands) {
  const queue = [];
  const result = [];

  for (let i = 0; i < n; i++) {
    switch (commands[i]) {
      case "pop":
        result.push(queue.shift() || -1);
        break;
      case "size":
        result.push(queue.length);
        break;
      case "empty":
        result.push(queue.length ? 1 : 0);
        break;
      case "front":
        result.push(queue[0] || -1);
        break;
      case "back":
        result.push(queue[queue.length - 1] || -1);
        break;
      default:
        queue.push(commands[i].split(" ")[1]);
    }
  }

  console.log(result.join("\n"));
}

Solution(n, input);
