const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const sands = input.map((row) => row.split(" ").map((v) => +v));

const DR = [0, 1, 0, -1];
const DC = [-1, 0, 1, 0];

const solution = (N, sands) => {
  const totalSand = findAmountOfSand(sands);

  moveTornado(N, sands);

  const leftSand = findAmountOfSand(sands);

  return totalSand - leftSand;
};

const moveTornado = (N, sands) => {
  let [r, c] = findStartingPosition(N);
  let dir = 0;
  let blocksToMove = 1;
  let count = 0;

  while (true) {
    for (let i = 0; i < blocksToMove; i++) {
      r += DR[dir];
      c += DC[dir];

      moveSand(sands, r, c, dir);

      if (r == 0 && c == 0) return;
    }

    dir = (dir + 1) % 4;
    count++;

    if (count == 2) {
      blocksToMove++;
      count = 0;
    }
  }
};

const findStartingPosition = (gridSize) => {
  const halfSize = Math.floor(gridSize / 2);

  return [halfSize, halfSize];
};

const moveSand = (sands, r, c, dir) => {
  const sand = sands[r][c];

  let nr = r + DR[dir] * 2;
  let nc = c + DC[dir] * 2;
  let movedSand = 0;

  // 이동할 방향의 끝부터
  let sandToMove = findProportionAmountOfSand(sand, 5);
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 수직
  sandToMove = findProportionAmountOfSand(sand, 7);
  nr = r + DR[(dir + 1) % 4];
  nc = c + DC[(dir + 1) % 4];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 7);
  nr = r + DR[(dir + 3) % 4];
  nc = c + DC[(dir + 3) % 4];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 2);
  nr = r + DR[(dir + 1) % 4] * 2;
  nc = c + DC[(dir + 1) % 4] * 2;
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 2);
  nr = r + DR[(dir + 3) % 4] * 2;
  nc = c + DC[(dir + 3) % 4] * 2;
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 진행 방향의 좌우 대각
  sandToMove = findProportionAmountOfSand(sand, 10);
  nr = r + DR[(dir + 1) % 4] + DR[dir];
  nc = c + DC[(dir + 1) % 4] + DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 10);
  nr = r + DR[(dir + 3) % 4] + DR[dir];
  nc = c + DC[(dir + 3) % 4] + DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 진행 방향 반대의 좌우 대각
  sandToMove = findProportionAmountOfSand(sand, 1);
  nr = r + DR[(dir + 1) % 4] - DR[dir];
  nc = c + DC[(dir + 1) % 4] - DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 1);
  nr = r + DR[(dir + 3) % 4] - DR[dir];
  nc = c + DC[(dir + 3) % 4] - DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 진행 방향 앞 쪽
  nr = r + DR[dir];
  nc = c + DC[dir];

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sand - movedSand;
  }

  sands[r][c] = 0;
};

const isInSand = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const findProportionAmountOfSand = (amountOfSand, proportion) => {
  return Math.trunc(amountOfSand * (proportion / 100));
};

const findAmountOfSand = (sands) => {
  return sands.reduce((acc, cur) => {
    acc += cur.reduce((acc, cur) => acc + cur, 0);

    return acc;
  }, 0);
};

console.log(solution(N, sands));
