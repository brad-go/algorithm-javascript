// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input[0].split(" ").map(Number);
const [_, K] = input[N + 1].split(" ").map(Number);
const A = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const B = input.slice(N + 2).map((row) => row.split(" ").map(Number));

const solution = (N, K, M, A, B) => {
  const matrix = Array.from(Array(N), () => Array(K));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < K; j++) {
      matrix[i][j] = getElement(M, A, B, i, j);
    }
  }

  matrix.forEach((row) => console.log(row.join(" ")));
};

const getElement = (M, A, B, x, y) => {
  let result = 0;

  for (let i = 0; i < M; i++) {
    result += A[x][i] * B[i][y];
  }

  return result;
};

solution(N, K, M, A, B);
