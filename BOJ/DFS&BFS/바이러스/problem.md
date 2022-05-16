# 블랙잭 - 2606

[문제 링크](https://www.acmicpc.net/problem/2606)

### 성능 요약

메모리: 128MB, 시간 1초

### 문제

신종 바이러스인 웜 바이러스는 네트워크를 통해 전파된다. 한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.

예를 들어 7대의 컴퓨터가 <그림 1>과 같이 네트워크 상에서 연결되어 있다고 하자. 1번 컴퓨터가 웜 바이러스에 걸리면 웜 바이러스는 2번과 5번 컴퓨터를 거쳐 3번과 6번 컴퓨터까지 전파되어 2, 3, 5, 6 네 대의 컴퓨터는 웜 바이러스에 걸리게 된다. 하지만 4번과 7번 컴퓨터는 1번 컴퓨터와 네트워크상에서 연결되어 있지 않기 때문에 영향을 받지 않는다.

![그림 1](https://www.acmicpc.net/upload/images/zmMEZZ8ioN6rhCdHmcIT4a7.png)

어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다. 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에는 컴퓨터의 수가 주어진다. 컴퓨터의 수는 100 이하이고 각 컴퓨터에는 1번 부터 차례대로 번호가 매겨진다. 둘째 줄에는 네트워크 상에서 직접 연결되어 있는 컴퓨터 쌍의 수가 주어진다. 이어서 그 수만큼 한 줄에 한 쌍씩 네트워크 상에서 직접 연결되어 있는 컴퓨터의 번호 쌍이 주어진다.

### 출력

1번 컴퓨터가 웜 바이러스에 걸렸을 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 첫째 줄에 출력한다.

### 예제 입력 1

```
7
6
1 2
2 3
1 5
5 2
5 6
4 7
```

### 예제 출력 1

```
4
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

저번에 그래프 탐색 때문에 애를 좀 먹었더니, 이해를 좀 하긴 했나보다. 단 번에 풀 수 있었다. DFS 방식보다는 BFS가 디버깅도 쉽고, 효율적이라고 생각해 BFS 방식으로 풀이했다.

우선 그래프를 이차원 배열로 선언하고 그 인덱스를 정점으로 잡고,
정점에 연결된 다른 정점들을 입력받은 정보를 통해서 채워주었다.

```js
const graph = Array.from(Array(V + 1), () => []);

for (let edge of edges) {
  const [from, to] = edge;
  graph[from].push(to);
  graph[to].push(from);
}
```

그리고 바이러스를 퍼뜨리는 함수를 큐를 이용해서 만들어줬다.

- 첫 시작 노드를 큐에 넣어준 후에 방문처리를 한다.
- 큐의 길이가 0이 될 때까지, 즉 바이러스 컴퓨터와 연결된 컴퓨터가 없을 때까지 반복한다.
- 큐에서 연결된 컴퓨터들이 담긴 배열을 꺼낸다.
- 배열에 담긴 각 컴퓨터들을 방문처리하고, 그 컴퓨터에 연결된 컴퓨터들을 큐에 넣어준다.

```js
const spread = (start) => {
  const q = [];
  q.push(graph[start]);
  visited[start] = 1;

  while (q.length) {
    const candidates = q.shift();

    for (let vertex of candidates) {
      if (visited[vertex]) continue;

      visited[vertex] = 1;
      q.push(graph[vertex]);
    }
  }
};
```

함수를 마친 후에 방문한 컴퓨터들은 모두 바이러스에 전염된 것. visited 배열에서 1의 개수를 세고, 원래 바이러스 컴퓨터의 개수 1을 빼준다.

#### 전체 코드

```js
const [v, m, ...links] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const V = Number(v);
const M = Number(m);
const edges = links.map((link) => link.split(" ").map((v) => +v));
const VIRUS_COM = 1;

function Solution(V, M, edges) {
  const graph = Array.from(Array(V + 1), () => []);
  const visited = new Array(V + 1).fill(0);

  for (let edge of edges) {
    const [from, to] = edge;
    graph[from].push(to);
    graph[to].push(from);
  }

  const spread = (start) => {
    const q = [];
    q.push(graph[start]);
    visited[start] = 1;

    while (q.length) {
      const candidates = q.shift();

      for (let vertex of candidates) {
        if (visited[vertex]) continue;

        visited[vertex] = 1;
        q.push(graph[vertex]);
      }
    }
  };

  spread(VIRUS_COM);

  const answer = visited.filter((v) => v === 1).length - 1;
  console.log(answer);
}

Solution(V, M, edges);
```

</div>
</details>
