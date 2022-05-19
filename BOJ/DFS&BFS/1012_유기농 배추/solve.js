const input = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input.shift());

function Solution(T, input) {
  for (let i = 0; i < T; i++) {
    const [M, N, K] = input
      .shift()
      .split(" ")
      .map((v) => +v);
    const position = [];
    for (let i = 0; i < K; i++) {
      const pos = input
        .shift()
        .split(" ")
        .map((v) => +v);
      position.push(pos);
    }

    const map = Array.from(Array(N), () => Array(M).fill(0));
    const visited = Array.from(Array(N), () => Array(M).fill(0));
    let answer = 0;

    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];

    for (let i = 0; i < K; i++) {
      const [x, y] = position[i];
      map[y][x] = 1;
    }

    const bfs = (sr, sc) => {
      const q = [];

      visited[sr][sc] = 1;
      q.push([sr, sc]);

      while (q.length) {
        const [r, c] = q.shift();

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
            q.push([nr, nc]);
          }
        }
      }
    };

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (!map[i][j] || visited[i][j]) continue;

        bfs(i, j);
        answer++;
      }
    }

    console.log(answer);
  }
}

Solution(T, input);
