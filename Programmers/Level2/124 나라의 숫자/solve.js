const n = Number(require("fs").readFileSync("./input.txt").toString().trim());

const solution = (n) => {
  if (n === 0) {
    return "";
  }

  return solution(Math.floor((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3];
};

console.log(solution(n));
