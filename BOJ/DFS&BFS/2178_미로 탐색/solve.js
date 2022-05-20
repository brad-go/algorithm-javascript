const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = Array.from(Array(N), (_, row) =>
  Array(M)
    .fill()
    .map((_, col) => Number(input[row][col]))
);

function Solution(N, M, map) {
  const visited = Array.from(Array(N), () => Array(M).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const bfs = (sr, sc, depth) => {
    const q = [];

    visited[sr][sc] = 1;
    q.push([sr, sc, depth]);

    while (q.length) {
      const [r, c, dep] = q.shift();

      if (r === N - 1 && c === M - 1) {
        console.log(dep);
        return;
      }

      for (let i = 0; i < 4; i++) {
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (
          nr < N &&
          nc < M &&
          nr >= 0 &&
          nc >= 0 &&
          map[nr][nc] &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = 1;
          q.push([nr, nc, dep + 1]);
        }
      }
    }
  };

  bfs(0, 0, 1);
}

Solution(N, M, map);
