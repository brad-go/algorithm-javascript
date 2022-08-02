# DFS1 - 24479

[문제 링크](https://www.acmicpc.net/problem/24479)

### 성능 요약

메모리: 512MB, 시간 1초

### 문제

오늘도 서준이는 깊이 우선 탐색(DFS) 수업 조교를 하고 있다. 아빠가 수업한 내용을 학생들이 잘 이해했는지 문제를 통해서 확인해보자.

N개의 정점과 M개의 간선으로 구성된 무방향 그래프(undirected graph)가 주어진다. 정점 번호는 1번부터 N번이고 모든 간선의 가중치는 1이다. 정점 R에서 시작하여 깊이 우선 탐색으로 노드를 방문할 경우 노드의 방문 순서를 출력하자.

깊이 우선 탐색 의사 코드는 다음과 같다. 인접 정점은 오름차순으로 방문한다.

```
dfs(V, E, R) {  # V : 정점 집합, E : 간선 집합, R : 시작 정점
    visited[R] <- YES;  # 시작 정점 R을 방문 했다고 표시한다.
    for each x ∈ E(R)  # E(R) : 정점 R의 인접 정점 집합.(정점 번호를 오름차순으로 방문한다)
        if (visited[x] = NO) then dfs(V, E, x);
}
```

### 입력

첫째 줄에 정점의 수 N (5 ≤ N ≤ 100,000), 간선의 수 M (1 ≤ M ≤ 200,000), 시작 정점 R (1 ≤ R ≤ N)이 주어진다.

다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v) 모든 간선의 (u, v) 쌍의 값은 서로 다르다.

### 출력

첫째 줄부터 N개의 줄에 정수를 한 개씩 출력한다. i번째 줄에는 정점 i의 방문 순서를 출력한다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력한다.

### 예제 입력 1

```
5 5 1
1 4
1 2
2 3
2 4
3 4
```

### 예제 출력 1

```
1
2
3
4
0
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### dfs 함수 구현 - Fail

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const edges = input.map((edge) => edge.split(" ").map((v) => +v));

class unDirectedGraph {
  constructor() {
    this.edges = {};
  }

  addVertex(vertex) {
    this.edges[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
}

function Solution(n, m, r, edges) {
  const graph = new unDirectedGraph();

  for (let i = 0; i < n; i++) {
    graph.addVertex(i + 1);
  }

  for (let i = 0; i < m; i++) {
    const [v1, v2] = edges[i];
    graph.addEdge(v1, v2, 1);
  }

  const visited = new Array(n + 1).fill(0);
  const answer = [];

  const dfs = (v) => {
    if (visited[v]) return;

    visited[v] = 1;
    answer.push(v);

    const nextNodes = Object.keys(graph.edges[v]).map((v) => +v);

    for (let node of nextNodes) {
      if (visited[node]) continue;
      dfs(node);
    }
  };

  dfs(r);

  if (answer.length === 1) {
    console.log(0);
    return;
  }

  for (let i = 1; i <= n; i++) {
    console.log(answer.indexOf(i) + 1);
  }
}

Solution(n, m, r, edges);
```

여러가지 방식으로 재귀함수 dfs를 구현해봤지만, 계속 실패했다고 나온다. 이유가 뭘까..? 스택으로 구현해봐야겠다.

### Fail 2

```js
const [nmr, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class ArrayList {
  constructor(size = 0) {
    this.array = new Array(size).fill(0);
    this.length = 0;
  }

  add(value) {
    this.array[this.length] = value;
    this.length++;
  }

  get(index) {
    if (index < 0 || index > this.length) return -1;

    return this.array[index];
  }

  sort() {
    this.array.sort((a, b) => b - a);
  }

  *iterator() {
    if (!this.length) return;

    let idx = 0;
    let current = this.array[idx];

    while (current) {
      yield current;
      current = this.array[++idx];
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.prev = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);

    if (this.length) node.prev = this.top;

    this.top = node;
    this.length++;
  }

  pop() {
    if (!this.length) return null;

    const node = this.top;
    this.top = this.top.prev;
    this.length--;

    return node.item;
  }
}

const [N, M, R] = nmr.split(" ").map(Number);
const edges = input.map((edge) => edge.split(" ").map(Number));

function Solution(N, M, R, edges) {
  const graph = new ArrayList(N + 1);

  for (let i = 1; i <= N; i++) graph.array[i] = new ArrayList();

  const visited = new Array(N + 1).fill(false);
  const answer = new Array(N + 1).fill(0);

  for (let edge of edges) {
    const [from, to] = edge;

    graph.array[from].add(to);
    graph.array[to].add(from);
  }

  for (let i = 1; i <= N; i++) graph.array[i].sort();

  let idx = 1;
  const stack = new Stack();
  visited[R] = 1;
  stack.push(R);

  while (stack.length) {
    const current = stack.pop();
    visited[current] = true;

    if (!answer[current]) answer[current] = idx++;

    for (let next of graph.array[current]) {
      if (visited[next]) continue;

      stack.push(next);
    }
  }

  for (let i = 1; i < answer.length; i++) console.log(answer[i]);
}

Solution(N, M, R, edges);
```

자꾸 틀리고 시간초과가 나서 ArrayList, Stack을 구현하고 도전해봤는데, 여전히 시간초과가 난다. 다음에 다시 도전!

</div>
</details>
