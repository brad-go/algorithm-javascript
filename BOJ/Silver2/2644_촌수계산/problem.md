# 2644. 촌수계산

## 문제 링크

https://www.acmicpc.net/problem/2644

## 문제 분류

: 그래프, 너비 우산 탐색, 깊이 우선 탐색

## 소요 시간

: 10분

## 풀이 방법

가족 관계도가 트리와 비슷하다고 생각해서 트리를 탐색하는 DFS로 문제 풀이 접근했고, 풀이에 성공했다.
즉, 이 문제는 트리가 주어지고 주어진 노드 A와 B간의 최단 거리르 구하는 문제였다. 트리 구조인 이유는 사이클이 없고
부모 자식 간의 연결된 관계가 주어지기 때문이다. 트리가 하나가 아닐 수도 있기 때문에 -1을 출력할 수도 있다.
즉, 다음과 같이 풀이할 수 있다.

1. 입력받은 관계를 통해 트리 형성하기
2. DFS 탐색을 통해 주어진 두 사람 중 한 사람부터, 한 사람을 거칠 때마다 촌수를 늘려가며 탐색
3. 나머지 한 사람에 도달했다면 촌수 출력, 아니라면 -1을 출력

## 풀이 코드

```js
const solution = (N, targets, relations) => {
  const tree = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(false);
  const [personA, personB] = targets;

  // 주어진 관계를 통해 트리 형성
  relations.forEach(([parent, child]) => {
    tree[parent].push(child);
    tree[child].push(parent);
  });

  // personA에서 personB로 도달하지 못했다면 -1 출력
  let answer = -1;

  // 현재 사람의 이어진 관계를 통해 촌수를 증가시키면서 탐색
  const dfs = (current, index) => {
    if (current === personB) {
      answer = index;
    }

    for (const next of tree[current]) {
      if (visited[next]) continue;

      visited[next] = true;
      dfs(next, index + 1);
    }
  };

  visited[personA] = true;
  dfs(personA, 0);

  return answer;
};
```

## 코드 개선

bfs로 풀이하면 조금 더 빠르고 깔끔하다.

```js
const solution = (N, targets, relations) => {
  const tree = Array.from(Array(N + 1), () => []);
  const [start, target] = targets;

  relations.forEach(([parent, child]) => {
    tree[parent].push(child);
    tree[child].push(parent);
  });

  return bfs(tree, start, target);
};

const bfs = (tree, start, target) => {
  const queue = [[start, 0]];
  const visited = new Array(N + 1).fill(false);

  visited[start] = true;

  while (queue.length) {
    const [current, count] = queue.shift();

    if (current === target) return count;

    for (const next of tree[current]) {
      if (visited[next]) continue;

      visited[next] = true;
      queue.push([next, count + 1]);
    }
  }

  return -1;
};
```
