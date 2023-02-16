# 1240. 노드사이의 거리

## 문제 링크

https://www.acmicpc.net/problem/1240

## 문제 분류

: 트리, 그래프, 깊이 우선 탐색, 너비 우선 탐색

## 소요 시간

: 10분

## 풀이 방법

입력받은 정보를 통해 트리를 형성하고 각 쌍의 노드 간의 거리를 구하면 되는 문제였다.

1. 트리를 생성한다.
2. 입력받은 정보를 통해 트리를 채운다.
3. 거리를 알기 원하는 노드 쌍들의 거리를 깊이 우선 탐색을 통해 구한다.
4. 노드 쌍 중 한 노드에서 시작해 다른 노드에 도착할때까지의 가중치를 모두 더해서 거리를 구한다.

## 풀이 코드

```js
const solution = (N, edges, pairs) => {
  const tree = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(false);
  // 각 노드 쌍 사이의 거리를 담을 배열
  const distances = [];

  // 입력받은 간선 정보를 통해 트리 형성
  edges.forEach((edge) => {
    const [nodeA, nodeB, weight] = edge.split(" ").map(Number);

    tree[nodeA].push([nodeB, weight]);
    tree[nodeB].push([nodeA, weight]);
  });

  const dfs = (node, targetNode, weight) => {
    visited[node] = true;

    // 노드 쌍 중, 한 노드에서 다른 노드에 도착했다면 거리를 구한 것
    if (node === targetNode) {
      distances.push(weight);
      return;
    }

    // 현재 노드에 연결된 다른 노드 탐색하기
    for (const [nextNode, nextWeight] of tree[node]) {
      if (visited[nextNode]) continue;

      dfs(nextNode, targetNode, weight + nextWeight);
    }
  };

  // 입력받은 노드 쌍의 거리를 찾기
  pairs.forEach((pair) => {
    const [node, targetNode] = pair.split(" ").map(Number);

    // 깊이 우선 탐색을 통해 거리 구하기
    dfs(node, targetNode, 0);
    visited.fill(false);
  });

  return distances.join("\n");
};
```

## 다른 풀이

bfs로도 풀이할 수 있지만 조금 더 느리다.

```js
const solution = (N, edges, pairs) => {
  const tree = Array.from(Array(N + 1), () => []);
  const distances = [];

  edges.forEach((edge) => {
    const [nodeA, nodeB, weight] = edge.split(" ").map(Number);

    tree[nodeA].push([nodeB, weight]);
    tree[nodeB].push([nodeA, weight]);
  });

  const bfs = (startNode, targetNode) => {
    const queue = [[startNode, 0]];
    const visited = new Array(N).fill(false);
    visited[startNode] = true;

    while (queue.length) {
      const [node, weight] = queue.shift();

      if (node === targetNode) {
        return weight;
      }

      for (const [nextNode, nextWeight] of tree[node]) {
        if (visited[nextNode]) continue;

        visited[nextNode] = true;
        queue.push([nextNode, weight + nextWeight]);
      }
    }
  };

  pairs.forEach((pair) => {
    const [node, targetNode] = pair.split(" ").map(Number);

    distances.push(bfs(node, targetNode));
  });

  return distances.join("\n");
};
```
