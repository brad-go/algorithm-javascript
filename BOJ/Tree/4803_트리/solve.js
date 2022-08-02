const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  let answer = "";
  let idx = 0;
  let caseNum = 1;

  while (idx < input.length - 1) {
    const [n, m] = input[idx].split(" ").map(Number);
    idx++;

    const graph = new Array(n + 1).fill().map(() => []);
    const visited = new Array(n + 1);

    const DFS = (v, parent) => {
      if (visited[v]) return false;

      let result = true;
      visited[v] = true;

      for (let child of graph[v]) {
        if (child !== parent) result &= DFS(child, v);
      }

      return result;
    };

    for (let i = idx; i < idx + m; i++) {
      const [from, to] = input[i].split(" ").map(Number);
      graph[from].push(to);
      graph[to].push(from);
    }

    let cnt = 0;
    for (let i = 1; i <= n; i++) {
      if (!visited[i] && DFS(i, 0)) cnt++;
    }

    answer += `Case ${caseNum++}: `;

    if (cnt === 0) answer += `No trees.\n`;
    else if (cnt === 1) answer += `There is one tree.\n`;
    else answer += `A forest of ${cnt} trees.\n`;

    idx += m;
  }
  console.log(answer);
}

Solution(input);
