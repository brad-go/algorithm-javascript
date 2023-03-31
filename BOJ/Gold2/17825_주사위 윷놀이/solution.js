const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input5.txt";
const dice = fs.readFileSync(filePath).toString().trim().split(" ").map(Number); // prettier-ignore

const solution = (dice) => {
  const board = createBoard();
  const pieces = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  let answer = 0;

  const move = (count, score) => {
    if (count === 10) {
      answer = Math.max(answer, score);

      return;
    }

    for (let i = 0; i < 4; i++) {
      const [r, c] = pieces[i];

      if (r === -1) continue;

      let [nr, nc] = [r, c];

      nc += dice[count];

      if (nc >= board[nr].length) {
        [nr, nc] = [-1, -1];
      } else if (nr === 0 && board[nr][nc] === 10) {
        [nr, nc] = [1, 0];
      } else if (nr === 0 && board[nr][nc] === 20) {
        [nr, nc] = [2, 1];
      } else if (nr === 0 && board[nr][nc] === 30) {
        [nr, nc] = [3, 0];
      }

      if (isPieceExist(board, pieces, nr, nc)) continue;

      pieces[i] = [nr, nc];

      move(count + 1, nr >= 0 ? score + board[nr][nc] : score);

      pieces[i] = [r, c];
    }
  };

  move(0, 0);

  return answer;
};

const createBoard = () => {
  const board_last = [25, 30, 35, 40];
  const board = [
    new Array(21).fill().map((_, index) => index * 2),
    [10, 13, 16, 19].concat(board_last),
    [null, 20, 22, 24].concat(board_last),
    [30, 28, 27, 26].concat(board_last),
  ];

  return board;
};

const isPieceExist = (board, pieces, r, c) => {
  if (r > 1 && c > 3) {
    r = 1;
  }

  if (r > 0 && board[r][c] === 40) {
    r = 0;
    c = board[0].length - 1;
  }

  for (let [nr, nc] of pieces) {
    if (nr === -1) continue;

    if (nr > 1 && nc > 3) {
      nr = 1;
    }

    if (board[nr][nc] === 40) {
      nr = 0;
      nc = board[0].length - 1;
    }

    if (r === nr && c === nc) return true;
  }

  return false;
};

console.log(solution(dice));
