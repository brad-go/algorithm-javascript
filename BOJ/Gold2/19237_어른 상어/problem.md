# 19237. 어른 상어

## 문제 링크

https://www.acmicpc.net/problem/19237

## 문제 분류

: 구현

## 소요 시간

: 3시간

## 풀이 방법

1. 상어가 한 마리가 남거나 시간이 1000초이상 지날때까지 아래를 반복한다.
2. 상어들이 격자 위의 자기 위치에 자신의 냄새를 뿌린다. 냄새는 shark라는 상어의 id와 K를 값으로 가진 smell이라는 프로퍼티로 이루어진다.
3. 상어가 이동한다. 상어를 이동시킬 때는 인접한 빈 공간이 있는지 확인하고 하나라면 그곳으로 이동, 여러 개라면 우선 순위에 따라 이동한다. 인접한 공간이 없다면 자신의 냄새가 있는 곳으로 이동한다. 자신의 냄새가 있는 공간이 하나라면 그곳으로 이동하고, 여러 개라면 우선 순위에 따라 이동한다.
4. 격자를 확인하면서 상어가 위치하지 않은 곳 중 냄새가 있는 곳에서 지속시간을 1씩 줄인다. 만약 0이되면 냄새를 제거한다.
5. 이동한 상어의 위치를 격자에 표시한다. 격자 표시를 늦게 하는 이유는 상어가 동시에 움직여야 하기 때문이다.

## 풀이 코드

```js
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
```
