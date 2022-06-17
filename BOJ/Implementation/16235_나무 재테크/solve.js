class Tree {
  constructor(r, c, age) {
    this.r = r;
    this.c = c;
    this.age = age;
    this.isAlive = true;
  }

  grow() {
    this.age += 1;
  }

  isBreedingAge() {
    return this.age % 5 === 0;
  }

  die() {
    this.isAlive = false;
  }
}

// prettier-ignore
const input = require("fs").readFileSync("./input8.txt").toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const NOURISHMENT = input
  .slice(1, N + 1)
  .map((row) => row.split(" ").map(Number));
const trees = input
  .slice(N + 1)
  .map((tree) => {
    const [r, c, age] = tree.split(" ").map((v) => v - 1);
    return new Tree(r, c, age + 1);
  })
  .sort((a, b) => a.age - b.age);

const solution = (N, M, K, trees) => {
  const map = Array.from(Array(N), () => Array(N).fill(5));

  while (K > 0) {
    const [grownTrees, deadTrees] = spring(map, trees);
    summer(map, deadTrees);
    const newTrees = fall(grownTrees);
    winter(map);

    trees = [...newTrees, ...grownTrees];
    K--;
  }

  console.log(trees.length);
};

const spring = (map, trees) => {
  const grwonTrees = [];
  const deadTrees = [];

  trees.forEach((tree) => {
    const { r, c, age } = tree;

    if (age > map[r][c]) {
      deadTrees.push(tree);
      return;
    }

    map[r][c] -= age;
    grwonTrees.push(new Tree(r, c, age + 1));
  });

  return [grwonTrees, deadTrees];
};

const summer = (map, deadTrees) => {
  deadTrees.forEach((tree) => {
    const { r, c, age } = tree;
    const nourishment = Math.trunc(age / 2);

    map[r][c] += nourishment;
  });
};

const fall = (trees) => {
  const BREED_RANGE = 8;
  const DR = [-1, -1, -1, 0, 0, 1, 1, 1];
  const DC = [-1, 0, 1, -1, 1, -1, 0, 1];

  const newTrees = [];

  trees.forEach((tree) => {
    const { r, c } = tree;

    if (tree.isBreedingAge()) {
      for (let dir = 0; dir < BREED_RANGE; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (isInRange(nr, nc)) newTrees.push(new Tree(nr, nc, 1));
      }
    }
  });

  return newTrees;
};

const winter = (map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      map[i][j] += NOURISHMENT[i][j];
    }
  }
};

const isInRange = (nr, nc) => {
  if (0 <= nr && nr < N && 0 <= nc && nc < N) return true;
  return false;
};

solution(N, M, K, trees);
