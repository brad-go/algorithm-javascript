const board = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ').map(Number)); // prettier-ignore

const solution = (board) => {
  const rows = board.length;
  const cols = board[0].length;
  const dp = Array.from(Array(rows + 1), () => Array(cols + 1).fill(0));

  let maxSide = 0;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (board[i - 1][j - 1] === 1) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide;
};

console.log(solution(board));
