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
      // dfs(j, graph, visited, 1);
      bfs(j, graph, visited);
    }

    let isBipartite = checkGraph(V, graph, visited);

    console.log(isBipartite ? "YES" : "NO");
  }
}

Solution(k, input);
