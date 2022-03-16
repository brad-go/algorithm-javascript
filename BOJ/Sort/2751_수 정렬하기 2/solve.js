const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

// function Solution(input) {
//   const answer = input.sort((a, b) => a - b);
//   console.log(answer.join("\n"));
// }

// Solution(input);

function Solution(n, input) {
  const quickSort = (arr) => {
    if (arr.length < 2) return arr;
    const pivotIdx = Math.floor(arr.length / 2);
    const pivot = arr[pivotIdx];
    arr.splice(pivotIdx, 1);

    const left = [];
    const right = [];

    for (let idx of arr) {
      if (idx < pivot) {
        left.push(idx);
        continue;
      }
      right.push(idx);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const answer = quickSort(input);
  console.log(answer.join("\n"));
}

Solution(n, input);
