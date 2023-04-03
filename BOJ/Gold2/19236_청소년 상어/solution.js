const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input4.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const fishInfo = input.map((str) => str.split(" ").map(Number));

const directions = [
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
];

const solution = (fishInfo) => {
  const initialState = init(fishInfo);
  const state = huntFish(initialState, initialState.fishes[0]);

  state.fishes.sort((a, b) => a.id - b.id);

  let answer = 0;

  const dfs = (prevState) => {
    const state = moveFishes(prevState);
    const movablePositions = findMovablePosition(state.sea, state.shark);

    if (!movablePositions.length) {
      answer = Math.max(answer, state.shark.eaten);
      return;
    }

    movablePositions.forEach(([r, c]) => dfs(moveShark(state, r, c)));
  };

  dfs(state);

  return answer;
};

const init = (fishInfo) => {
  const sea = createSea(4);
  const shark = createShark({ row: 0, column: 0 });
  const fishes = createFishes(fishInfo);

  fishes.forEach(({ id, r, c }) => (sea[r][c] = id));

  return { sea, shark, fishes };
};

const createFishes = (fishInfo) => {
  const fishes = [];

  fishInfo.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex, origin) => {
      if (columnIndex % 2) return;

      const newFish = createFish({
        id: column,
        row: rowIndex,
        column: columnIndex / 2,
        direction: origin[columnIndex + 1] - 1,
      });

      fishes.push(newFish);
    });
  });

  return fishes;
};

const createFish = ({ id, row, column, direction }) => {
  return { id, r: row, c: column, dir: direction };
};

const createShark = ({ row, column, direction = null, eaten = 0 }) => {
  return { r: row, c: column, dir: direction, eaten };
};

const createSea = (n) => {
  return Array.from(Array(n), () => Array(n).fill(null));
};

const huntFish = (state, fish) => {
  const { id, r, c, dir } = fish;

  const newSea = state.sea.map((row) => [...row]);
  const newShark = createShark({
    row: r,
    column: c,
    direction: dir,
    eaten: state.shark.eaten + id,
  });
  const newFishes = state.fishes.filter(({ id: fishId }) => fishId !== id);

  newSea[r][c] = null;

  return { sea: newSea, shark: newShark, fishes: newFishes };
};

const moveFishes = (prevState) => {
  const state = copyState(prevState);

  state.fishes.forEach((fish) => moveFish(state, fish));

  return state;
};

const copyState = (state) => {
  const { sea, shark, fishes } = state;
  const { r: row, c: column, dir: direction, eaten } = shark;

  return {
    sea: sea.map((row) => [...row]),
    shark: createShark({
      row,
      column,
      direction,
      eaten,
    }),
    fishes: fishes.map((fish) => ({ ...fish })),
  };
};

const moveFish = (state, fish) => {
  const { sea, shark, fishes } = state;

  for (let i = 0; i < 8; i++) {
    const ndir = (fish.dir + i) % 8;
    const [dr, dc] = directions[ndir];
    const nr = fish.r + dr;
    const nc = fish.c + dc;

    if (!isInSea(nr, nc) || isShark(shark, nr, nc)) continue;

    if (sea[nr][nc] === null) {
      sea[fish.r][fish.c] = null;
    } else {
      const targetFish = fishes.find(({ id }) => id === sea[nr][nc]);

      targetFish.r = fish.r;
      targetFish.c = fish.c;
      sea[fish.r][fish.c] = targetFish.id;
    }

    sea[nr][nc] = fish.id;
    fish.r = nr;
    fish.c = nc;
    fish.dir = ndir;

    return;
  }
};

const isShark = (shark, row, column) => {
  return shark.r === row && shark.c === column;
};

const findMovablePosition = (sea, shark) => {
  const { r, c, dir } = shark;
  const [dr, dc] = directions[dir];
  const positions = [];

  for (let dist = 1; dist < 4; dist++) {
    const nr = r + dr * dist;
    const nc = c + dc * dist;

    if (isInSea(nr, nc) && sea[nr][nc]) positions.push([nr, nc]);
  }

  return positions;
};

const isInSea = (row, column) => {
  return 0 <= row && row < 4 && 0 <= column && column < 4;
};

const moveShark = (state, row, column) => {
  const { sea, fishes } = state;
  const fish = fishes.find(({ id }) => id === sea[row][column]);

  return huntFish(state, fish);
};

console.log(solution(fishInfo));
