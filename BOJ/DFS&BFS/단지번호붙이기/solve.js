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

  const traverse = (r, c, color) => {
    visited[r][c] = color;

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
        traverse(nr, nc, color);
      }
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j] || visited[i][j]) continue;

      traverse(i, j, i + j);
    }
  }

  const totalComplex = visited.flat(2).filter((v) => v);
  const complex = [...new Set(totalComplex)];

  const answer = new Array(complex.length + 1).fill(0);
  answer[0] = complex.length;

  for (let i = 0; i < totalComplex.length; i++) {
    if (complex[0] === totalComplex[i]) answer[1]++;
    if (complex[1] === totalComplex[i]) answer[2]++;
    if (complex[2] === totalComplex[i]) answer[3]++;
  }

  answer.forEach((v) => console.log(v));
}

Solution(N, map);
