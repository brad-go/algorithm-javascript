const [...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(input) {
  const string = input.slice(0, -1);
  let result = "";

  for (let line of string) {
    const regex = /[^\(\)\[\].]/g;
    const parenthesis = line.replace(regex, "");
    const stack = [];

    for (let i = 0; i < parenthesis.length; i++) {
      const cur = parenthesis[i];

      if (cur === ".") {
        result += stack.length === 0 ? "yes\n" : "no\n";
        break;
      }

      if (cur === "(" || cur === "[") {
        stack.push(cur);

        continue;
      }

      if (cur === "]" && stack[stack.length - 1] === "[") {
        stack.pop();
        continue;
      } else if (cur === "]" && stack[stack.length - 1] === "(") {
        result += "no\n";
        break;
      }

      if (cur === ")" && stack[stack.length - 1] === "(") {
        stack.pop();
        continue;
      } else if (cur === ")" && stack[stack.length - 1] === "[") {
        result += "no\n";
        break;
      }
    }
  }

  console.log(result.trim());
}

Solution(input);
