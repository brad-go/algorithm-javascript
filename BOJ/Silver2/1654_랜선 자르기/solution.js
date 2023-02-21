const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [K, N] = input[0].split(" ").map(Number);
const lines = input.slice(1).map(Number);

const solution = (K, N, lines) => {
  lines.sort();

  return binarySearch(lines, 1, Math.max(...lines));
};

const binarySearch = (lines, min, max) => {
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    const cuttedLinesCount = getCuttedLinesCount(lines, mid);

    if (cuttedLinesCount >= N) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return max;
};

const getCuttedLinesCount = (lines, cutLength) => {
  return lines.reduce((acc, cur) => acc + Math.floor(cur / cutLength), 0);
};

console.log(solution(K, N, lines));
