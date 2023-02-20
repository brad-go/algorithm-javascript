const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input4.txt";
const [_, string] = fs.readFileSync(filePath).toString().trim().split("\n"); // prettier-ignore

const R = 31;
const M = 1234567891;

const solution = (string) => {
  const hash = string.split("").reduce((acc, cur, index) => {
    acc += (cur.charCodeAt() - 96) * getCounting(index);
    return acc % M;
  }, 0);

  return hash % M;
};

const getCounting = (index) => {
  let counting = 1;

  for (let i = 1; i <= index; i++) {
    counting *= R;
    counting %= M;
  }

  return counting;
};

console.log(solution(string));
