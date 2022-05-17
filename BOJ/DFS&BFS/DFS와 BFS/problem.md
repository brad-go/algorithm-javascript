# DFS와 BFS - 1260

[문제 링크](https://www.acmicpc.net/problem/1260)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

### 입력

첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

### 출력

첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

### 예제 입력 1

```
4 5 1
1 2
1 3
1 4
2 4
3 4
```

### 예제 출력 1

```
1 2 4 3
1 2 3 4
```

### 예제 입력 2

```
5 5 3
5 4
5 2
1 2
3 4
3 1
```

### 예제 출력 2

```
3 1 2 5 4
3 1 4 2 5
```

### 예제 입력 3

```
1000 1 1000
999 1000
```

### 예제 출력 3

```
1000 999
1000 999
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

그래프를 2차원 배열, 즉 인접행렬 형태로 구현한 후에 간선들을 추가해주었다. 그리고 dfs와 bfs에 대해서 각각의 visited 배열과 정답 배열을 생성해주었다.

기본적인 방식으로 풀이하는데, 숫자가 작은 것부터 그래프 탐색을 하라고 해서 간선들을 모아놓은 배열을 그래프에 입력 전에 정렬해서 문제를 풀이하려고 했는데, 틀렸다고 나왔다.

그래서 각 다음 정점을 탐색하기 위해 후보들을 뽑았을 때, 오름차순으로 정렬한 후에 탐색을 진행시켰다.

### Solution

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [n, m, v] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const edges = input.map((edge) => edge.split(" ").map((v) => +v));

function Solution(n, m, v, edges) {
  const graph = Array.from(Array(n + 1), () => []);
  const visitedDFS = new Array(n + 1).fill(0);
  const visitedBFS = new Array(n + 1).fill(0);
  const answerDFS = [];
  const answerBFS = [];

  for (let edge of edges) {
    const [v1, v2] = edge;
    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  const dfs = (v, visited) => {
    if (visited[v]) return;

    visited[v] = true;
    answerDFS.push(v);

    for (let vertex of graph[v].sort((a, b) => a - b)) {
      dfs(vertex, visited);
    }
  };

  const bfs = (v, visited) => {
    const q = [];

    q.push(graph[v]);
    visited[v] = 1;
    answerBFS.push(v);

    while (q.length) {
      const curNodes = q.shift().sort((a, b) => a - b);

      for (let node of curNodes) {
        if (visited[node]) continue;

        visited[node] = 1;
        answerBFS.push(node);
        q.push(graph[node]);
      }
    }
  };

  dfs(v, visitedDFS);
  bfs(v, visitedBFS);

  console.log(answerDFS.join(" "));
  console.log(answerBFS.join(" "));
}

Solution(n, m, v, edges);
```

</div>
</details>
