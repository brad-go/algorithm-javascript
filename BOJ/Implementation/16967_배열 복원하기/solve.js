// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [H, W, X, Y] = input[0].split(" ").map(Number);
const B = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(H, W, X, Y, B) {
  const A = Array.from(Array(H), () => Array(W).fill(0));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (i < X || j < Y) {
        A[i][j] = B[i][j];
        continue;
      }

      A[i][j] = B[i][j] - A[i - X][j - Y];
    }
  }

  return A.map((line) => line.join(" ")).join("\n");
}

console.log(solution(H, W, X, Y, B));
