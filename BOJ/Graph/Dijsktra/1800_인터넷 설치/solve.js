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
    console.log(mid);

    if (dijkstra(graph, mid)) {
      right = mid - 1;
      answer = mid;
    } else {
      left = mid + 1;
    }
  }

  return answer;
};

const dijkstra = (graph, price) => {
  const dist = Array(N + 1).fill(INF);
  const queue = [{ vertex: 1, cost: 0 }];

  dist[1] = 0;

  while (queue.length) {
    const current = queue.shift();

    if (current.cost > dist[current.vertex]) continue;

    for (const next of graph[current.vertex]) {
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
