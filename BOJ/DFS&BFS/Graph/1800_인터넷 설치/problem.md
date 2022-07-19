# 인터넷 설치 - 1800

[문제 링크](https://www.acmicpc.net/problem/1800)

## 문제 풀이

dfs 방식으로 문제를 풀이해야 겠다고 생각하고 풀어봤는데, 시간 초과가 났다. 하루 종일 쳐다봐도 알풀 수가 없어서 다른 분의 풀이를 참고해서 풀이했다. 다익스트라 알고리즘 문제를 풀이해본 적이 없는데, 다익스트라 알고리즘을 살짝 변형해서 풀어야 하는 문제여서 더 어려웠던 것 같다.

## 풀이 설명

문제의 핵심은 원장이 얼마를 내는가이다. 즉, **x원 이하의 비용으로 1번 컴퓨터와 N번 컴퓨터를 연결시킬 수 있는지를 판별하는 결정** 문제이다. x원 이하의 비용을 들이기 위해서는 x원보다 비싼 간선을 포함하지 않거나, 포함하더라도 K개 이하로 포함해야 한다. 그러므로 x원 이하의 간선의 가중치는 0, x원보다 비싼 간선의 가중치는 1로 잡고 다익스트라를 돌려준다.

원장이 내야하는 최소한의 가격을 알아내기 위해서 이진 탐색을 사용하고, 알아내는 과정에는 다익스트라 알고리즘을 사용한다.

- 다익스트라 함수의 인자: 문제가 요구하는 원장이 내야하는 비용 x원
- 다익스트라 함수의 반환값:
  - 사용되는 간선들은 x원 이하거나 x원보다 비싼 간선이 K개 이하면 true 반환
  - 위 경우가 아니면 원장이 내야하는 비용이 x원보다 비싸므로 false 반환

1. 2차원 배열로 그래프 생성
2. 입력받은 컴퓨터들의 연결 정보를 통해 그래프에 간선들 추가
3. 원장이 내야할 비용을 0부터 MAX값(1000000)까지 이진 탐색을 통해 찾는다.
4. mid값(원장이 내야할 비용)을 다익스트라에 인자로 넣어가면서 최소 비용을 찾는다.

## 전체 코드

```js
const [npk, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const [N, P, K] = npk.split(" ").map(Number);
const edges = input.map((line) => line.split(" ").map(Number));
const INF = 1000000;

function solution(N, edges) {
  const graph = Array.from(Array(N + 1), () => []);
  addEdge(graph, edges);

  const answer = binarySearch(graph, -1);
  return answer;
}

const addEdge = (graph, edgeList) => {
  edgeList.forEach(([from, to, cost]) => {
    graph[from].push({ vertex: to, cost });
    graph[to].push({ vertex: from, cost });
  });
};

const binarySearch = (graph, answer, left = 0, right = INF) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (dijkstra(graph, mid)) {
      right = mid - 1;
      answer = mid;
    } else {
      left = mid + 1;
    }
  }

  return answer;
};

// 주어진 비용보다 비싼 간선을 선택하지 않거나, price 보다 비싼 간선은 K개 이하일 때 N번 컴퓨터까지 연결 가능
// 주어진 비용보다 비싼 간선이 K개 이하인지 판단 결과 반환
const dijkstra = (graph, price) => {
  // 1부터 각 인덱스까지의 price보다 비싼 간선의 개수가 기록된다.
  const dist = Array(N + 1).fill(INF);
  const queue = [{ vertex: 1, cost: 0 }];

  dist[1] = 0;

  while (queue.length) {
    const current = queue.shift();

    // 이미 더 짧은 경로로 갱신된 경우
    if (current.cost > dist[current.vertex]) continue;

    for (const next of graph[current.vertex]) {
      // price 이하의 가중치를 가진 간선은 0, 비싼 가중치를 가진 간선은 1로 처리
      const cost = next.cost > price ? 1 : 0;

      if (current.cost + cost < dist[next.vertex]) {
        dist[next.vertex] = current.cost + cost;
        queue.push({ vertex: next.vertex, cost: dist[next.vertex] });
      }
    }
  }

  return dist[N] <= K;
};

console.log(solution(N, edges));
```
