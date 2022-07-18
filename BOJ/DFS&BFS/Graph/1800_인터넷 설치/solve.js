const [npk, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const [N, P, K] = npk.split(" ").map(Number);
const edges = input.map((line) => line.split(" ").map(Number));

function solution(N, edges) {
  const graph = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(0);
  const costs = [];
  const minCosts = [];

  addEdge(graph, edges);
  dfs(graph, visited, 1, costs, minCosts);

  return minCosts.length ? Math.min(...minCosts) : -1;
}

const addEdge = (graph, edgeList) => {
  edgeList.forEach(([from, to, cost]) => {
    graph[from].push({ linked: to, cost });
    graph[to].push({ linked: from, cost });
  });
};

const dfs = (graph, visited, current, costs, minCosts) => {
  visited[current] = 1;

  if (current === N) {
    const currentCosts = costs.slice().sort((a, b) => a - b).slice(0, -K); // prettier-ignore
    minCosts.push(currentCosts[currentCosts.length - 1]);
  }

  for (const { linked, cost } of graph[current]) {
    if (visited[linked]) continue;

    costs.push(cost);
    dfs(graph, visited, linked, costs, minCosts);
    costs.pop();
    visited[linked] = 0;
  }
};

console.log(solution(N, edges));
