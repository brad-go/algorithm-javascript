const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(input) {
  let result = "";
  for (let line of input) {
    const parenthesis = line.split("");

    const stack = [];
    while (parenthesis.length > 0) {
      const cur = parenthesis.pop();

      if (cur === ")") {
        stack.push(cur);
        continue;
      }
      if (cur === "(" && stack[0] === ")") {
        stack.pop();
      } else {
        stack.push(cur);
      }
    }
    if (stack.length > 0) result += "NO\n";
    else result += "YES\n";
  }
  console.log(result.trim());
}

Solution(input);
