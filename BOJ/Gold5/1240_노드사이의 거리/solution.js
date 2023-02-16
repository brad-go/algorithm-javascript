const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0].split(" ")[0];
const edges = input.slice(1, N);
const pairs = input.slice(N);

const solution = (N, edges, pairs) => {
  const tree = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(false);
  const distances = [];

  edges.forEach((edge) => {
    const [nodeA, nodeB, weight] = edge.split(" ").map(Number);

    tree[nodeA].push([nodeB, weight]);
    tree[nodeB].push([nodeA, weight]);
  });

  const dfs = (node, targetNode, weight) => {
    visited[node] = true;

    if (node === targetNode) {
      distances.push(weight);
      return;
    }

    for (const [nextNode, nextWeight] of tree[node]) {
      if (visited[nextNode]) continue;

      dfs(nextNode, targetNode, weight + nextWeight);
    }
  };

  pairs.forEach((pair) => {
    const [node, targetNode] = pair.split(" ").map(Number);

    dfs(node, targetNode, 0);
    visited.fill(false);
  });

  return distances.join("\n");
};

console.log(solution(N, edges, pairs));
