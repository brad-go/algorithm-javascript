# 14940. 쉬운 최단거리

## 문제 링크

https://www.acmicpc.net/problem/14940

## 문제 분류

: 그래프, 너비 우산 탐색

## 소요 시간

: 1시간 10분

## 풀이 방법

지도가 주어지면 모든 지점에 대해 목표까지의 거리를 구하는 문제 즉, 최단거리를 구하면 되는 문제였다.

그러므로 BFS를 사용해서 문제를 풀이할 수 있었는데, 목표 지점이 (0, 0)으로 고정이라는 생각에 문제를 풀이하는데 한참 걸렸다.

1. 목표 지점(map에서 2인 곳)의 좌표를 찾는다.
2. bfs 탐색을 통해 목표지점에서부터 갈 수 있는 모든 곳(1)에 대해 거리를 구한다.
3. 각 거리를 확인하면서 도달할 수 없는 곳은 -1로 표시한다.

## 풀이 코드

```js
const solution = (N, M, map) => {
  // 목표지점까지의 거리를 담을 배열
  const distances = Array.from(Array(N), () => Array(M).fill(0));
  // 목표지점의 위치 찾아주기
  const [sr, sc] = findTarget(N, M, map);

  // 목표 지점에서 bfs 탐색을 통해 거리 표시하기
  bfs(distances, map, sr, sc);

  // 도달할 수 없는 곳 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // 원래 갈 수 있는 곳이면서 bfs 탐색을 마친 후에 0인 곳은 도달할 수 없는 곳
      if (distances[i][j] === 0 && map[i][j] === 1) {
        distances[i][j] = -1;
      }
    }
  }

  return distances.map((row) => row.join(" ")).join("\n");
};

const findTarget = (N, M, map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) return [i, j];
    }
  }
};

const bfs = (distances, map, sr, sc) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[sr, sc, 0]];
  const visited = Array.from(Array(map.length), () =>
    Array(map[0].length).fill(false)
  );

  visited[sr][sc] = true;

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    // 위치에 도달하면 거리를 표시
    distances[r][c] = dist;

    // 상하좌우로 4방향 탐색을 진행
    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      // 지도를 벗어나거나 갈 수 없는 곳(0)이거나 방문한 곳이면 건너뛰기
      if (!isInRange(map, nr, nc) || !map[nr][nc] || visited[nr][nc]) continue;

      visited[nr][nc] = true;
      // 탐색 가능하다면 거리를 1 증가시키면서 계속 탐색
      queue.push([nr, nc, dist + 1]);
    }
  }
};

// 지도의 범위를 벗어나지 않는지 체크
const isInRange = (map, r, c) => {
  return 0 <= r && r < map.length && 0 <= c && 0 < map[0].length;
};
```
