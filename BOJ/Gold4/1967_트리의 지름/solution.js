const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const edges = input.slice(1);

const solution = (N, edges) => {
  const tree = Array.from(Array(N), () => []);
  const visited = new Array(N).fill(false);
  const farthest = { node: 0, weight: 0 };

  edges.forEach((edge) => {
    const [parent, child, weight] = edge.split(" ").map((num) => num - 1);

    tree[parent].push([child, weight + 1]);
    tree[child].push([parent, weight + 1]);
  });

  const dfs = (node, weight) => {
    visited[node] = true;

    if (farthest.weight < weight) {
      farthest.node = node;
      farthest.weight = weight;
    }

    for (const [nextNode, nextWeight] of tree[node]) {
      if (visited[nextNode]) continue;

      dfs(nextNode, weight + nextWeight);
    }
  };

  dfs(0, 0);

  farthest.weight = 0;
  visited.fill(false);

  dfs(farthest.node, 0);

  return farthest.weight;
};

console.log(solution(N, edges));
