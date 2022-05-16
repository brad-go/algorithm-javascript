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
