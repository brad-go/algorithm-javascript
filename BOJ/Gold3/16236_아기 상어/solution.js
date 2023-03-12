const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const space = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, space) => {
  const sea = space.map((row) => [...row]);
  const shark = createShark(N, sea);

  let time = 0;

  while (true) {
    const edibleFish = moveShark(N, sea, shark);

    if (!edibleFish.length) break;

    const moveTime = eatFish(sea, edibleFish, shark);
    const { size, eaten } = shark;

    if (size === eaten) {
      shark.size += 1;
      shark.eaten = 0;
    }

    time += moveTime;
  }

  return time;
};

const createShark = (N, sea) => {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (sea[r][c] === 9) {
        sea[r][c] = 0;

        return { r, c, size: 2, eaten: 0 };
      }
    }
  }
};

const moveShark = (N, sea, shark) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const { r: sr, c: sc } = shark;
  const queue = [[sr, sc, 0]];
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const edibleFish = [];

  visited[sr][sc] = true;

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();

    if (isEdible(sea, r, c, shark.size)) {
      edibleFish.push([r, c, dist]);
    }

    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      if (
        !isInSea(N, nr, nc) ||
        isBiggerThanShark(sea[nr][nc], shark.size) ||
        visited[nr][nc]
      )
        return;

      visited[nr][nc] = true;
      queue.push([nr, nc, dist + 1]);
    });
  }

  return edibleFish;
};

const isEdible = (sea, r, c, sharkSize) => {
  return sea[r][c] && sea[r][c] < sharkSize;
};

const isInSea = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const isBiggerThanShark = (fishSize, sharkSize) => {
  return fishSize > sharkSize;
};

const eatFish = (sea, edibleFish, shark) => {
  const [r, c, distance] = findNearestFish(edibleFish);

  sea[r][c] = 0;
  shark.eaten += 1;
  shark.r = r;
  shark.c = c;

  return distance;
};

const findNearestFish = (edibleFish) => {
  edibleFish.sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);

  return edibleFish[0];
};

console.log(solution(N, space));
