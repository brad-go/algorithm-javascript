const [n, ...input] = require("fs")
  .readFileSync("./input5.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(n);
const map = input.map((row) => row.split(" ").map(Number));

const findBabySharkPos = (map, babyShark) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === babyShark) return [i, j];
    }
  }
};

const isInRange = (r, c, N) => {
  if (r >= N || c >= N || r < 0 || c < 0) return false;

  return true;
};

const findEdibleFish = (N, map, size, [sr, sc]) => {
  const q = [[sr, sc, 0]];
  const visited = Array.from(Array(N), () => Array(N).fill(0));

  visited[sr][sc] = 1;

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const position = [];

  while (q.length) {
    const [r, c, dist] = q.shift();

    if (map[r][c] < size && map[r][c]) {
      position.push([r, c, dist]);
    }

    for (let dir = 0; dir < 4; dir++) {
      let nr = r + DR[dir];
      let nc = c + DC[dir];

      if (isInRange(nr, nc, N) && !visited[nr][nc] && map[nr][nc] <= size) {
        visited[nr][nc] = 1;
        q.push([nr, nc, dist + 1]);
      }
    }
  }

  return position;
};

const findNearestFish = (positions) => {
  let nearestFishPos;

  const minDistance = Math.min(...positions.map(([r, c, dist]) => dist));
  const nearestFish = positions.filter(([r, c, dist]) => dist === minDistance);

  const topMost = Math.min(...nearestFish.map(([r, c, dist]) => r));
  nearestFishPos = nearestFish.filter(([r, c, dist]) => r === topMost);

  if (nearestFishPos.length > 1) {
    const leftMost = Math.min(...nearestFishPos.map(([r, c, dist]) => c));
    nearestFishPos = nearestFishPos.filter(([r, c, dist]) => c === leftMost);
  }

  return nearestFishPos[0];
};

function Solution(N, map) {
  const BABY_SHARK = 9;
  const INITIAL_SHARK_SIZE = 2;
  const INITIAL_POS = findBabySharkPos(map, BABY_SHARK);

  let currentSharkPos = INITIAL_POS;
  let sharkSize = INITIAL_SHARK_SIZE;
  let time = 0;
  let amountOfEaten = 0;

  const [r, c] = INITIAL_POS;
  map[r][c] = 0;

  while (true) {
    const edibleFisPos = findEdibleFish(N, map, sharkSize, currentSharkPos);

    if (!edibleFisPos.length) break;

    const nearestFishPos = findNearestFish(edibleFisPos);

    const [r, c, dist] = nearestFishPos;
    currentSharkPos = [r, c];
    map[r][c] = 0;

    time += dist;
    amountOfEaten++;

    if (amountOfEaten === sharkSize) {
      sharkSize++;
      amountOfEaten = 0;
    }
  }

  console.log(time);
}

Solution(N, map);
