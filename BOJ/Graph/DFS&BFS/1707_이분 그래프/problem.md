# 이분 그래프 - 1707

[문제 링크](https://www.acmicpc.net/problem/1707)

### 성능 요약

메모리: 256MB, 시간 2초

### 문제

그래프의 정점의 집합을 둘로 분할하여, 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 그러한 그래프를 특별히 이분 그래프 (Bipartite Graph) 라 부른다.

그래프가 입력으로 주어졌을 때, 이 그래프가 이분 그래프인지 아닌지 판별하는 프로그램을 작성하시오.

### 입력

입력은 여러 개의 테스트 케이스로 구성되어 있는데, 첫째 줄에 테스트 케이스의 개수 K가 주어진다. 각 테스트 케이스의 첫째 줄에는 그래프의 정점의 개수 V와 간선의 개수 E가 빈 칸을 사이에 두고 순서대로 주어진다. 각 정점에는 1부터 V까지 차례로 번호가 붙어 있다. 이어서 둘째 줄부터 E개의 줄에 걸쳐 간선에 대한 정보가 주어지는데, 각 줄에 인접한 두 정점의 번호 u, v (u ≠ v)가 빈 칸을 사이에 두고 주어진다.

### 출력

K개의 줄에 걸쳐 입력으로 주어진 그래프가 이분 그래프이면 YES, 아니면 NO를 순서대로 출력한다.

### 제한

- 2 ≤ K ≤ 5
- 1 ≤ V ≤ 20,000
- 1 ≤ E ≤ 200,000

### 예제 입력 1

```
2
3 2
1 3
2 3
4 4
1 2
2 3
3 4
4 2
```

### 예제 출력 1

```
YES
NO
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

이분 그래프에 대한 개념이 필요한 문제였다. 이분 그래프는 그래프를 탐색하면서 정점마다 두가지 색을 번갈아가며 칠했을 때, 인접한 정점끼리는 반드시 색깔이 달라야한다.

### Solution - DFS

DFS 방식으로 풀이했다.

```js
const [k, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(k, input) {
  const dfs = (vertex, graph, visited, color) => {
    visited[vertex] = color;

    for (let v of graph[vertex]) {
      if (visited[v]) continue;

      // 다음 레벨의 탐색이 진행될때마다 음수 기호를 통해서 반전시켜준다. 1 or -1
      dfs(v, graph, visited, -color);
    }
  };

  // 이분 그래프라면 같은 레벨에서 같은 색이 나올 수 없다.
  const checkGraph = (V, graph, visited) => {
    for (let i = 1; i <= V; i++) {
      for (let v of graph[i]) {
        if (visited[i] === visited[v]) return false;
      }
    }
    return true;
  };

  for (let i = 0; i < Number(k); i++) {
    const [V, E] = input.shift().split(" ").map(Number);
    const edges = input.splice(0, E).map((edge) => edge.split(" ").map(Number));
    const graph = Array.from(Array(V + 1), () => []);
    const visited = new Array(V + 1).fill(0);

    for (let edge of edges) {
      const [from, to] = edge;

      graph[from].push(to);
      graph[to].push(from);
    }

    // 정점이 연결되어 있지 않을 수도 있으므로 각 정점마다 탐색해준다.
    for (let j = 1; j <= V; j++) {
      if (visited[j]) continue;
      dfs(j, graph, visited, 1);
    }

    let isBipartite = checkGraph(V, graph, visited);

    console.log(isBipartite ? "YES" : "NO");
  }
}

Solution(k, input);
```

### Solution - BFS

BFS 방식으로도 풀이했다. 그러나 DFS보다 두배나 더 많은 시간이 걸린다. 더 빠를걸로 예상했는데, 알고리즘을 수정해봐야겠다.

```js
const [k, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(k, input) {
  const bfs = (vertex, graph, visited) => {
    const q = [vertex];
    visited[vertex] = 1;

    while (q.length) {
      const current = q.shift();

      for (let v of graph[current]) {
        if (visited[v]) continue;

        if (visited[current] === 1) visited[v] = -1;
        else visited[v] = 1;
        q.push([v]);
      }
    }
  };

  const checkGraph = (V, graph, visited) => {
    for (let i = 1; i <= V; i++) {
      for (let v of graph[i]) {
        if (visited[i] === visited[v]) return false;
      }
    }
    return true;
  };

  for (let i = 0; i < Number(k); i++) {
    const [V, E] = input.shift().split(" ").map(Number);
    const edges = input.splice(0, E).map((edge) => edge.split(" ").map(Number));
    const graph = Array.from(Array(V + 1), () => []);
    const visited = new Array(V + 1).fill(0);

    for (let edge of edges) {
      const [from, to] = edge;

      graph[from].push(to);
      graph[to].push(from);
    }

    for (let j = 1; j <= V; j++) {
      if (visited[j]) continue;
      bfs(j, graph, visited);
    }

    let isBipartite = checkGraph(V, graph, visited);

    console.log(isBipartite ? "YES" : "NO");
  }
}

Solution(k, input);
```

</div>
</details>
