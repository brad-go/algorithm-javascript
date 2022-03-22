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

  const execution = {
    pop: () => stack.pop() || -1,
    size: () => stack.length,
    empty: () => (stack.length === 0 ? 1 : 0),
    top: () => stack[stack.length - 1] || -1,
    push: (item) => {
      stack.push(item.split(" ")[1]);
      return "";
    },
  };

  const result = commands.reduce(
    (acc, cur) =>
      acc + (execution[cur] ? `${execution[cur]()}\n` : execution.push(cur)),
    ""
  );

  console.log(result.trim());
}

Solution(n, input);
