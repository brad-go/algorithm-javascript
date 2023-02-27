const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input6.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((str) => str.split(""));

const CELL = {
  wall: "#",
  empty: ".",
  hole: "O",
  redBall: "R",
  blueBall: "B",
};
const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

const solution = (N, M, board) => {
  const balls = findBalls(N, M, board).map(([r, c], index) => {
    return makeBall(r, c, index === 0 ? CELL.redBall : CELL.blueBall);
  });

  return findMoveCountForRedBallEscape(N, M, board, balls);
};

const findBalls = (N, M, board) => {
  const balls = new Array(2).fill(null);

  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      if (board[i][j] === CELL.redBall) {
        balls[0] = [i, j];
        board[i][j] = CELL.empty;
      }
      if (board[i][j] === CELL.blueBall) {
        balls[1] = [i, j];
        board[i][j] = CELL.empty;
      }
    }
  }

  return balls;
};

const makeBall = (r, c, color, isEscape = false) => {
  return { r, c, color, isEscape };
};

const findMoveCountForRedBallEscape = (N, M, board, balls) => {
  const queue = [[balls, 0]];
  const visited = new Set();
  const [red, blue] = balls;

  visited.add(makeVisitedString(red, blue));

  while (queue.length) {
    const [balls, count] = queue.shift();

    if (count === 10) return -1;

    for (let dir = 0; dir < 4; dir++) {
      const currentBalls = balls.map((ball) => ({ ...ball }));

      sortBalls(currentBalls, dir);
      moveBall(N, M, board, dir, currentBalls[0], currentBalls[1]);
      moveBall(N, M, board, dir, currentBalls[1], currentBalls[0]);

      const red = findBallColor(currentBalls, CELL.redBall);
      const blue = findBallColor(currentBalls, CELL.blueBall);

      if (blue.isEscape) continue;
      if (red.isEscape) return count + 1;

      const visitedString = makeVisitedString(red, blue);

      if (!visited.has(visitedString)) {
        visited.add(visitedString);
        queue.push([currentBalls, count + 1]);
      }
    }
  }

  return -1;
};

const makeVisitedString = (redBall, blueBall) => {
  return `[${redBall.r}, ${redBall.c}], [${blueBall.r}, ${blueBall.c}]`;
};

const sortBalls = (balls, direction) => {
  const sorting = [
    (a, b) => a.r - b.r,
    (a, b) => b.c - a.c,
    (a, b) => b.r - a.r,
    (a, b) => a.c - b.c,
  ];

  return balls.sort(sorting[direction]);
};

const moveBall = (N, M, board, dir, ball, otherBall) => {
  while (true) {
    const { r, c } = ball;

    let nr = r + DR[dir];
    let nc = c + DC[dir];

    if (!isInRange(N, M, nr, nc) || !isMovable(board, nr, nc, otherBall)) break;

    ball.r = nr;
    ball.c = nc;

    if (isEscape(board, nr, nc)) {
      ball.r = -1;
      ball.c = -1;
      ball.isEscape = true;
      break;
    }
  }
};

const isInRange = (N, M, r, c) => {
  return 1 <= r && r < N - 1 && 1 <= c && c < M - 1;
};

const isMovable = (board, r, c, otherBall) => {
  return !(
    board[r][c] === CELL.wall ||
    (otherBall.r === r && otherBall.c === c)
  );
};

const isEscape = (board, r, c) => {
  return board[r][c] === CELL.hole;
};

const findBallColor = (balls, targetColor) => {
  return balls.find(({ color }) => color === targetColor);
};

console.log(solution(N, M, board));
