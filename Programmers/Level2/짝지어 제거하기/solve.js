const s = require("fs").readFileSync("./input.txt").toString().trim();

const solution = (s) => {
  const stack = [];

  for (const char of s) {
    if (stack.length && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length ? 0 : 1;
};

console.log(solution(s));
