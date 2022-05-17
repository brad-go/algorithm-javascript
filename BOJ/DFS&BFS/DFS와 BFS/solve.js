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

  dfs(v, visitedDFS);

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

  bfs(v, visitedBFS);

  console.log(answerDFS.join(" "));
  console.log(answerBFS.join(" "));
}

Solution(n, m, v, edges);
