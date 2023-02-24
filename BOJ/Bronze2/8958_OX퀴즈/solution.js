const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const results = input.slice(1);

const solution = (result) => {
  let combo = 0;

  return result.split("").reduce((acc, cur) => {
    combo = cur === "O" ? combo + 1 : 0;
    acc = cur === "O" ? acc + combo : acc;

    return acc;
  }, 0);
};

results.forEach((result) => {
  console.log(solution(result));
});
