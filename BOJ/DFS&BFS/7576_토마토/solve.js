const [n, m, ...input] = require("fs")
  .readFileSync("./input5.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);
const box = Array.from(Array(m), (_, row) =>
  Array(n)
    .fill()
    .map((_, col) => input[col + row * n])
);

function Solution(n, m, box) {
  const visited = Array.from(Array(m), () => Array(n).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let day = 0;

  const bfs = (poses, depth) => {
    const q = [];

    for (let pos of poses) {
      const [sr, sc] = pos;
      visited[sr][sc] = 1;
      box[sr][sc] = 1;
      q.push([sr, sc, depth]);
    }

    while (q.length) {
      const [r, c, dep] = q.shift();

      if (!q.length) day = Math.max(day, dep);

      for (let i = 0; i < 4; i++) {
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (
          nr < m &&
          nc < n &&
          nr >= 0 &&
          nc >= 0 &&
          box[nr][nc] === 0 &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = 1;
          box[nr][nc] = 1;
          q.push([nr, nc, dep + 1]);
        }
      }
    }
  };

  const findRipeTomatoes = (box) => {
    const ripeTomatoesPos = [];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (box[i][j] === 1) ripeTomatoesPos.push([i, j]);
      }
    }

    return ripeTomatoesPos;
  };

  const checkUnRipeTomatoes = (box) => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (box[i][j] === 0) return false;
      }
    }
    return true;
  };

  const ripeTomatoesPos = findRipeTomatoes(box);
  bfs(ripeTomatoesPos, 0);

  console.log(checkUnRipeTomatoes(box) ? day : -1);
}

Solution(n, m, box);
