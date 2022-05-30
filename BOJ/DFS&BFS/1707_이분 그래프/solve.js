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

      dfs(v, graph, visited, -color);
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
      dfs(j, graph, visited, 1);
    }

    let isBipartite = checkGraph(V, graph, visited);

    console.log(isBipartite ? "YES" : "NO");
  }
}

Solution(k, input);
