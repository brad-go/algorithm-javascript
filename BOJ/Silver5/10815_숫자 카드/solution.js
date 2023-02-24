const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const cards = input[1].split(" ").map(Number);
const targets = input[3].split(" ").map(Number);

const solution = (cards, targets) => {
  const cardSet = new Set(cards);

  return targets.map((target) => (cardSet.has(target) ? 1 : 0)).join(" ");
};

console.log(solution(cards, targets));
