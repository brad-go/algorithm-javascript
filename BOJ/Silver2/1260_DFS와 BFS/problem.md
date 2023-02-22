# 1260. DFS와 BFS

## 문제 링크

https://www.acmicpc.net/problem/1260

## 문제 분류

: 그래프, 너비 우선 탐색, 깊이 우선 탐색

## 소요 시간

: 30분

## 풀이 방법

기본적인 DFS와 BFS를 이용해 문제를 풀이할 수 있었다.

1. 입력받은 간선 정보를 통해 그래프를 형성한다.
2. 문제의 조건에 따라 정점 번호가 작은 것부터 탐색해야하므로 그래프의 정점에 연결된 각 정점들을 오름차순 정렬한다.
3. DFS, BFS를 통해 탐색을 진행한다.
4. 탐색한 결과를 출력한다.

## 풀이 코드

```js
const solution = (N, M, V, edges) => {
  const graph = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(false);
  const results = { dfs: [], bfs: [] };

  // 간선 정보를 통해 그래프 형성
  edges.forEach(([vertexA, vertexB]) => {
    graph[vertexA].push(vertexB);
    graph[vertexB].push(vertexA);
  });

  // 각 정점에 연결된 정점들을 오름차순으로 정렬
  graph.forEach((vertices) => vertices.sort((a, b) => a - b));

  // dfs 탐색
  dfs(graph, visited, V, results);

  visited.fill(false);

  // bfs 탐색
  bfs(graph, visited, V, results);

  return `${results.dfs.join(" ")}\n${results.bfs.join(" ")}`;
};

const dfs = (graph, visited, index, results) => {
  if (visited[index]) return;

  visited[index] = true;
  results.dfs.push(index);

  for (const next of graph[index]) {
    if (visited[next]) continue;

    dfs(graph, visited, next, results);
  }
};

const bfs = (graph, visited, index, results) => {
  const queue = [index];

  visited[index] = true;

  while (queue.length) {
    const vertex = queue.shift();

    results.bfs.push(vertex);

    for (const next of graph[vertex]) {
      if (visited[next]) continue;

      visited[next] = true;
      queue.push(next);
    }
  }
};
```
