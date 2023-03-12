# 16236. 아기 상어

## 문제 링크

https://www.acmicpc.net/problem/16236

## 문제 분류

: 구현, 그래프, 너비 우선 탐색

## 소요 시간

: 40분

## 풀이 방법

1. 상어의 처음 위치를 찾고 상어를 객체로 생성한다.
2. 상어가 더 이상 먹을 물고기가 없을 때까지 아래를 반복한다.
3. BFS로 자신보다 크기가 작은 물고기들을 찾는다.
4. 가장 거리가 가깝고, 맨 위, 맨 왼쪽의 물고기를 찾아서 먹는다.
5. 먹은 물고기의 수가 상어의 크기만큼이라면 상어 크기가 1 증가한다.

## 풀이 코드

```js
const solution = (N, space) => {
  // 상어가 있는 바다
  const sea = space.map((row) => [...row]);
  // 상어
  const shark = createShark(N, sea);

  let time = 0;

  while (true) {
    // 먹을 수 있는 물고기들
    const edibleFish = moveShark(N, sea, shark);

    // 없다면 엄마 상어 호출
    if (!edibleFish.length) break;

    // 물고기 먹기
    const moveTime = eatFish(sea, edibleFish, shark);
    const { size, eaten } = shark;

    // 상어 사이즈가 먹은 물고기의 수와 같다면 상어 크기 + 1
    if (size === eaten) {
      shark.size += 1;
      shark.eaten = 0;
    }

    // 물고기를 먹기 위해 이동한 시간을 더해주기
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

// bfs로 상어 이동
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

    // 먹을 수 있는 물고기라면
    if (isEdible(sea, r, c, shark.size)) {
      edibleFish.push([r, c, dist]);
    }

    // 상하좌우로 퍼져나가면서 바다 탐색
    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      // 바다를 벗어나거나 상어보다 큰 물고기이고 방문한 곳이면 탐색 안함
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
  // 물고기가 있고 상어 크기보다 작다면
  return sea[r][c] && sea[r][c] < sharkSize;
};

const isInSea = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const isBiggerThanShark = (fishSize, sharkSize) => {
  return fishSize > sharkSize;
};

// 가장 가까운 물고기를 찾아서 먹기
const eatFish = (sea, edibleFish, shark) => {
  // 가장 가까운 물고기 찾기
  const [r, c, distance] = findNearestFish(edibleFish);

  // 상어가 해당 위치로 이동 후 먹기
  shark.r = r;
  shark.c = c;
  shark.eaten += 1;
  sea[r][c] = 0;

  return distance;
};

const findNearestFish = (edibleFish) => {
  // 가장 가깝고, 위에 있고, 왼쪽에 있는 순으로 정렬
  edibleFish.sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);

  return edibleFish[0];
};
```
