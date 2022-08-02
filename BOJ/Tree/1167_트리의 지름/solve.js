const [v, ...input] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");

const V = Number(v);
const tree = new Array(V + 1).fill().map(() => []);

input.forEach((edgeInfo) => {
  const [node, ...edge] = edgeInfo.split(" ").map(Number);

  for (let i = 0; i < edge.length - 1; i += 2) {
    tree[node].push([edge[i], edge[i + 1]]);
  }
});

function Solution(V, tree) {
  const visited = new Array(V + 1).fill(false);
  let max = { node: 0, distance: Number.MIN_SAFE_INTEGER };

  const DFS = (node, distance) => {
    visited[node] = true;

    if (max.distance < distance) max = { node, distance };

    for (let [nextNode, nextDistance] of tree[node]) {
      if (visited[nextNode]) continue;

      DFS(nextNode, distance + nextDistance);
    }
  };

  DFS(1, 0);

  max.distance = 0;
  visited.fill(0);

  DFS(max.node, 0);

  console.log(max.distance);
}

Solution(V, tree);
