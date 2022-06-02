const [v, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const V = Number(v);
const edges = input.map((edge) => edge.split(" ").map(Number));

function Solution(V, edges) {
  const tree = new Array(V + 1).fill().map(() => []);

  edges.forEach((edge, idx) => {
    const [node, ...nextInfo] = edge;
    for (let i = 0; i < nextInfo.length - 1; i += 2) {
      tree[node].push([nextInfo[i], nextInfo[i + 1]]);
    }
  });

  let visited = new Array(V + 1).fill(0);
  let max = { node: 0, dist: 0 };

  const dfs = (node, dist) => {
    visited[node] = 1;

    if (max.dist < dist) max = { node, dist };

    for (let [nextNode, nextDist] of tree[node]) {
      if (visited[nextNode]) continue;
      dfs(nextNode, dist + nextDist);
    }
  };

  dfs(1, 0);

  max.dist = 0;
  visited = new Array(V + 1).fill(0);

  dfs(max.node, 0);

  console.log(max.dist);
}

Solution(V, edges);
