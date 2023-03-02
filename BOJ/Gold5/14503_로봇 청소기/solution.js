const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const [R, C, D] = input[1].split(" ").map(Number);
const board = input.slice(2).map((str) => str.split(" ").map(Number));

const solution = (N, M, R, C, D, board) => {
  const cleaner = createCleaner(R, C, D);

  cleanUp(N, M, board, cleaner);

  return countCleanedPlace(board);
};

const createCleaner = (R, C, D) => ({ r: R, c: C, dir: D, isAlive: true });

const cleanUp = (N, M, board, cleaner) => {
  const { r, c } = cleaner;

  board[r][c] = ROOM.cleaned;

  if (isAllCleaned(board, cleaner)) {
    moveBackward(N, M, board, cleaner);

    if (cleaner.isAlive) cleanUp(N, M, board, cleaner);

    return;
  }

  for (let dir = 0; dir < 4; dir++) {
    rotateCleaner(cleaner);

    const [dr, dc] = DIRECTIONS[cleaner.dir];
    const nr = cleaner.r + dr;
    const nc = cleaner.c + dc;

    if (
      isInRoom(N, M, nr, nc) &&
      board[nr][nc] === ROOM.uncleaned &&
      board[nr][nc] !== ROOM.wall
    ) {
      cleaner.r = nr;
      cleaner.c = nc;
      board[nr][nc] = ROOM.cleaned;

      cleanUp(N, M, board, cleaner);
      break;
    }
  }
};

const isAllCleaned = (board, cleaner) => {
  return DIRECTIONS.every(([dr, dc]) => {
    return (
      board[cleaner.r + dr][cleaner.c + dc] === ROOM.cleaned ||
      board[cleaner.r + dr][cleaner.c + dc] === ROOM.wall
    );
  });
};

const moveBackward = (N, M, board, cleaner) => {
  const [dr, dc] = DIRECTIONS[(cleaner.dir + 2) % 4];
  const nr = cleaner.r + dr;
  const nc = cleaner.c + dc;

  if (!isInRoom(N, M, nr, nc) || board[nr][nc] === ROOM.wall) {
    cleaner.isAlive = false;
    return;
  }

  cleaner.r = nr;
  cleaner.c = nc;
};

const isInRoom = (N, M, r, c) => 1 <= r && r < N - 1 && 1 <= c && c < M - 1;

const rotateCleaner = (cleaner) => {
  cleaner.dir = cleaner.dir - 1 < 0 ? 3 : cleaner.dir - 1;
};

const countCleanedPlace = (board) => {
  return board.reduce((acc, cur) => {
    return acc + cur.filter((cell) => cell === ROOM.cleaned).length;
  }, 0);
};

console.log(solution(N, M, R, C, D, board));
