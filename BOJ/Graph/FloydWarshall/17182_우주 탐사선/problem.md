# 우주 탐사선 - 17182

[문제 링크](https://www.acmicpc.net/problem/17182)

## 문제 풀이

N의 범위가 작고, 각 모든 행성에서의 다른 행성으로의 소요 시간이 필요했기에 플로이드 와샬 알고리즘을 이용해주었다.

```js
const N = 4;
const INF = Number.MAX_SAFE_INTEGER;

const graph = [
  [0, 5, INF, 8],
  [7, 0, 9, INF],
  [2, INF, 0, 4],
  [INF, INF, 3, 0],
];

const floyedWarshall = () => {
  // 결과 그래프 초기화
  const result = graph.map((line) => line.map((v) => v));

  // k = 거쳐가는 노드
  for (let k = 0; k < N; k++) {
    // i = 출발 노드
    for (let i = 0; i < N; i++) {
      // j = 도착 노드
      for (let j = 0; j < N; j++) {
        // 출발 노드 -> 도착 노드 vs 출발 노드 -> 거쳐가는 노드 -> 도착노드 의 비용을 비교
        if (result[i][k] + result[k][j] < result[i][j]) {
          result[i][j] = result[i][k] + result[k][j];
        }
      }
    }
  }

  // 결과 출력
  result.forEach((line) => console.log(line.join(" ")));
};

floyedWarshall();
```

### 풀이 설명

1. 플로이드 와샬 알고리즘을 통해 모든 정점에서 다른 정점을 향한 최소 시간을 구해준다.
2. 백트래킹을 이용해서 입력받은 시작 위치에서의 모든 행성을 탐사하기 위한 최소 시간을 구해준다.

### 전체 코드

```js
// prettier-ignore
const [nk, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K] = nk.split(" ").map(Number);
const graph = input.map((line) => line.split(" ").map(Number));

function solution(N, K, graph) {
  // 모든 정점에서 다른 정점을 향한 최소 시간 초기화
  const exploration = floydWarshall(N, graph);
  const visited = new Array(N).fill(false);
  visited[K] = true;

  // 백트래킹을 이용해서 시작 행성에서부터 모든 행성을 탐사하기 위한 최소 시간 구하기
  const explorationTimes = backTracking(exploration, visited, K, 0, 1, []);
  return Math.min(...explorationTimes);
}

const floydWarshall = (N, graph) => {
  const d = [...graph.map((line) => [...line])];

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // i -> k -> j와 i -> j로 가는 비용을 비교한 뒤 더 낮은 것으로 갱신
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
      }
    }
  }

  return d;
};

const backTracking = (graph, visited, vertex, time, cnt, explorationTimes) => {
  // 모든 행성을 탐사했다면
  if (cnt === N) {
    // 현재 소요 시간을 반환
    explorationTimes.push(time);
    return explorationTimes;
  }

  // 현재 행성에서 다른 행성으로의 시간 더하며 탐사하기
  for (let i = 0; i < graph[vertex].length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    backTracking(graph, visited, i, time + graph[vertex][i], cnt + 1, explorationTimes); // prettier-ignore
    visited[i] = false;
  }

  return explorationTimes;
};

console.log(solution(N, K, graph));
```
