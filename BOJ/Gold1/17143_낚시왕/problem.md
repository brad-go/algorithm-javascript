# 17143. 낚시왕

## 문제 링크

https://www.acmicpc.net/problem/17143

## 문제 분류

: 구현

## 소요 시간

: 2시간

## 풀이 방법

격자에서 낚시꾼이 매 초마다 서있는 열의 상어 중 가장 가까운 상어를 낚고, 상어들이 매초마다 각각의 속도를 가지고 움직일 때, 낚시꾼이 격자의 오른쪽 끝까지 갔을 때 낚은 상어 크기의 합을 구하는 문제였다.

이 문제는 낚시꾼을 이동시키고, 상어를 잡고, 상어를 이동시키는 방식으로 문제를 풀이할 수 있다. 그러나 반복문을 통해 풀이하게 되면 시간 초과가 발생한다. 이 시간 초과를 줄이기 위해서는 상어의 반복적인 좌우, 상하 이동을 줄일 수 있는 방법이 필요하다.

상어는 속도만큼 해당 방향으로 칸을 이동한다. 벽에 부딪히면 반대 방향으로해서 이동한다. 그러므로 격자의 크기가 넘는 속도를 가졋을 때, 상어는 좌우나 상하로 반복하게 된다. 이 반복을 줄여주기만 하면 된다.

상어 이동의 반복을 줄여야 한다는 것은 쉽게 떠올릴 수 있지만, 반복을 줄이는 아이디어가 쉽게 떠오르지 않았다. 여러가지 식을 대입해봤지만, 답을 찾기 어려웠다. 같이 한 번 답을 찾아보자.

C가 6이라고 생각해보자.

| index | 1   | 2   | 3   | 4   | 5   | 6   |
| ----- | --- | --- | --- | --- | --- | --- |
| shark |     |     |     | x   |     |     |

**방향이 오른쪽**일 때, 상어가 제자리로 돌아오려면 속도가 몇이어야 하는지 생각해보자.

속도가 `4`라면 제자리로 돌아온다. 또, 속도가 `10`이어도 제자리로 돌아온다.

**방향이 왼쪽**일 때, 상어가 제자리로 돌아올 수 있는 속도도 생각해보자.

속도가 `6`이라면 제자리로 돌아온다. 또, 속도가 `10`이어도 제자리로 돌아온다.

방향과 관계없이 속도가 `10`일 때, 상어는 제자리로 돌아온다. 우연일까? 다른 크기의 격자에서 다시 생각해보자. 이번에는 2의 위치에서 시작한다.

| index | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| shark |     | x   |     |     |     |     |     |     |     |

**방향이 오른쪽**일 때, 상어가 제자리로 돌아오려면 속도가 몇이어야 할까?

속도가 `14`라면 제자리로 돌아온다. 또, 속도가 `16`이어도 제자리로 돌아온다.

**방향이 왼쪽**일 때, 상어가 제자리로 돌아올 수 있는 속도도 생각해보자.

속도가 `2`라면 제자리로 돌아온다. 또, 속도가 `16`이어도 제자리로 돌아온다.

방향과 관계없이 속도가 `16`일 때, 상어는 제자리로 돌아온다. 위의 예시의 값과 크기가 다르므로 당연히 속도가 `10`일 수는 없다. 그러나 우리는 한가지 힌트를 찾을 수 있다. 상어가 해당 방향으로 진행 후 제자리로 돌아오고, 그대로 더 진행해서 제자리로 두번째 돌아올 때, 방향과 관계없이 상어는 모두 제자리로 돌아온다. 즉, **상어가 움직이기 시작해서 두번째 제자리로 돌아오는 속도는 방향과 관계없이 같다!**

이 값을 구할 수 있는 식을 만들어보자. 위의 식에서 C가 6일 때 10, 9일 때 16이었다. 그러므로 아래의 식을 도출할 수 있다.

```
10 = (6 - 1) * 2 = (C - 1) * 2
16 = (9 - 1) * 2 = (C - 1) * 2

상어가 제자리로 돌아오는 값 =  (C - 1) * 2
```

