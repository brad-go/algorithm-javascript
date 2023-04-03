# 19236. 청소년 상어

## 문제 링크

https://www.acmicpc.net/problem/19236

## 문제 분류

: 구현, 백트래킹

## 소요 시간

: 3시간

## 풀이 방법

물고기들을 어떻게 관리할지가 고민이었다. 물고기들이 순서대로 이동해야하는 반면, 4 x 4의 공간인 2차원 배열 내에 물고기가 위치하고 있어야 했기에, 이 공간에 물고기를 표시할지 말지가 고민이었다.

나는 물고기 배열을 따로 관리하면서 이 2차원 배열도 같이 관리해주기로 했다. 하나의 상태를 만들고 그 안에 fishes(물고기들), shark(상어), sea(2차원 공간), eaten(먹은 물고기 번호의 합)을 관리하기로 결정했다.

우선, 물고기들을 이동시키는 moveFish 함수를 생성했다. 현재 상태를 받아서 sea, fishes를 복사하고, 각 물고기를 이동시킨 새로운 상태를 반환하는 함수이다.

각 물고기는 현재 가진 방향으로 이동하며 만약 공간을 벗어나거나 상어가 있는 곳이라면 방향을 반시계 방향으로 45도 회전시킨다. 이동하려고 하는 방향이 빈 곳이라면 물고기를 해당위치를 이동시키고, 물고기가 있는 곳이라면 해당 물고기와 위치를 교환한다. 이 과정에서 sea와 fishes 배열 모두를 갱신해줘야한다.

그 다음은 상어가 이동할 수 있는 위치를 찾는 함수 findMovablePositions를 생성했다.
공간 내에서 현재 상어가 가진 방향으로 뻗어나가며 물고기가 있는 위치를 찾아주는 함수이다.

마지막으로 상어를 이동시키는 함수 moveShark를 생성했다. 상어가 이동할 위치의 물고기를 찾고, fishes와 sea에서는 해당 물고기를 제거한다. 상어의 위치와 방향을 해당 물고기를 통해 갱신하고, 상어가 먹은 물기의 번호를 갱신해준다.

1. 바다(2차원 공간), 상어, 물고기들을 생성한다.
2. 상어가 [0, 0]에 위치한 물고기를 먹는다.
3. 물고기들을 차례로 이동시키기 위해 번호를 기준으로 정렬한다.
4. dfs로 아래를 진행시킨다.
5. 물고기들을 이동시킨다.
6. 상어가 이동할 수 있는 위치를 찾는다.
7. 이동할 수 있는 위치가 없다면 먹은 물고기 번호의 최댓값을 반환하고 종료
8. 이동할 수 있는 위치로 각각 상어를 이동시키면서 이동할 수 있는 위치가 없을 때까지 진행한다.

## 풀이 코드

