const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input4.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, D] = input[0].split(" ").map(Number);
const board = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, M, D, board) => {
  const { archerPositions, defaultEnemies } = initGame(N, M, board);

  let answer = 0;

  archerPositions.forEach((position) => {
    const archers = position.map((column) => makeArcher(N, column));

    let enemies = [...defaultEnemies.map((enemy) => ({ ...enemy }))];
    let attackCount = 0;

    for (let i = 0; i < N; i++) {
      const { movedEnemies, count } = playGame(N, D, archers, enemies);

      enemies = movedEnemies;
      attackCount += count;
    }

    answer = Math.max(answer, attackCount);
  });

  return answer;
};

const initGame = (N, M, board) => {
  const defaultEnemies = [];
  const archerPositions = getCombinations(
    new Array(M).fill().map((_, index) => index),
    3
  );

  let id = 1;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j]) defaultEnemies.push(makeEnemy(id++, i, j));
    }
  }

  return { archerPositions, defaultEnemies };
};

const getCombinations = (array, select) => {
  const results = [];

  if (select === 1) {
    return array.map((number) => [number]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

const makeEnemy = (id, row, column) => ({
  id,
  r: row,
  c: column,
  isAlive: true,
});

const makeArcher = (N, column) => ({ r: N, c: column });

const playGame = (N, D, archers, enemies) => {
  attack(archers, enemies, D);

  const aliveEnemies = enemies.filter(({ isAlive }) => isAlive);
  const count = enemies.length - aliveEnemies.length;

  const movedEnemies = aliveEnemies
    .map((enemy) => ({ ...enemy, r: (enemy.r += 1) }))
    .filter(({ r }) => r < N);

  return { count, movedEnemies };
};

const attack = (archers, enemies, D) => {
  archers.forEach((archer) => {
    const target = findTarget(archer, enemies, D);

    if (target) target.isAlive = false;
  });
};

const findTarget = (archer, enemies, D) => {
  const attackableEnemies = enemies.filter((enemy) => {
    return isInDistance(D, archer.r, archer.c, enemy.r, enemy.c);
  });

  if (!attackableEnemies.length) return -1;

  attackableEnemies.sort((a, b) => {
    const distanceA = getDistance(archer.r, archer.c, a.r, a.c);
    const distanceB = getDistance(archer.r, archer.c, b.r, b.c);

    if (distanceA === distanceB) return a.c - b.c;

    return distanceA - distanceB;
  });

  return enemies.find(({ id }) => attackableEnemies[0].id === id);
};

const isInDistance = (distance, r1, c1, r2, c2) => {
  return distance >= getDistance(r1, c1, r2, c2);
};

const getDistance = (r1, c1, r2, c2) => Math.abs(r1 - r2) + Math.abs(c1 - c2);

console.log(solution(N, M, D, board));
