const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(n);
const tree = new Array(N + 1).fill().map(() => []);

input.forEach((edgeInfo) => {
  const [parent, child, weight] = edgeInfo.split(" ").map(Number);

  tree[parent].push([child, weight]);
  tree[child].push([parent, weight]);
});

function Solution(N, tree) {
  const visited = new Array(N + 1).fill(false);
  let max = { node: 0, weight: 0 };

  const DFS = (node, weight) => {
    visited[node] = true;

    if (max.weight < weight) max = { node, weight };

    for (const [child, childWeight] of tree[node]) {
      if (visited[child]) continue;

      DFS(child, childWeight + weight);
    }
  };

  DFS(1, 0);

  max.weight = 0;
  visited.fill(false);

  DFS(max.node, 0);

  console.log(max.weight);
}

Solution(N, tree);
