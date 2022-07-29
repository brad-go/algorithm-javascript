// prettier-ignore
const [rcn, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [R, C, N] = rcn.split(" ").map(Number);
const board = input.map((line) => line.split('').map((v) => v === 'O' ? 1 : -1)); // prettier-ignore

function solution(R, C, N, board) {
  let time = 1;

  while (time++ < N) {
    if (time % 2 === 0) installBomb(R, C, board);
    else explodeBomb(R, C, board);
  }

  return board
    .map((line) => line.map((v) => (v === -1 ? "." : "O")).join(""))
    .join("\n");
}

const installBomb = (R, C, board) => {
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (board[r][c] === -1) board[r][c] = 0;
      else board[r][c] += 1;
    }
  }
};

const explodeBomb = (R, C, board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (board[r][c] !== 2) {
        if (board[r][c] !== -1) board[r][c]++;
        continue;
      }

      board[r][c] = -1;

      for (let dir = 0; dir < 4; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (!isInRange(R, C, nr, nc) || board[nr][nc] === 2) continue;

        board[nr][nc] = -1;
      }
    }
  }
};

const isInRange = (R, C, r, c) => {
  if (0 <= r && r < R && 0 <= c && c < C) return true;
  return false;
};

console.log(solution(R, C, N, board));
