const s = require("fs").readFileSync("./input.txt").toString().trim();

const solution = (s) => {
  const balance = s.split("").reduce((acc, char, _, arr) => {
    acc += char === "(" ? 1 : -1;

    if (acc < 0) {
      return arr.splice(1);
    }

    return acc;
  }, 0);

  return balance === 0;
};

console.log(solution(s));
