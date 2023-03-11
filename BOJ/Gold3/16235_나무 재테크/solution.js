const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input8.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const nourishments = input.slice(1, N + 1).map((str) => str.split(" ").map(Number)); // prettier-ignore
const initialTrees = input.slice(N + 1).map((str) => str.split(" ").map(Number)); // prettier-ignore

const solution = (N, M, K, nourishments, initialTrees) => {
  const { ground, trees } = init(N, initialTrees);

  let year = 0;

  while (year < K) {
    passFirstHalfOfYear(N, ground, trees);
    passSecondHalfOfYear(N, ground, nourishments, trees);
    year++;
  }

  return trees.reduce((total, row) => {
    return total + row.reduce((count, cell) => count + cell.length, 0);
  }, 0);
};

const init = (N, initialTrees) => {
  const ground = Array.from(Array(N), () => Array(N).fill(5));
  const trees = Array.from(Array(N), () => Array(N).fill().map(() => [])); // prettier-ignore

  initialTrees.forEach(([r, c, age]) => trees[r - 1][c - 1].push(age));

  return { ground, trees };
};

const passFirstHalfOfYear = (N, ground, trees) => {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!trees[r][c].length) continue;

      const [aliveTrees, nourishmentsFormDead] = growTrees(ground, trees, r, c);

      trees[r][c] = aliveTrees;
      ground[r][c] += nourishmentsFormDead;
    }
  }
};

const growTrees = (ground, trees, r, c) => {
  const aliveTrees = [];
  const currentTrees = trees[r][c];

  let nourishmentsFormDead = 0;

  currentTrees.sort((a, b) => a - b);

  currentTrees.forEach((tree) => {
    if (ground[r][c] < tree) {
      nourishmentsFormDead += Math.floor(tree / 2);
      return;
    }

    ground[r][c] -= tree;
    aliveTrees.push(tree + 1);
  });

  return [aliveTrees, nourishmentsFormDead];
};

const passSecondHalfOfYear = (N, ground, nourishments, trees) => {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      addNourishment(ground, nourishments, r, c);

      if (!trees[r][c].length) continue;

      breed(trees, r, c);
    }
  }
};

const breed = (trees, r, c) => {
  const dirs = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  const currentTrees = trees[r][c];

  currentTrees.forEach((tree) => {
    if (!canBreeding(tree)) return;

    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      if (!isInGround(N, nr, nc)) return;

      trees[nr][nc].push(1);
    });
  });
};

const canBreeding = (age) => age % 5 === 0;

const isInGround = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const addNourishment = (ground, nourishments, r, c) => {
  ground[r][c] += nourishments[r][c];
};

console.log(solution(N, M, K, nourishments, initialTrees));
