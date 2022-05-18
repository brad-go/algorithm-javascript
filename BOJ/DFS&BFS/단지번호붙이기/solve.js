const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(n);
const map = input.map((line) => line.split("").map((v) => +v));

function Solution(N, map) {
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const bfs = (sr, sc) => {
    const q = [];
    let cnt = 1;

    visited[sr][sc] = 1;
    q.push([sr, sc]);

    while (q.length) {
      const [r, c] = q.shift();

      for (let i = 0; i < 4; i++) {
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (
          nr < N &&
          nc < N &&
          nr >= 0 &&
          nc >= 0 &&
          map[nr][nc] &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = 1;
          q.push([nr, nc]);
          cnt++;
        }
      }
    }
    return cnt;
  };

  const answer = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j] || visited[i][j]) continue;

      answer.push(bfs(i, j));
    }
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  answer.forEach((v) => console.log(v));
}

Solution(N, map);
