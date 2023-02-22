# 2667. 단지 번호 붙이기

## 문제 링크

https://www.acmicpc.net/problem/2667

## 문제 분류

: 그래프, 너비 우선 탐색, 깊이 우선 탐색

## 소요 시간

: 40분

## 풀이 방법

1. 지도에서 1인 지점에서 bfs 탐색을 진행한다. 이때 이미 방문한 곳이라면 건너뛴다.
2. 연결된 곳을 상화좌우로 탐색하면서 집의 개수를 세어서 반환한다.
3. 단지의 아파트 수들이 담긴 배열을 오름차순 정렬하고, 총 단지 수와 각 단지의 집의 수를 출력한다.

## 풀이 코드

```js
const solution = (N, map) => {
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  // 단지 별 집의 수를 담을 배열
  const houseCounts = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 집이 없거나 이미 방문한 곳은 건너뛰기
      if (map[i][j] === 0 || visited[i][j]) continue;

      // bfs 탐색이 진행되는 곳은 연결된 집들이다.
      // 연결된 집의 수를 세어서 단지 별 집의 수 배열에 넣어준다.
      houseCounts.push(bfs(map, visited, i, j));
    }
  }

  // 단지 별 집의 수를 오름차순 정렬
  houseCounts.sort((a, b) => a - b);

  // 단지의 수와 집의 수들을 출력
  return [houseCounts.length, ...houseCounts].join("\n");
};

const bfs = (map, visited, sr, sc) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[sr, sc]];

  visited[sr][sc] = 1;

  // 단지에 속한 집의 수, 이미 한 곳을 방문했으니 1부터 시작
  let count = 1;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInRange(N, nr, nc) || visited[nr][nc] || !map[nr][nc]) continue;

      // 다음 집을 방문하면서 집의 수를 늘린다.
      visited[nr][nc] = 1;
      count++;

      queue.push([nr, nc]);
    }
  }

  // 단지 내 집의 수를 반환
  return count;
};

const isInRange = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};
```
