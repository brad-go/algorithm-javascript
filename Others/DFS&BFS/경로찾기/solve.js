const [n, m, ...input] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, m, input) {
  const map = new Array(n)
    .fill()
    .map((_, row) => new Array(m).fill().map((_, col) => input[col + row * m]));

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const visited = Array.from(Array(n), () => Array(m).fill(0));

  // dfs

  const dfs = (r, c, depth) => {
    if (map[r][c] === 2) {
      console.log(depth);
      return;
    }

    visited[r][c] = 1;
    map[r][c] = 10;

    for (let i = 0; i < 4; i++) {
      let nr = r + DR[i];
      let nc = c + DC[i];

      if (
        nr < n &&
        nc < m &&
        nr >= 0 &&
        nc >= 0 &&
        !visited[nr][nc] &&
        map[nr][nc] !== 1
      ) {
        dfs(nr, nc, depth + 1);
      }
    }
  };

  dfs(0, 0, 0);
}

Solution(n, m, input);
