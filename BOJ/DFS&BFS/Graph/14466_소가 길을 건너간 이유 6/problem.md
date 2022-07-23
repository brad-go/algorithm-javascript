# 소가 길을 건너간 이유 6 - 14466

[문제 링크](https://www.acmicpc.net/problem/14466)

## 문제 풀이

#### 중요 포인트 2가지

- 길을 어떻게 나타낼 것인가?
- 만나지 못하는 두 소의 쌍을 어떻게 세어줄 것인가?

일반적인 BFS 방식이지만, 길이 있으면 지나가지 못하게 만들어야 했다. 그래서 코드 상에서 이를 나타낼 것인가가 핵심이었던 것 같다.

BFS가 아니라면 다익스트라로도 풀 수 있을 것 같은데, 구현하지는 못했다.

### 풀이 설명

1. 목초지를 나타낼 2차원 배열의 각 요소에 상, 하, 좌, 우 방향을 나타낼 배열을 할당해 3차원 배열 map 생성
2. 입력받은 길에 대한 정보와 사방탐색을 통해 길을 표시한다.
3. 각 소들의 위치에 대해 bfs탐색을 진행한다.
4. 탐색 시 마다 다음 소들의 위치에 방문할 수 있었는지 확인한 후에 방문하지 못했다면 못 만나는 두 소의 쌍의 수를 증가시킨다.

### 전체 코드

#### BFS 풀이

```js
// prettier-ignore
const [nkr, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K, R] = nkr.split(" ").map(Number);
const roads = input.slice(0, R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore
const cows = input.slice(R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore

const DR = [0, 1, 0, -1];
const DC = [1, 0, -1, 0];

function solution(N, K, R, roads, cows) {
  const map = Array.from(Array(N), () => Array(N).fill().map(() => Array(4).fill(0))); // prettier-ignore
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  let count = 0; // 길을 건너지 못하면 만나지 못하는 두 소들의 쌍의 수

  // 길 생성하기
  makeRoad(map, roads);

  cows.forEach(([sr, sc], cur) => {
    visited.map((visit) => visit.fill(0));
    bfs(map, visited, sr, sc);

    // 중복되는 소의 쌍이 나오지 않기 위해 다음 소들과만 비교해준다.
    for (let i = cur + 1; i < K; i++) {
      if (!visited[cows[i][0]][cows[i][1]]) count++;
    }
  });

  return count;
}

const makeRoad = (map, roads) => {
  roads.forEach((road) => {
    const [r, c, r2, c2] = road;

    for (let dir = 0; dir < 4; dir++) {
      let nr = r + DR[dir];
      let nc = c + DC[dir];

      if (nr === r2 && nc === c2) {
        map[r][c][dir] = 1; // 길 생성
        map[r2][c2][(dir + 2) % 4] = 1; // 반대 방향에서도 생성
      }
    }
  });
};

const bfs = (map, visited, sr, sc) => {
  const q = [[sr, sc]];
  visited[sr][sc] = 1;

  while (q.length) {
    const [r, c] = q.shift();

    for (let dir = 0; dir < 4; dir++) {
      if (map[r][c][dir] === 1) continue; // 길이 있는 건 탐색을 하지 않고 건너뜀

      let nr = r + DR[dir];
      let nc = c + DC[dir];

      if (!isInRange(nr, nc) || visited[nr][nc]) continue;

      visited[nr][nc] = 1;
      q.push([nr, nc]);
    }
  }
};

const isInRange = (r, c) => {
  if (0 <= r && r < N && 0 <= c && c < N) return true;
  return false;
};

console.log(solution(N, K, R, roads, cows));
```

#### DFS 풀이

```js
const [nkr, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [N, K, R] = nkr.split(" ").map(Number);
const roads = input.slice(0, R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore
const cows = input.slice(R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore

const DR = [0, 1, 0, -1];
const DC = [1, 0, -1, 0];

function solution(N, K, roads, cows) {
  const map = Array.from(Array(N), () => Array(N).fill().map(() => Array(4).fill(0))); // prettier-ignore
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  let count = 0;

  makeRoad(map, roads);

  cows.forEach(([r, c], cur) => {
    visited.forEach((visit) => visit.fill(0));
    dfs(map, visited, r, c);

    for (let i = cur + 1; i < K; i++) {
      if (!visited[cows[i][0]][cows[i][1]]) count++;
    }
  });

  return count;
}

const makeRoad = (map, roads) => {
  roads.forEach((road) => {
    const [startR, startC, endR, endC] = road;

    for (let dir = 0; dir < 4; dir++) {
      let nextR = startR + DR[dir];
      let nextC = startC + DC[dir];

      if (nextR !== endR || nextC !== endC) continue;

      map[startR][startC][dir] = 1;
      map[nextR][nextC][(dir + 2) % 4] = 1;
    }
  });
};

const dfs = (map, visited, r, c) => {
  visited[r][c] = 1;

  for (let dir = 0; dir < 4; dir++) {
    if (map[r][c][dir]) continue;

    let nr = r + DR[dir];
    let nc = c + DC[dir];

    if (!isInRange(nr, nc) || visited[nr][nc]) continue;

    dfs(map, visited, nr, nc);
  }
};

const isInRange = (r, c) => {
  if (r < 0 || N <= r || c < 0 || N <= c) return false;
  return true;
};

console.log(solution(N, K, roads, cows));
```

#### 다익스트라 알고리즘 풀이

```js

```
