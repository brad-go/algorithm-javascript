const input = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");

class FireBall {
  constructor(r, c, m, s, d) {
    this.r = r;
    this.c = c;
    this.m = m;
    this.s = s;
    this.d = d;
  }
}

const [N, M, K] = input.shift().split(" ").map(Number);
const fireBalls = input.map((ball) => {
  const [r, c, m, s, d] = ball.split(" ").map(Number);
  return new FireBall(r - 1, c - 1, m, s, d);
});

const moveFireBalls = (map, fireBalls) => {
  const DR = [-1, -1, 0, 1, 1, 1, 0, -1];
  const DC = [0, 1, 1, 1, 0, -1, -1, -1];

  fireBalls.forEach((fireBall) => {
    const { r, c, s, d } = fireBall;

    let nr = (r + DR[d] * s + s * N) % N;
    let nc = (c + DC[d] * s + s * N) % N;

    map[r][c] -= 1;

    fireBall.r = nr;
    fireBall.c = nc;

    map[nr][nc] += 1;
  });
};

const findPlaceWithMoreThanOneBall = (map) => {
  const places = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] > 1) places.push([i, j]);
    }
  }

  return places;
};

const combineFireBall = (map, fireBalls, places) => {
  const M = fireBalls.length;

  places.forEach(([r, c]) => {
    const willCombined = [];

    for (let i = 0; i < M; i++) {
      if (fireBalls[i] === null) continue;

      const fireBall = fireBalls[i];

      if (fireBall.r === r && fireBall.c === c) {
        willCombined.push(fireBall);
        fireBalls[i] = null;
      }
    }

    map[r][c] = 0;

    let comM = 0;
    let comS = 0;
    let comD = new Array(willCombined.length);

    willCombined.forEach((fireBall, idx) => {
      if (fireBall === null) return;

      comM += fireBall.m;
      comS += fireBall.s;
      comD[idx] = fireBall.d;
    });

    let flag = comD[0] % 2 === 0 ? true : false;
    let isEven;

    if (flag) isEven = comD.every((d) => d % 2 === 0);
    else isEven = comD.every((d) => d % 2 === 1);

    const m = Math.floor(comM / 5);
    const s = Math.floor(comS / willCombined.length);
    const dir = isEven ? [0, 2, 4, 6] : [1, 3, 5, 7];

    if (m <= 0) return;

    for (let i = 0; i < 4; i++) {
      fireBalls.push(new FireBall(r, c, m, s, dir[i]));
    }

    map[r][c] = 4;
  });
};

const calculateSumOfMass = (fireBalls) => {
  const sum = fireBalls.reduce((acc, cur) => (acc += cur.m), 0);
  return sum;
};

const Solution = (N, K, fireBalls) => {
  const map = Array.from(Array(N), () => Array(N).fill(0));
  fireBalls.forEach((fireBall) => (map[fireBall.r][fireBall.c] = 1));

  while (K > 0) {
    moveFireBalls(map, fireBalls);
    const placesToCheck = findPlaceWithMoreThanOneBall(map);
    combineFireBall(map, fireBalls, placesToCheck);
    fireBalls = fireBalls.filter((fireBall) => fireBall !== null);

    K--;
  }

  const answer = calculateSumOfMass(fireBalls);

  console.log(answer);
};

Solution(N, K, fireBalls);
