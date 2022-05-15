const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

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

function Solution(input) {
  const [n, m, r] = input
    .shift()
    .split(" ")
    .map((v) => +v);
  const edges = input.map((edge) => edge.split(" ").map((v) => +v));
  const graph = new unDirectedGraph();

  for (let i = 0; i < n; i++) {
    graph.addVertex(i + 1);
  }

  for (let i = 0; i < m; i++) {
    const [vertex1, vertex2] = edges[i];
    graph.addEdge(vertex1, vertex2, 1);
  }

  const dfs = (v, visited) => {
    visited[v] = true;
    console.log(v >= n ? 0 : v);

    const vertices = Object.keys(graph.edges[v]).map((v) => +v);

    for (const n of vertices) {
      if (!visited[n]) dfs(n, visited);
    }
  };

  const dfsStart = () => {
    const visited = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
      if (!visited[i]) dfs(i, visited);
    }
  };

  dfsStart();
}

Solution(input);

// function Solution(input) {
// const [n, m, r] = input
//   .shift()
//   .split(" ")
//   .map((v) => +v);
// const edges = input.map((edge) => edge.split(" ").map((v) => +v));
// const graph = new unDirectedGraph();

// for (let i = 0; i < n; i++) {
//   graph.addVertex(i + 1);
// }

// for (let i = 0; i < m; i++) {
//   const [vertex1, vertex2] = edges[i];
//   graph.addEdge(vertex1, vertex2, 0);
// }

//   const answer = new Array(n).fill(0);
//   let cnt = 1;

//   const dfs = (r) => {
// const vertices = Object.keys(graph.edges[r]).map((v) => +v);

//     if (!answer[r - 1]) {
//       answer[r - 1] = cnt;
//       cnt++;
//     }

//     for (const vertex of vertices) {
//       if (graph.edges[r][vertex]) continue;
//       graph.edges[r][vertex] = 1;
//       graph.edges[vertex][r] = 1;
//       dfs(vertex);
//     }
//   };

//   dfs(r);

//   answer.forEach((a) => console.log(a));
// }

// Solution(input);
