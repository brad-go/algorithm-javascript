// prettier-ignore
const input = require('fs').readFileSync('./input3.txt').toString().trim().split('\n');
const [H, W, X, Y] = input[0].split(" ").map(Number);
const B = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(H, W, X, Y, B) {
  const A = Array.from(Array(H), () => Array(W).fill(0));

  for (let i = 0; i < H + X; i++) {
    for (let j = 0; j < W + Y; j++) {
      if (X <= i && i < H && Y <= j && j < W) {
        A[i][j] = B[i][j] - A[i - X][j - Y];
      } else if (i < X && j < W) {
        A[i][j] = B[i][j];
      } else if (X <= i && i < H && j < Y) {
        A[i][j] = B[i][j];
      }
    }
  }

  return A.map((line) => line.join(" ")).join("\n");
}

console.log(solution(H, W, X, Y, B));
