const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(n);

function Solution(N, input) {
  const tree = new Array(N + 1).fill().map(() => []);
  const visitied = new Array(N + 1).fill(0);

  for (let edge of input) {
    const [from, to] = edge.split(" ").map(Number);

    tree[from].push(to);
    tree[to].push(from);
  }

  const bfs = (ROOT) => {
    const q = [];
    visitied[ROOT] = 1;
    q.push(ROOT);

    while (q.length) {
      const node = q.shift();

      for (let next of tree[node]) {
        if (visitied[next]) continue;

        visitied[next] = node;
        q.push(next);
      }
    }
  };

  bfs(1);

  let result = "";
  for (let i = 2; i < visitied.length; i++) {
    result += `${visitied[i]}\n`;
  }
  console.log(result.trim());
}

Solution(N, input);