```js
// 방향
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
  // 초기 상태
  const initialState = init(fishInfo);
  // 상어가 0, 0에 위치한 물고기를 먹는다.
  const state = moveShark(initialState, 0, 0);

  // 물고기를 차례로 이동시키기 위해 번호 순으로 정렬
  state.fishes.sort((a, b) => a.id - b.id);

  // 먹은 물고기 번호 합의 최댓값을 담을 변수
  let answer = 0;

  // 현재 상태를 기준으로 dfs 탐색
  const dfs = (state) => {
    // 물고기를 이동시키기
    const newState = moveFishes(state);
    // 상어가 이동할 수 있는 위치 찾기
    const movablePositions = findMovablePositions(newState);

    // 이동할 수 있는 위치가 없다면 종료
    if (!movablePositions.length) {
      answer = Math.max(answer, newState.eaten);

      return;
    }

    // 이동할 수 있는 위치로 상어를 이동시키면서 탐색 진행
    movablePositions.forEach(([r, c]) => dfs(moveShark(newState, r, c)));
  };

  dfs(state);

  return answer;
};

const init = (fishInfo) => {
  const fishes = createFishes(fishInfo);
  const shark = createShark({ row: 0, column: 0 });
  const sea = createSea(4);

  // 물고기 배열의 물고기들을 공간에 위치시키기
  fishes.forEach((fish) => (sea[fish.r][fish.c] = fish));

  return { sea, shark, fishes, eaten: 0 };
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

const createShark = ({ row, column, direction = null }) => {
  return { r: row, c: column, dir: direction };
};

const createSea = (n) => {
  return Array.from(Array(n), () => Array(n).fill(null));
};

// 입력받은 위치로 상어 이동시키기
const moveShark = (state, row, column) => {
  const { fishes } = state;

  // 잡아먹힌 물고기 찾기
  const targetFish = fishes.find(({ r, c }) => r === row && c === column);
  // 잡아먹힌 물고기를 제외한 나머지 물고기들
  const newFishes = fishes.filter(({ r, c }) => r !== row || c !== column);
  const newSea = createSea(4);
  // 상어 위치 및 방향 갱신
  const newShark = createShark({
    row: targetFish.r,
    column: targetFish.c,
    direction: targetFish.dir,
  });

  // 바다도 잡아먹힌 물고기를 제외한 나머지 물고기들만 남겨주기
  newFishes.forEach((fish) => {
    newSea[fish.r][fish.c] = fish;
  });

  // 새로운 상태 반환
  return {
    sea: newSea,
    shark: newShark,
    fishes: newFishes,
    // 먹은 물고기 번호 추가
    eaten: state.eaten + targetFish.id,
  };
};

// 물고기들 이동 시키기
const moveFishes = (state) => {
  const { sea, fishes } = state;

  // 이전 값에 영향을 주지 않기 위해 복사하기
  const newSea = sea.map((row) => [...row]);
  const newFishes = fishes.map((fish) => ({ ...fish }));

  state.sea = newSea;
  state.fishes = newFishes;

  // 물고기들을 순서대로 이동시키기
  newFishes.forEach((fish) => moveFish(state, fish));

  return state;
};

const moveFish = (state, fish) => {
  const { sea, shark, fishes } = state;

  // 45도씩 반시계 방향으로 회전시키면서 물고기 이동시키기
  for (let i = 0; i < 8; i++) {
    const [dr, dc] = directions[fish.dir];
    const nr = fish.r + dr;
    const nc = fish.c + dc;

    // 공간을 벗어나지 않고 상어가 있는 곳이 아니라면
    if (isInSea(nr, nc) && !isShark(shark, nr, nc)) {
      // 이동하려는 칸이 빈 칸이라면
      if (sea[nr][nc] === null) {
        sea[fish.r][fish.c] = null;
        sea[nr][nc] = fish;
        fish.r = nr;
        fish.c = nc;
        // 이동하려는 칸이 물고기가 있는 칸이라면
      } else {
        const targetFish = fishes.find(({ r, c }) => r === nr && c === nc);

        sea[fish.r][fish.c] = targetFish;
        sea[nr][nc] = fish;
        targetFish.r = fish.r;
        targetFish.c = fish.c;
        fish.r = nr;
        fish.c = nc;
      }

      return;
    }

    // 물고기 방향 반시계로 회전시키기
    fish.dir = (fish.dir + 1) % 8;
  }
};

const isInSea = (row, column) => {
  return 0 <= row && row < 4 && 0 <= column && column < 4;
};

const isShark = (shark, row, column) => {
  return shark.r === row && shark.c === column;
};

// 상어가 이동할 수 있는 위치 찾기
const findMovablePositions = (state) => {
  const { sea, shark } = state;
  const { r, c, dir } = shark;
  const [dr, dc] = directions[dir];
  const positions = [];

  let nr = r + dr;
  let nc = c + dc;

  // 공간 내에 위치만 찾기
  while (isInSea(nr, nc)) {
    positions.push([nr, nc]);

    nr = nr + dr;
    nc = nc + dc;
  }

  // 물고기가 있는 곳만 이동 가능!
  return positions.filter(([r, c]) => isFish(sea, r, c));
};

const isFish = (sea, row, column) => {
  return sea[row][column] !== null;
};
```

## 코드 개선

```js
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
```
