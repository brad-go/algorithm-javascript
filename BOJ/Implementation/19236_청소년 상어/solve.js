const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

class Fish {
  constructor(x, y, num, dir, isAlive) {
    this.x = x;
    this.y = y;
    this.id = num;
    this.dir = dir;
    this.isAlive = isAlive;
  }

  swap(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Shark {
  constructor(eatenFish = 0) {
    this.x = null;
    this.y = null;
    this.dir = null;
    this.eatenFish = eatenFish;
  }

  hunt(fish) {
    this.x = fish.x;
    this.y = fish.y;
    this.dir = fish.dir;
    this.eatenFish += fish.id;
  }
}

// 0 부터 7 까지 순서대로 ↑, ↖, ←, ↙, ↓, ↘, →, ↗
const DX = [-1, -1, 0, 1, 1, 1, 0, -1];
const DY = [0, -1, -1, -1, 0, 1, 1, 1];
const N = 4;
let max = 0;

const isInRange = (nx, ny) => {
  if (0 <= nx && nx < N && 0 <= ny && ny < N) return true;
  return false;
};

// 빈 칸 혹은 다른 물고기가 있는 칸으로 이동
const moveFish = (fish, map, fishes) => {
  if (fish.isAlive === false) return;

  for (let i = 0; i < 8; i++) {
    // 움직일 수 있는 곳이 있을 때까지 반시계 방향으로 방향 회전
    let nextDir = (fish.dir + i) % 8;
    let nx = fish.x + DX[nextDir];
    let ny = fish.y + DY[nextDir];

    // 범위를 벗어나지 않고, 상어가 있는 곳이 아니라면
    if (isInRange(nx, ny) && map[nx][ny] > -1) {
      // 이동할 곳에 물고기가 없을 곳을 대비해 0으로 미리 만들어줌
      map[fish.x][fish.y] = 0;

      // 빈 칸이라면 물고기를 이동 시키기
      if (map[nx][ny] === 0) {
        fish.swap(nx, ny);
      } else {
        // 다음 위치에 있는 물고기
        const nextFish = fishes[map[nx][ny] - 1];
        nextFish.swap(fish.x, fish.y);

        // 현재 공간에 있던 물고기의 id를 바꾼 물고기의 id로 변경해주기
        map[fish.x][fish.y] = nextFish.id;

        fish.swap(nx, ny);
      }

      // 바꾸려고 했던 물고기가 있던 위치에 현재 물고기의 id로 변경해주기
      map[nx][ny] = fish.id;
      fish.dir = nextDir;
      return;
    }
  }
};

// 상어가 이동할 수 없을 때까지 반복
const eatFish = (map, shark, fishes) => {
  if (max < shark.eatenFish) max = shark.eatenFish;

  // 모든 물고기 순서대로 이동
  fishes.forEach((fish) => moveFish(fish, map, fishes));

  for (let dist = 1; dist < N; dist++) {
    let nx = shark.x + DX[shark.dir] * dist;
    let ny = shark.y + DY[shark.dir] * dist;

    if (isInRange(nx, ny) && map[nx][ny] > 0) {
      // 2차원 배열 깊은 복사
      const newMap = map.map((m) => [...m]);
      const newFishes = [...fishes];

      newMap[shark.x][shark.y] = 0;

      const fish = newFishes[map[nx][ny] - 1];
      const newShark = new Shark(shark.eatenFish);

      newShark.hunt(fish);
      fish.isAlive = false;

      // 상어가 이동할 것이므로 원래 있던 곳은 빈 칸이 되고, 물고기의 위치를 상어가 있다고 표시
      newMap[fish.x][fish.y] = -1;

      eatFish(newMap, newShark, newFishes);
    }
  }
};

function Solution(input) {
  // 현재 공간의 상태를 나타낼 배열
  const map = Array.from(Array(4), () => Array(4).fill(null));
  // 물고기들의 정보를 담을 배열
  const fishes = new Array(input.length / 2);

  for (let i = 0; i < input.length; i += 2) {
    const x = Math.floor(i / 8);
    const y = (i % 8) / 2;
    const num = input[i];
    const dir = input[i + 1] - 1;

    const fish = new Fish(x, y, num, dir, true);
    fishes[i / 2] = fish;
    // 현재 공간에 물고기들의 번호를 넣어준다.
    map[x][y] = fish.id;
  }

  // 물고기는 번호가 작은 순서부터 이동해야 하기 때문에 정렬해두기
  fishes.sort((a, b) => a.id - b.id);

  const fish = fishes[map[0][0] - 1];
  const shark = new Shark();

  // 물고기를 잡아먹는다. 물고기의 위치로 이동, 물고기의 방향을 가지게 되고, 먹은 양에 추가
  shark.hunt(fish);
  fish.isAlive = false;
  // 상어가 있는 곳을 -1로 표시
  map[0][0] = -1;

  eatFish(map, shark, fishes);
  console.log(max);
}

Solution(input);
