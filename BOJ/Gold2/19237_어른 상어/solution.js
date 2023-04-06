const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const grid = input.slice(1, N + 1).map((str) => str.split(' ').map(Number)); // prettier-ignore
const directions = input[N + 1].split(" ").map(Number);
const priorities = input.slice(N + 2).map((str) => str.split(' ').map((v) => v - 1)); // prettier-ignore

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const solution = (grid, directions, priorities, K) => {
  const state = init(grid, directions, priorities, K);

  while (state.sharks.length > 1) {
    state.grid = spraySmells(state.grid, state.sharks, K);
    state.sharks = moveSharks(state.grid, state.sharks);
    state.grid = decreaseSmell(state.grid);
    state.sharks = updateSharks(state.sharks);
    state.time += 1;

    if (state.time > 1000) return -1;
  }

  return state.time;
};

const init = (grid, directions, priorities, K) => {
  const state = {
    grid: createGrid(grid.length),
    sharks: createSharks(grid, directions, priorities),
    time: 0,
  };

  return state;
};

const createGrid = (length) => {
  return Array.from(Array(length), () => Array(length).fill(null));
};

const createSharks = (grid, directions, priorities) => {
  const sharks = [];

  grid.forEach((rows, row) => {
    rows.forEach((id, col) => {
      if (!id) return;

      const currentPriorities = priorities.slice((id - 1) * 4, id * 4);
      const shark = createShark({
        id,
        row,
        col,
        dir: directions[id - 1] - 1,
        priorities: currentPriorities,
      });

      sharks.push(shark);
    });
  });

  return sharks;
};

const createShark = ({ id, row, col, dir, priorities }) => {
  return {
    id,
    row,
    col,
    dir,
    priorities,
  };
};

const spraySmells = (grid, sharks, K) => {
  const newGrid = grid.map((row) => {
    return row.map((elem) => (elem ? { ...elem } : null));
  });

  sharks.forEach((shark) => spraySmell(newGrid, shark, K));

  return newGrid;
};

const spraySmell = (grid, shark, K) => {
  const { id, row, col } = shark;

  grid[row][col] = createSmell(id, K);
};

const createSmell = (shark, smell) => {
  return { shark, smell };
};

const moveSharks = (grid, sharks) => {
  const newSharks = sharks.map((shark) => moveShark(grid, shark));

  return newSharks;
};

const moveShark = (grid, shark) => {
  const adjacents = findNextPositions(grid, shark, isAdjacents);
  const ownSmellPositions = findNextPositions(grid, shark, isOwnSmell);

  updateSharkPosition(
    grid,
    shark,
    adjacents.length ? adjacents : ownSmellPositions
  );

  return shark;
};

const findNextPositions = (grid, shark, validateFunc) => {
  const { row, col } = shark;

  const positions = dirs.reduce((acc, [dr, dc], index) => {
    const nr = row + dr;
    const nc = col + dc;

    if (validateFunc(grid, nr, nc, shark)) {
      acc.push([nr, nc, index]);
    }

    return acc;
  }, []);

  return positions;
};

const isAdjacents = (grid, nr, nc) => {
  return isInGrid(grid.length, nr, nc) && !grid[nr][nc];
};

const isOwnSmell = (grid, nr, nc, shark) => {
  return (
    isInGrid(grid.length, nr, nc) &&
    grid[nr][nc] &&
    grid[nr][nc].shark === shark.id
  );
};

const updateSharkPosition = (grid, shark, positions) => {
  const { dir, priorities } = shark;

  if (positions.length === 1) {
    const [nr, nc, ndir] = positions[0];

    shark.row = nr;
    shark.col = nc;
    shark.dir = ndir;

    return;
  }

  for (const priorityDir of priorities[dir]) {
    const nrc = positions.find(([nr, nc, ndir]) => ndir === priorityDir);

    if (!nrc) continue;

    const [nr, nc, ndir] = nrc;

    if (!isInGrid(grid.length, nr, nc)) continue;

    shark.row = nr;
    shark.col = nc;
    shark.dir = ndir;
    break;
  }
};

const isInGrid = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const decreaseSmell = (grid) => {
  const newGrid = grid.map((row) => {
    return row.map((element) => {
      if (!element) return null;

      const { shark, smell } = element;

      return smell - 1 === 0 ? null : createSmell(shark, smell - 1);
    });
  });

  return newGrid;
};

const updateSharks = (sharks) => {
  const newSharks = sharks.reduce((acc, cur) => {
    const anotherShark = acc.find(
      ({ row, col }) => row === cur.row && col === cur.col
    );

    if (!anotherShark) {
      acc.push(cur);
      return acc;
    }

    if (cur.id < anotherShark.id) {
      const newAcc = acc.filter(({ id }) => id !== anotherShark.id);

      newAcc.push(cur);

      return newAcc;
    } else {
      return acc;
    }
  }, []);

  return newSharks;
};

console.log(solution(grid, directions, priorities, K));
