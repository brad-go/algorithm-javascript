# 인터넷 설치 - 1800

[문제 링크](https://www.acmicpc.net/problem/1800)

## 문제 풀이

dfs 방식으로 문제를 풀이해야 겠다고 생각하고 풀어봤는데, 시간 초과가 났다.

## 풀이 설명

1. 입력 값을 토대로 그래프를 생성한다.
2. 1번부터 연결된 것들을 dfs 탐색하고 방문 시마다 각각의 가중치들을 costs배열에 저장
3. 5번에 도착하면 costs배열을 오름차순으로 정렬하고, K만큼 뒤를 잘라낸다.
4. 가장 큰 가격을 minCosts 배열에 넣어준다.
5. minCosts 배열 중 가장 작은 것을 출력한다. 배열이 비었다면 -1 반환

## 전체 코드

```js
const [npk, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const [N, P, K] = npk.split(" ").map(Number);
const edges = input.map((line) => line.split(" ").map(Number));

function solution(N, edges) {
  const graph = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(0);
  const costs = [];
  const minCosts = [];

  addEdge(graph, edges);
  dfs(graph, visited, 1, costs, minCosts);

  return minCosts.length ? Math.min(...minCosts) : -1;
}

const addEdge = (graph, edgeList) => {
  edgeList.forEach(([from, to, cost]) => {
    graph[from].push({ linked: to, cost });
    graph[to].push({ linked: from, cost });
  });
};

const dfs = (graph, visited, current, costs, minCosts) => {
  visited[current] = 1;

  if (current === N) {
    const currentCosts = costs.slice().sort((a, b) => a - b).slice(0, -K); // prettier-ignore
    minCosts.push(currentCosts[currentCosts.length - 1]);
  }

  for (const { linked, cost } of graph[current]) {
    if (visited[linked]) continue;

    costs.push(cost);
    dfs(graph, visited, linked, costs, minCosts);
    costs.pop();
    visited[linked] = 0;
  }
};

console.log(solution(N, edges));
```