문제에서 속도는 1,000까지로 우리가 고려해야 할 반복횟수 중 가장 큰 수다. 우리는 위의 값을 이용해서 이 값을 줄여줄 수 있다. 속도를 위에서 구한 값으로 나눠주면 된다!

예를 들어 C가 6일 때, 속도가 14라고 생각해보자. C가 6일 때, 우리는 위의 식을 이용해서 속도가 10일 때 제자리로 돌아오는 것을 알고있다. 그렇다면 우리가 추가적으로 이동시킬 속도는 4뿐이다. 그러므로 다음과 같은 식을 도출할 수 있다.

```
속도 = 속도 % ((C - 1) * 2)
```

이 식을 처음에 입력을 받을 때 적용하면 우리는 최소한의 이동만으로 상어를 해당 속도만큼 이동시켜볼 수 있다.

문제 풀이는 다음과 같다.

1. 상어를 생성한다. 상어 생성 시에 속도는 최소한의 이동을 위해 상어가 제자리로 돌아노는 속도의 나머지 값으로 생성한다.
2. 낚시꾼을 왼쪽부터 오른쪽 끝까지 이동시키면서 아래를 반복한다.
3. 해당 열에서 가장 가까운 상어를 낚는다.
4. 각 상어를 각각의 속도로 이동시킨다. 만약 같은 칸에 상어가 멈추게 되면 크기가 큰 상어가 작은 상어를 잡아먹는다.

## 풀이 코드

```js
const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const solution = (R, C, M, sharks) => {
  if (M === 0) return 0;

  // 상어와 정답을 나타낼 상태
  const state = {
    sharks: sharks.map(([row, col, speed, dir, size], index) => {
      return createShark(index, row, col, speed, dir, size);
    }),
    answer: 0,
  };

  // 낚시꾼 왼쪽부터 오른쪽 끝까지 이동
  for (let i = 0; i < C; i++) {
    // 상어 낚기
    const catched = catchShark(state.sharks, i);

    // 잡은 상어가 있다면
    if (catched) {
      // 정답에 상어 크기만큼 추가
      state.answer += catched.size;
      // 잡힌 상어는 상어 배열에서 제외
      state.sharks = state.sharks.filter(({ id }) => id !== catched.id);
    }

    // 각 상어를 각각의 속도로 이동시키기
    state.sharks = moveSharks(R, C, state.sharks);
  }

  return state.answer;
};

// 상어 생성
const createShark = (id, row, column, speed, direction, size) => {
  // 상어가 제자리로 돌아오는 속도를 제외하고 남은 이동 값
  let restSpeed;

  // 방향이 상하라면 R을 이용해서 이동할 값 구하기
  if (direction < 3) restSpeed = speed % ((R - 1) * 2);
  // 방향이 좌우라면 C를 이용해서 이동할 값 구하기
  else restSpeed = speed % ((C - 1) * 2);

  return {
    id,
    r: row - 1,
    c: column - 1,
    speed: restSpeed,
    dir: direction - 1,
    size,
  };
};

// 가장 가까운 상어 낚기
const catchShark = (sharks, column) => {
  return sharks.filter(({ c }) => c === column).sort((a, b) => a.r - b.r)[0];
};

// 상어 이동시키기
const moveSharks = (R, C, sharks) => {
  const newSharks = [];
  // 방문 처리를 통해 같은 위치에 상어 판별
  const visited = new Map();

  // 상어들을 이동시키기
  sharks.forEach((shark) => {
    // 상어 이동
    const movedShark = moveShark(R, C, shark);
    const key = `${movedShark.r},${movedShark.c}`;
    const value = visited.get(key);

    // 만약 이미 같은 위치에 상어가 있고, 해당 위치의 상어보다 작다면 잡아 먹힘
    if (value && value.size > shark.size) return;

    visited.set(key, movedShark);
  });

  visited.forEach((shark) => newSharks.push(shark));

  return newSharks;
};

// 상어 이동
const moveShark = (R, C, shark) => {
  const { id, r, c, speed, dir, size } = shark;

  let nr = r;
  let nc = c;
  let ndir = dir;

  // 속도만큼 이동하기
  for (let i = 0; i < speed; i++) {
    const [dr, dc] = dirs[ndir];

    // 격자를 벗어나지 않는지 확인
    if (isInGrid(R, C, nr + dr, nc + dc)) {
      nr += dr;
      nc += dc;
      continue;
    }

    // 격자를 벗어나면 방향을 바꿔주기
    ndir = changeDirection(ndir);

    const [dr2, dc2] = dirs[ndir];

    nr += dr2;
    nc += dc2;
  }

  return { id, r: nr, c: nc, speed, dir: ndir, size };
};

const isInGrid = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && c < C;
};

const changeDirection = (direction) => {
  if (direction < 2) return direction === 0 ? 1 : 0;

  return direction === 2 ? 3 : 2;
};
```

