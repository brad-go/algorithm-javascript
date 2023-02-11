const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const solution = (s, t) => {
  let index = 0;

  for (let i = 0; i < t.length; i++) {
    if (s[index] === t[i]) index++;
  }

  return index === s.length ? "Yes" : "No";
};

input.forEach((string) => {
  const [s, t] = string.split(" ");
  console.log(solution(s, t));
});
