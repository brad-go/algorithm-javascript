const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [R, C, M] = input[0].split(" ").map(Number);
const sharks = input.slice(1).map((str) => str.split(" ").map(Number));

const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const solution = (R, C, M, sharks) => {
  if (M === 0) return 0;

  const grid = {
    current: init(R, C, sharks),
    next: null,
  };

  let answer = 0;

  for (let fisher = 0; fisher < C; fisher++) {
    grid.next = createGrid(R, C);
    answer += catchShark(R, grid.current, fisher);

    moveSharks(R, C, grid);

    grid.current = grid.next;
  }

  return answer;
};

const init = (R, C, sharks) => {
  const grid = createGrid(R, C);

  sharks.forEach(([row, col, speed, dir, size]) => {
    const shark = createShark(row, col, speed, dir, size);

    grid[row - 1][col - 1] = shark;
  });

  return grid;
};

const createGrid = (R, C) => {
  return Array.from(Array(R), () => Array(C).fill(null));
};

const createShark = (row, column, speed, direction, size) => {
  const rowMod = (R - 1) * 2;
  const colMod = (C - 1) * 2;

  return {
    r: row - 1,
    c: column - 1,
    speed: speed % (direction < 3 ? rowMod : colMod),
    dir: direction - 1,
    size,
  };
};

const catchShark = (R, grid, fisher) => {
  for (let i = 0; i < R; i++) {
    if (grid[i][fisher]) {
      const size = grid[i][fisher].size;

      grid[i][fisher] = null;

      return size;
    }
  }

  return 0;
};

const moveSharks = (R, C, grid) => {
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (!grid.current[r][c]) continue;

      const movedShark = moveShark(R, C, grid.current[r][c]);
      const { r: row, c: col, size } = movedShark;

      if (grid.next[row][col] && grid.next[row][col].size > size) continue;

      grid.next[row][col] = movedShark;
    }
  }
};

const moveShark = (R, C, shark) => {
  const { r, c, speed, dir, size } = shark;

  let nr = r;
  let nc = c;
  let ndir = dir;

  for (let i = 0; i < speed; i++) {
    const [dr, dc] = dirs[ndir];

    if (isInGrid(R, C, nr + dr, nc + dc)) {
      nr += dr;
      nc += dc;
      continue;
    }

    ndir = changeDirection(ndir);

    const [dr2, dc2] = dirs[ndir];

    nr += dr2;
    nc += dc2;
  }

  return { r: nr, c: nc, speed, dir: ndir, size };
};

const isInGrid = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && c < C;
};

const changeDirection = (direction) => {
  if (direction < 2) return direction === 0 ? 1 : 0;

  return direction === 2 ? 3 : 2;
};

console.log(solution(R, C, M, sharks));
