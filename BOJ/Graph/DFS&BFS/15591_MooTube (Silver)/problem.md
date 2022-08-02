# MooTube (Silver) - 15591

[문제 링크](https://www.acmicpc.net/problem/15591)

## 문제 풀이

- 네트워크 구조로 바꿔서, 각 동영상을 정점으로 나타내기로 했다.
- N-1 개의 동영상 쌍을 골라서 어떤 동영상에서 다른 동영상으로 가는 경로가 반드시 하나 존재하도록 했다.

위의 정보를 토대로 **가중치 그래프**를 탐색하는 방식으로 문제를 풀이해야겠다고 생각했다.

핵심은 usado를 통해 그래프를 탐색할지 말지를 결정하는 것이다. 문제의 설명에 써있었듯이, 최솟값을 구하는 코드를 통해 usado값을 업데이트하는 방식으로 풀이하려고 했지만 그럴 필요가 없었다.

```
      1
      |
     (2) // usado
      |
      2
    /   \
  (3)   (4) // usado
  /       \
 3         4
```

위와 같은 그래프가 있다고 했을 때, 1번과 4번 정점의 usado를 구하기 위해 최솟값을 구할 필요가 없다. 이미 1번과 2번의 정점이 usado 2로 이루어졌기 때문에, 최솟값은 1번과 2번의 usado이기 때문이다. 이러한 방식으로 각 단계에서 유사도를 체크해주고, 작다면 탐색할 필요가 없다.

## 풀이 설명

1. 그래프를 나타낼 이차원 배열을 N+1길이의 배열을 만든다.
2. 입력받은 정보를 통해 그래프를 각 그래프의 인덱스에 두 쌍으로 usado를 가중치로 채워준다.
3. 입력받은 질문들에 따라 BFS방식으로 탐색한다.
4. 큐에 첫 정점을 넣어주고, 큐가 빌 때까지 아래를 반복한다.
5. 큐에서 정점의 번호를 꺼내고 그래프에 해당 정점에 연결된 정점들만큼 아래를 반복한다.
6. 방문했던 정점이거나, usado가 K보다 작다면 탐색하지 않고 넘어간다.
7. 아니라면 방문처리를 해주고, K보다 크므로 추천 영상의 개수를 증가시킨다.
8. 해당 정점을 큐에 넣어준다.

### BFS 방식

```js
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const [N, Q] = input[0].split(" ").map(Number);
const edges = input.slice(1, N).map((edge) => edge.split(" ").map(Number));
const QUESTION = input.slice(N).map((quest) => quest.split(" ").map(Number));

function solution(N, Q, edges, QUESTION) {
  const graph = Array.from(Array(N + 1), () => []);

  edges.forEach((edge) => {
    const [from, to, usado] = edge;

    graph[from].push({ linked: to, usado });
    graph[to].push({ linked: from, usado });
  });

  QUESTION.forEach((question) => {
    const [K, V] = question;
    const queue = [V];
    const visited = new Array(N + 1).fill(false);

    let recommended = 0;
    visited[V] = true;

    while (queue.length) {
      const vertex = queue.shift();

      for (let video of graph[vertex]) {
        const { linked, usado } = video;

        if (visited[linked] || usado < K) continue;

        visited[linked] = true;
        recommended++;
        queue.push(linked);
      }
    }
    console.log(recommended);
  });
}

console.log(solution(N, Q, edges, QUESTION));
```

### DFS 방식

탐색 과정에서 어떻게하면 recommended라는 전역 변수를 참조하지 않고, 매개변수를 이용해 문제를 풀이할 수 있는지 많이 고민했는데, 찾지 못했다.

```js
// 입력 방식은 BFS 방식과 같음

function solution(N, Q, edges, QUESTION) {
  const graph = Array.from(Array(N + 1), () => []);
  const answer = [];
  let recommended = 0;

  const findRecommended = (K, V, visited) => {
    visited[V] = true;

    for (let video of graph[V]) {
      const { linked, usado } = video;

      if (visited[linked] || usado < K) continue;

      recommended++;
      findRecommended(K, linked, visited);
    }
  };

  edges.forEach((edge) => {
    const [from, to, usado] = edge;

    graph[from].push({ linked: to, usado });
    graph[to].push({ linked: from, usado });
  });

  QUESTION.forEach((question) => {
    const [K, V] = question;
    const visited = new Array(N + 1).fill(false);

    findRecommended(K, V, visited);

    answer.push(recommended);
    recommended = 0;
  });

  answer.forEach((ans) => console.log(ans));
}
```
