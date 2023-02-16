# 1967. 이중 우선순위 큐

## 문제 링크

https://www.acmicpc.net/problem/1967

## 문제 분류

: 트리, 그래프, 깊이 우선 탐색

## 소요 시간

: 50분

## 풀이 방법

트리를 생성하고 dfs 탐색을 통해 한 노드에서 시작해 한 노드에 도달할 때까지 더한 가중치가 가장 높은 값을 찾으면 되는 문제였다.

1. 트리를 생성한다.
2. 입력받은 간선 정보를 통해 트리를 채워준다.
3. 리프 노드에서 다른 리프 노드까지가 가장 긴 거리이기 때문에 리프노드들에서만 탐색을 시작한다.
4. 연결된 트리들을 따라가면서 깊이 우선 탐색을 진행한다.
5. 탐색이 끝날 때까지 각 노드를 지나갈 때마다 가중치를 더해서 한 노드에서 다른 노드까지 가는 총 가중치 값을 구한다.
6. 해당 값을 매 탐색마다 비교해서 가장 큰 값을 반환한다.

## 풀이 코드

```js
const solution = (N, edges) => {
  // 2차원 배열을 통해 트리 형성
  const tree = Array.from(Array(N), () => []);

  // 트리의 지름이 담길 값
  let diameter = 0;

  // 입력받은 간선 정보를 트리에 입력하기
  edges.forEach((edge) => {
    // 간선은 부모, 자식, 가중치로 이루어져 있다.
    const [parent, child, weight] = edge.split(" ").map((num) => num - 1);

    // 각 노드를 연결하기
    tree[parent].push([child, weight + 1]);
    tree[child].push([parent, weight + 1]);
  });

  const dfs = (visited, index, weight) => {
    // 노드를 방문할 때마다 총 가중치를 갱신
    diameter = Math.max(diameter, weight);

    // 현재 노드에 연결된 다음 노드들을 탐색
    for (const [nextIndex, nextWeight] of tree[index]) {
      // 이미 탐색한 노드라면 건너뛰기
      if (visited[nextIndex]) continue;

      visited[nextIndex] = 1;
      // 다음 노드 탐색하기
      dfs(visited, nextIndex, weight + nextWeight);
    }
  };

  // 트리의 리프 노드들에서 탐색을 시작
  for (let i = Math.floor((N + 1) / 2); i < N; i++) {
    const visited = new Array(N).fill(0);

    visited[i] = 1;
    dfs(visited, i, 0);
  }

  return diameter;
};
```

## 코드 개선

이 문제를 해결하기 위한 시간을 획기적으로 단축시킬 수 있는 방법이 있었다.

기존에는 각 리프 노드에서 탐색을 모두 진행하고 비교하는 방식으로 문제를 풀이했었다. 하지만 깊이 우선 탐색을 단 두 번으로 줄일 수 있는 방법이 있다.

1. 루트 노드에서 깊이 우선 탐색을 시작해 가장 가중치가 큰 노드(가장 먼 노드)를 구한다.
2. 해당 노드에서 깊이 우선 탐색을 통해 가장 먼 노드까지 가중치를 더한 값이 트리의 지름이 된다.

```js
const solution = (N, edges) => {
  const tree = Array.from(Array(N), () => []);
  const visited = new Array(N).fill(false);
  // 가장 먼 노드의 정보를 담을 객체
  const farthest = { node: 0, weight: 0 };

  edges.forEach((edge) => {
    const [parent, child, weight] = edge.split(" ").map((num) => num - 1);

    tree[parent].push([child, weight + 1]);
    tree[child].push([parent, weight + 1]);
  });

  const dfs = (node, weight) => {
    visited[node] = true;

    // 가중치를 비교하면서 가장 먼 노드를 찾기
    if (farthest.weight < weight) {
      farthest.node = node;
      farthest.weight = weight;
    }

    for (const [nextNode, nextWeight] of tree[node]) {
      if (visited[nextNode]) continue;

      dfs(nextNode, weight + nextWeight);
    }
  };

  // 루트 노드에서 가장 먼 노드 찾기
  dfs(0, 0);

  // 지름을 구하기 위해 가중치 비워주기
  farthest.weight = 0;
  visited.fill(false);

  // 가장 먼 노드에서 가장 멀리 떨어진 노드를 찾아 지름 구하기
  dfs(farthest.node, 0);

  return farthest.weight;
};
```
