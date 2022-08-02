# Watering the Fields - 10021

[문제 링크](https://www.acmicpc.net/problem/10021)

## 문제 풀이

### 첫번째 시도

기존 그래프 풀이 방식대로 풀이했는데, 메모리 초과가 나서 실패했다.

```js
// prettier-ignore
const [nc, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, C] = nc.split(" ").map(Number);
const lines = input.map((line) => line.split(" ").map(Number));

class Vertex {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

function solution(N, C, lines) {
  const vertices = [];
  const graph = Array.from(Array(N), () => []);

  lines.forEach((line, idx) => {
    const [x, y] = line;
    vertices.push(new Vertex(idx, x, y));
  });

  vertices.forEach((vertex, idx) => {
    for (let i = 0; i < N; i++) {
      const cost = getCost(vertex, vertices[i]);
      if (cost <= C) continue;

      graph[idx].push({ linkedVertex: vertices[i], cost });
    }
  });

  const queue = [vertices[0]];
  const visited = new Array(N).fill(false);
  visited[vertices[0].id] = true;

  let totalCost = 0;

  while (queue.length) {
    const vertex = queue.shift();

    for (let v of graph[vertex.id]) {
      const { linkedVertex, cost } = v;

      if (visited[linkedVertex.id]) continue;

      totalCost += cost;
      queue.push(linkedVertex);
    }
  }

  // 방문하지 못한 곳이 있다면 -1출력
  if (visited.some((visit) => visit === 0)) return -1;
  return totalCost;
}

const getCost = (pointX, pointY) => {
  const { x: xi, y: yi } = pointX;
  const { x: xj, y: yj } = pointY;

  return Math.pow(xi - xj, 2) + Math.pow(yi - yj, 2);
};

console.log(solution(N, C, lines));
```

### 두번째 시도

문제가 크루스칼 알고리즘을 사용해서 풀이해야 한다는 것을 알게되었다. 거기다가 최소 신장 트리와 크루스칼 알고리즘을 학습해보니, 이 문제는 최소 비용이 C이상이어야 한다는 것 말고는 아주 기본적인 방법으로 구현할 수 있단 것을 알게되었다.
그러나 계속 메모리 초과가 나서 이상하다 싶었는데, 아직 자바스크립트로 문제 풀이에 통과한 사람이 없었다. 이 문제는 자바스크립트로 풀 수 없는 걸까..?

```js
// prettier-ignore
const [nc, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, C] = nc.split(" ").map(Number);
const lines = input.map((line) => line.split(" ").map(Number));

class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Edge {
  constructor(v1, v2, cost) {
    this.v1 = v1;
    this.v2 = v2;
    this.cost = cost;
  }
}

function solution(N, C, lines) {
  const vertices = [];
  const edges = [];

  // 입력 정보를 바탕으로 정점 생성하기
  lines.forEach((line) => {
    const [x, y] = line;
    vertices.push(new Vertex(x, y));
  });

  // 각 정점들을 연결해서 간선 생성
  vertices.forEach((vertex, idx) => {
    for (let i = 0; i < N; i++) {
      const cost = getCost(vertex, vertices[i]);
      if (cost <= C) continue;

      edges.push(new Edge(idx, i, cost));
    }
  });

  // 간선의 비용을 기준으로 오름차순 정렬
  edges.sort((a, b) => a.cost - b.cost);

  // 각 정점이 포함된 그래프가 어디인지 저장
  const parent = new Array(N).fill().map((_, idx) => idx);
  const answer = [];

  for (let edge of edges) {
    const { v1, v2, cost } = edge;

    // 사이클이 발생하지 않는 경우 그래프에 포함
    if (!findParent(parent, v1, v2)) {
      answer.push(cost);
      unionParent(parent, v1, v2);
    }
  }

  return answer.length !== N - 1
    ? -1
    : answer.reduce((acc, cur) => acc + cur, 0);
}

const getCost = (pointX, pointY) => {
  const { x: xi, y: yi } = pointX;
  const { x: xj, y: yj } = pointY;

  return Math.pow(xi - xj, 2) + Math.pow(yi - yj, 2);
};

const getParent = (parent, idx) => {
  if (parent[idx] === idx) return idx;

  return (parent[idx] = getParent(parent, parent[idx]));
};

const findParent = (parent, x, y) => {
  const v1 = getParent(parent, x);
  const v2 = getParent(parent, y);

  if (v1 === v2) return true;
  return false;
};

const unionParent = (parent, x, y) => {
  const v1 = getParent(parent, x);
  const v2 = getParent(parent, y);

  if (v1 < v2) return (parent[v2] = v1);
  return (parent[v1] = v2);
};

console.log(solution(N, C, lines));
```