## 코드 개선

상어들을 배열로 관리하는 것보다 2차원 배열을 통해 상어들이 있는 격자를 표현하는 방식으로 풀이하는 것이 더 효율적이었다.

```js
const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const solution = (R, C, M, sharks) => {
  if (M === 0) return 0;

  const grid = {
    current: init(R, C, sharks),
    next: null,
  };

  let answer = 0;

  for (let fisher = 0; fisher < C; fisher++) {
    // 상어가 한번만 이동할 수 있도록 새로운 그리드 생성
    grid.next = createGrid(R, C);
    // 잡은 상어의 크기 정답에 추가
    answer += catchShark(R, grid.current, fisher);

    // 상어들 이동시키기
    moveSharks(R, C, grid);

    // 현재 그리드를 이동한 상어들이 담긴 그리드로 갱신
    grid.current = grid.next;
  }

  return answer;
};

const init = (R, C, sharks) => {
  const grid = createGrid(R, C);

  sharks.forEach(([row, col, speed, dir, size]) => {
    const shark = createShark(row, col, speed, dir, size);

    grid[row - 1][col - 1] = shark;
  });

  return grid;
};

const createGrid = (R, C) => {
  return Array.from(Array(R), () => Array(C).fill(null));
};

const createShark = (row, column, speed, direction, size) => {
  // 상어의 스피드를 최솟값으로 만들기 위해, 제자리로 오는 값으로 모듈러 연산
  const rowMod = (R - 1) * 2;
  const colMod = (C - 1) * 2;

  return {
    r: row - 1,
    c: column - 1,
    speed: speed % (direction < 3 ? rowMod : colMod),
    dir: direction - 1,
    size,
  };
};

const catchShark = (R, grid, fisher) => {
  for (let i = 0; i < R; i++) {
    // 상어를 잡았다면 해당 칸의 상어를 없애고 크기 반환
    if (grid[i][fisher]) {
      const size = grid[i][fisher].size;

      grid[i][fisher] = null;

      return size;
    }
  }

  return 0;
};

const moveSharks = (R, C, grid) => {
  // 격자를 확인하면서
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (!grid.current[r][c]) continue;

      // 상어 이동시키기
      const movedShark = moveShark(R, C, grid.current[r][c]);
      // 이동한 상어의 위치와 크기
      const { r: row, c: col, size } = movedShark;

      // 이미 해당위치에 상어가 있고, 사이즈가 현재 상어보다 크다면 건너뛰기
      if (grid.next[row][col] && grid.next[row][col].size > size) continue;

      // 그리드에 상어 추가
      grid.next[row][col] = movedShark;
    }
  }
};

const moveShark = (R, C, shark) => {
  const { r, c, speed, dir, size } = shark;

  let nr = r;
  let nc = c;
  let ndir = dir;

  // 속도만큼 이동
  for (let i = 0; i < speed; i++) {
    const [dr, dc] = dirs[ndir];

    if (isInGrid(R, C, nr + dr, nc + dc)) {
      nr += dr;
      nc += dc;
      continue;
    }

    ndir = changeDirection(ndir);

    const [dr2, dc2] = dirs[ndir];

    nr += dr2;
    nc += dc2;
  }

  return { r: nr, c: nc, speed, dir: ndir, size };
};

const isInGrid = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && c < C;
};

const changeDirection = (direction) => {
  if (direction < 2) return direction === 0 ? 1 : 0;

  return direction === 2 ? 3 : 2;
};
```
