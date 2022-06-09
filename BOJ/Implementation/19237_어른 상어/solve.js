// 상어가 사는 공간에 여러마리의 상어들
// 상어는 1이상 M이하의 각기 다른 번호를 가짐
// 1의 번호를 가진 어른 상어가 다른 상어를 모두 쫓아낼 수 있음

// N x N의 공간
// M개의 칸에 상어 한마리씩 존재
// 자신의 위치에 자신의 냄새를 뿌림
// 1초마다 상하좌우로 인접칸으로 이동하고 자신의 냄새를 그 칸에 뿌림
// 냄새는 상어가 k번 이동하고 나면 사라짐

// 이동 방식
// 인접한 칸 중 아무 냄새가 없는 칸의 방향으로 이동
// 그런 칸이 없다면 자신의 냄새가 있는 칸으로 이동
// 가능한 칸이 여러개라면 특정 우선 순위를 따름
// 우선 순위는 상어마다 다르고, 같은 상어여도 보는 방향에 따라 다르다.
// 상어가 처음 보는 방향은 입력으로 주어지고 그 후에는 방금 이동한 방향이 보고 있는 방향이 됨

// 모든 상어가 이동한 후 한 칸에 여러 마리의 상어가 남으면, 가장 작은 번호를 가진 상어를 제외하고 모두 격자 밖으로 쫓겨남

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
    // 후보지 중에 갈 수 있는 곳이 있다면 방향을 반환
    for (let i = 0; i < 4; i++) {
      if (candidates.includes(this.priority[this.dir][i]))
        return this.priority[this.dir][i];
    }
    // 없다면 0 반환
    return 0;
  }

  driveAway() {
    this.isDriveAway = true;
  }
}

const [N, M, k] = input[0].split(" ").map(Number);
const map = new Array(N).fill().map((_, idx) =>
  input[idx + 1].split(" ").map((v) => {
    // 상어 번호, 냄새 지속 시간, 상어가 있는지 없는지
    if (+v) return [+v, k, 1];
    else return [+v, 0, 0];
  })
);
const sharks = new Array(M).fill().map((_, idx) => new Shark(idx + 1));

// 상어의 위치 입력 받기
sharks.forEach((shark, idx) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j][0] === idx + 1) shark.setPosition(i, j);
    }
  }
});

// 첫 방향 입력받기
const firstDirections = input[N + 1].split(" ").map(Number);
firstDirections.forEach((dir, idx) => sharks[idx].setDir(dir - 1));

// 상어의 각 방향별 우선 순위 입력받기
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

// 냄새 남기는 함수
const leaveSmell = (map, sharks) => {
  for (let shark of sharks) {
    if (shark.isDriveAway) continue;

    const { x, y, id } = shark;

    // 현재 지도에 상어가 있는 곳에 상어의 번호와 냄새를 남긴다.
    if (map[x][y][0] === 0) {
      map[x][y] = [id, k, 1];
      continue;
    }

    // 상어의 번호가 기존에 위치한 상어보다 작다면 갱신
    if (map[x][y][0] > id) map[x][y] = [id, k, 1];
    // 상어가 갈 곳이 없어 자기 냄새 쪽으로 이동했다면 갱신
    else if (map[x][y][0] === id) map[x][y] = [id, k, 1];
    // 상어가 기존에 위치한 상어보다 번호가 크다면 내쫓기
    else shark.driveAway();
  }
};

// 냄새 지속 시간을 줄이는 함수
const decreaseSmellTime = (map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j][1] || map[i][j][2]) continue;

      map[i][j][1] -= 1;

      if (map[i][j][1] === 0) map[i][j][0] = 0;
    }
  }
};

// 현재 남아 있는 상어의 번호를 반환하는 함수
const checkRemainingSharks = (sharks) => {
  let remainingShark = M;

  for (let shark of sharks) {
    if (shark.isDriveAway) remainingShark--;
  }

  return remainingShark;
};

// BFS를 통해 진행하기
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

        // 범위 체크
        if (!isInRange(nx, ny)) continue;

        // 갈 수 있는 곳이 있다면
        if (map[nx][ny][0] === 0) candidates.push(dir);
        // 갈 수 있는 곳이 자신의 냄새가 있는 곳 뿐이라면
        else if (map[nx][ny][0] === shark.id) ownSmellPlaces.push(dir);
      }

      // 다음 방향을 담을 변수
      let nextDir;

      // 후보지가 있다면 다음 방향은 nextDir
      if (candidates.length) nextDir = shark.findNextDir(candidates);
      // 후보지가 없다면 자기 냄새가 있는 쪽으로 방향을 틈
      else nextDir = shark.findNextDir(ownSmellPlaces);

      // 이전 위치의 상어 존재 여부 false
      map[shark.x][shark.y] = [shark.id, k, 0];

      // 상어가 보는 방향과 위치 설정
      shark.setPosition(shark.x + DX[nextDir], shark.y + DY[nextDir]);
      shark.setDir(nextDir);
    }

    // 다음 위치에 상어의 냄새 남기기
    leaveSmell(map, sharks);

    // 맵 전체에 상어가 없는 곳에 냄새 시간 줄이기
    decreaseSmellTime(map);

    // console.log("turn", time);
    // console.log(map);

    // 남아있는 상어 확인하기
    if (checkRemainingSharks(sharks) === 1) {
      console.log(time);
      return;
    }

    // 1000초가 넘어도 다른 상어가 격자에 남아있으면 -1 출력
    if (time > 1000) {
      console.log(-1);
      return;
    }

    q.push([map, sharks, time + 1]);
  }
};

moveShark(map, sharks, 0);
