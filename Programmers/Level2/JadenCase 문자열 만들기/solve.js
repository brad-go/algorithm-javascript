const s = require("fs").readFileSync("./input.txt").toString().trim();

const solution = (s) => {
  return s
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

console.log(solution(s));
