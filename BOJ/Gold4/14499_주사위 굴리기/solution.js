const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, x, y, K] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((str) => str.split(" ").map(Number));
const commands = input[N + 1].split(" ").map(Number);

const solution = (board, commands, x, y) => {
  const dice = Array.from(Array(4), () => Array(3).fill(0));
  const DR = [0, 0, -1, 1];
  const DC = [1, -1, 0, 0];
  const position = { r: x, c: y };
  const log = [];

  commands.forEach((direction) => {
    const nr = position.r + DR[direction - 1];
    const nc = position.c + DC[direction - 1];

    if (!isInRange(board.length, board[0].length, nr, nc)) return;

    position.r = nr;
    position.c = nc;
    moveDice(dice, direction - 1);

    if (board[nr][nc] === 0) {
      copyDiceBottomSideToBoard(board, nr, nc, dice);
    } else {
      copyNumberToDiceBottomSide(board, dice, nr, nc);
    }

    log.push(getTopSide(dice));
  });

  return log.join("\n");
};

const isInRange = (N, M, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < M;
};

const moveDice = (dice, direction) => {
  const directions = [
    (dice) => moveEast(dice),
    (dice) => moveWest(dice),
    (dice) => moveNorth(dice),
    (dice) => moveSouth(dice),
  ];

  directions[direction](dice);
};

const moveEast = (dice) => {
  const bottom = dice[3][1];
  const right = dice[1][2];

  for (let i = 2; i > 0; i--) {
    dice[1][i] = dice[1][i - 1];
  }

  dice[1][0] = bottom;
  dice[3][1] = right;
};

const moveWest = (dice) => {
  const bottom = dice[3][1];
  const left = dice[1][0];

  for (let i = 0; i < 2; i++) {
    dice[1][i] = dice[1][i + 1];
  }

  dice[1][2] = bottom;
  dice[3][1] = left;
};

const moveNorth = (dice) => {
  const top = dice[0][1];

  for (let i = 0; i < 3; i++) {
    dice[i][1] = dice[i + 1][1];
  }

  dice[3][1] = top;
};

const moveSouth = (dice) => {
  const bottom = dice[3][1];

  for (let i = 3; i > 0; i--) {
    dice[i][1] = dice[i - 1][1];
  }

  dice[0][1] = bottom;
};

const copyDiceBottomSideToBoard = (board, r, c, dice) => {
  board[r][c] = getBottomSide(dice);
};

const copyNumberToDiceBottomSide = (board, dice, r, c) => {
  dice[3][1] = board[r][c];
  board[r][c] = 0;
};

const getBottomSide = (dice) => dice[3][1];

const getTopSide = (dice) => dice[1][1];

console.log(solution(board, commands, x, y));
