const input = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");

class FireBall {
  constructor(row, col, mass, speed, dir) {
    this.row = row;
    this.col = col;
    this.mass = mass;
    this.speed = speed;
    this.dir = dir;
  }
}

const [N, M, K] = input.shift().split(" ").map(Number);
const fireBalls = input.map((fireBall) => {
  const [row, col, mass, speed, dir] = fireBall.split(" ").map(Number);
  return new FireBall(row - 1, col - 1, mass, speed, dir);
});

const moveFireBalls = (map, fireBalls) => {
  const newMap = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
  );

  const DR = [-1, -1, 0, 1, 1, 1, 0, -1];
  const DC = [0, 1, 1, 1, 0, -1, -1, -1];

  fireBalls.forEach((fireBall) => {
    const { row, col, speed, dir } = fireBall;

    let nr = (row + DR[dir] * speed + speed * N) % N;
    let nc = (col + DC[dir] * speed + speed * N) % N;

    fireBall.row = nr;
    fireBall.col = nc;

    newMap[nr][nc].push(fireBall);
  });

  return newMap;
};

const checkNumberOfFireBallsOnMap = (map) => {
  const newFireBalls = [];
  const placesMoreThanOne = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j].length === 1) newFireBalls.push(...map[i][j]);
      if (map[i][j].length > 1) placesMoreThanOne.push([i, j]);
    }
  }

  return [newFireBalls, placesMoreThanOne];
};

const combineFireBall = (map, places) => {
  const newFireBalls = [];

  const ODD = [1, 3, 5, 7];
  const EVEN = [0, 2, 4, 6];

  places.forEach(([row, col]) => {
    const combinedFireBalls = map[row][col];

    let combinedMass = 0;
    let combinedSpeed = 0;
    let combinedEvenDir = 0;

    combinedFireBalls.forEach((fireBall) => {
      const { mass, speed, dir } = fireBall;

      combinedMass += mass;
      combinedSpeed += speed;
      if (dir % 2 === 0) combinedEvenDir++;
    });

    const mass = Math.floor(combinedMass / 5);
    const speed = Math.floor(combinedSpeed / combinedFireBalls.length);

    if (mass === 0) return;

    for (let i = 0; i < 4; i++) {
      if (!combinedEvenDir || combinedEvenDir === combinedFireBalls.length) {
        newFireBalls.push(new FireBall(row, col, mass, speed, EVEN[i]));
      } else {
        newFireBalls.push(new FireBall(row, col, mass, speed, ODD[i]));
      }
    }
  });

  return newFireBalls;
};

const calculateSumOfMass = (fireBalls) => {
  return fireBalls.reduce((acc, cur) => acc + cur.mass, 0);
};

const Solution = (N, K, fireBalls) => {
  let map = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
  );

  fireBalls.forEach((fireBall) =>
    map[fireBall.row][fireBall.col].push(fireBall)
  );

  while (K > 0) {
    map = moveFireBalls(map, fireBalls);
    const [existFireBalls, placesMoreThanOne] =
      checkNumberOfFireBallsOnMap(map);
    const devidedFireBalls = combineFireBall(map, placesMoreThanOne);
    fireBalls = [...existFireBalls, ...devidedFireBalls];
    K--;
  }

  const answer = calculateSumOfMass(fireBalls);

  console.log(answer);
};

Solution(N, K, fireBalls);
