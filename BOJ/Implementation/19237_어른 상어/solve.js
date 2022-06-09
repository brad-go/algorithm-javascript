const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class Shark {
  constructor(id) {
    this.id = id;
    this.x = null;
    this.y = null;
    this.dir = null;
    this.priority = new Array(4).fill(null);
    this.isDriveAway = false;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setDir(dir) {
    this.dir = dir;
  }

  setPriority(idx, direction) {
    this.priority[idx] = direction;
  }

  findNextDir(candidates) {
    for (let i = 0; i < 4; i++) {
      if (candidates.includes(this.priority[this.dir][i]))
        return this.priority[this.dir][i];
    }
    return 0;
  }

  driveAway() {
    this.isDriveAway = true;
  }
}

const [N, M, k] = input[0].split(" ").map(Number);
const map = new Array(N).fill().map((_, idx) =>
  input[idx + 1].split(" ").map((v) => {
    if (+v) return [+v, k, 1];
    return [+v, 0, 0];
  })
);
const sharks = new Array(M).fill().map((_, idx) => new Shark(idx + 1));

sharks.forEach((shark, idx) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j][0] === idx + 1) shark.setPosition(i, j);
    }
  }
});

const firstDirections = input[N + 1].split(" ").map(Number);
firstDirections.forEach((dir, idx) => sharks[idx].setDir(dir - 1));

for (let i = N + 2; i < input.length; i++) {
  const id = Math.floor((i - N + 2) / 4) - 1;
  const idx = (i - N + 2) % 4;
  const dir = input[i].split(" ").map((v) => v - 1);
  sharks[id].setPriority(idx, dir);
}

const isInRange = (nx, ny) => {
  if (0 > nx || nx >= N || 0 > ny || ny >= N) return false;
  return true;
};

const leaveSmell = (map, sharks) => {
  for (let shark of sharks) {
    if (shark.isDriveAway) continue;

    const { x, y, id } = shark;

    if (map[x][y][0] === 0) {
      map[x][y] = [id, k, 1];
      continue;
    }

    if (map[x][y][0] > id) map[x][y] = [id, k, 1];
    else if (map[x][y][0] === id) map[x][y] = [id, k, 1];
    else shark.driveAway();
  }
};

const decreaseSmellTime = (map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j][1] || map[i][j][2]) continue;

      map[i][j][1]--;

      if (map[i][j][1] === 0) map[i][j][0] = 0;
    }
  }
};

const checkRemainingSharks = (sharks) => {
  let remainingShark = M;

  for (let shark of sharks) {
    if (shark.isDriveAway) remainingShark--;
  }

  return remainingShark;
};

const moveShark = (initialMap, initialSharks, time) => {
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];

  const q = [[initialMap, initialSharks, time + 1]];

  while (q.length) {
    const [map, sharks, time] = q.shift();

    for (let i = 0; i < M; i++) {
      const shark = sharks[i];

      if (shark.isDriveAway) continue;

      const candidates = [];
      const ownSmellPlaces = [];

      for (let dir of shark.priority[shark.dir]) {
        let nx = shark.x + DX[dir];
        let ny = shark.y + DY[dir];

        if (!isInRange(nx, ny)) continue;

        if (map[nx][ny][0] === 0) candidates.push(dir);
        else if (map[nx][ny][0] === shark.id) ownSmellPlaces.push(dir);
      }

      let nextDir = shark.findNextDir(candidates);
      if (!candidates.length) nextDir = shark.findNextDir(ownSmellPlaces);

      map[shark.x][shark.y] = [shark.id, k, 0];

      shark.setPosition(shark.x + DX[nextDir], shark.y + DY[nextDir]);
      shark.setDir(nextDir);
    }

    leaveSmell(map, sharks);
    decreaseSmellTime(map);

    if (checkRemainingSharks(sharks) === 1) {
      console.log(time);
      return;
    }

    if (time >= 1000) {
      console.log(-1);
      return;
    }

    q.push([map, sharks, time + 1]);
  }
};

moveShark(map, sharks, 0);
