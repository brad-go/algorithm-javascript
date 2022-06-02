const [v, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const V = Number(v);
const edges = input.map((edge) => edge.split(" ").map(Number));

function Solution(V, edges) {
  const tree = new Array(V + 1).fill().map(() => []);
  const visited = new Array(V + 1).fill(0);

  edges.forEach((edge, idx) => {
    const from = edge[0];
    let to;
    let len;
    let i = 1;

    while (edge[i] !== -1) {
      to = edge[i];
      len = edge[i + 1];
      i += 2;
    }

    tree[from].push([to, len]);
    tree[to].push([from, len]);
  });

  let answer = 0;

  const dfs = (v, visited, diameter) => {
    if (visited[v]) return;

    visited[v] = 1;
    answer = Math.max(answer, diameter);

    for (const [vertex, len] of tree[v]) {
      dfs(vertex, visited, diameter + len);
    }
  };

  dfs(1, visited, 0);

  console.log(answer);
}

Solution(V, edges);
