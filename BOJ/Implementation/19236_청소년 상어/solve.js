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

const moveFish = (fish, map, fishes) => {
  if (fish.isAlive === false) return;

  for (let i = 0; i < 8; i++) {
    let nextDir = (fish.dir + i) % 8;
    let nx = fish.x + DX[nextDir];
    let ny = fish.y + DY[nextDir];

    if (isInRange(nx, ny) && map[nx][ny] > -1) {
      map[fish.x][fish.y] = 0;

      if (map[nx][ny] === 0) {
        fish.swap(nx, ny);
      } else {
        const nextFish = fishes[map[nx][ny] - 1];
        nextFish.swap(fish.x, fish.y);

        map[fish.x][fish.y] = nextFish.id;

        fish.swap(nx, ny);
      }

      map[nx][ny] = fish.id;
      fish.dir = nextDir;
      return;
    }
  }
};

const eatFish = (map, shark, fishes) => {
  if (max < shark.eatenFish) max = shark.eatenFish;

  fishes.forEach((fish) => moveFish(fish, map, fishes));

  for (let dist = 1; dist < N; dist++) {
    let nx = shark.x + DX[shark.dir] * dist;
    let ny = shark.y + DY[shark.dir] * dist;

    if (isInRange(nx, ny) && map[nx][ny] > 0) {
      const newMap = map.map((m) => [...m]);
      const newFishes = fishes.map(
        ({ x, y, id, dir, isAlive }) => new Fish(x, y, id, dir, isAlive)
      );

      const fish = newFishes[map[nx][ny] - 1];
      const newShark = new Shark(shark.eatenFish);

      newShark.hunt(fish);
      fish.isAlive = false;

      newMap[shark.x][shark.y] = 0;
      newMap[fish.x][fish.y] = -1;

      eatFish(newMap, newShark, newFishes);
    }
  }
};

function Solution(input) {
  const map = Array.from(Array(4), () => Array(4).fill(null));
  const fishes = new Array(input.length / 2);

  for (let i = 0; i < input.length; i += 2) {
    const x = Math.floor(i / 8);
    const y = (i % 8) / 2;
    const num = input[i];
    const dir = input[i + 1] - 1;

    const fish = new Fish(x, y, num, dir, true);
    fishes[i / 2] = fish;
    map[x][y] = fish.id;
  }

  fishes.sort((a, b) => a.id - b.id);

  const fish = fishes[map[0][0] - 1];
  const shark = new Shark();

  shark.hunt(fish);
  fish.isAlive = false;
  map[0][0] = -1;

  eatFish(map, shark, fishes);
  console.log(max);
}

Solution(input);
