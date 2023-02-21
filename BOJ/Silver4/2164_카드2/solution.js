const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +fs.readFileSync(filePath).toString().trim();

const solution = (N) => {
  if (N <= 2) return N;

  const exponent = Math.floor(Math.log2(N));
  const biggest = Math.pow(2, exponent);

  if (biggest === N) return N;

  const diff = N - biggest;

  return diff * 2;
};

console.log(solution(N));
