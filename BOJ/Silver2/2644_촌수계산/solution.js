const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const targets = input[1].split(" ").map(Number);
const relations = input.slice(3).map((string) => string.split(" ").map(Number));

const solution = (N, targets, relations) => {
  const tree = Array.from(Array(N + 1), () => []);
  const [start, target] = targets;

  relations.forEach(([parent, child]) => {
    tree[parent].push(child);
    tree[child].push(parent);
  });

  return bfs(tree, start, target);
};

const bfs = (tree, start, target) => {
  const queue = [[start, 0]];
  const visited = new Array(N + 1).fill(false);

  visited[start] = true;

  while (queue.length) {
    const [current, count] = queue.shift();

    if (current === target) return count;

    for (const next of tree[current]) {
      if (visited[next]) continue;

      visited[next] = true;
      queue.push([next, count + 1]);
    }
  }

  return -1;
};

console.log(solution(N, targets, relations));
