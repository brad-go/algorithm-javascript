const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const N = +fs.readFileSync(filePath).toString().trim();

const solution = (N) => {
  const board = new Array(N).fill(0);

  let answer = 0;

  const dfs = (row) => {
    if (row === N) {
      answer++;
      return;
    }

    for (let column = 0; column < N; column++) {
      if (board[row]) continue;

      board[row] = column;

      if (isValid(board, row)) dfs(row + 1);

      board[row] = 0;
    }
  };

  dfs(0);

  return answer;
};

const isValid = (board, row) => {
  for (let i = 0; i < row; i++) {
    if (board[row] === board[i] || Math.abs(board[row] - board[i]) === row - i)
      return false;
  }

  return true;
};

console.log(solution(N));
