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
