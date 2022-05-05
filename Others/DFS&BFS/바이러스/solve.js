const Queue = require("../../Queue/queue");
const [N, M, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(N, M, input) {
  const map = new Array(N)
    .fill()
    .map((_, row) => new Array(M).fill().map((_, col) => input[col + row * M]));

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let target = 0;
  let infectionTime = 0;

  const coords = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) coords.push([i, j]);
      if (!map[i][j]) target++;
    }
  }

  const bfs = (coords, depth) => {
    const q = new Queue();

    coords.forEach((coord) => {
      const [sr, sc] = coord;
      q.enQueue([sr, sc, depth]);
    });

    while (!q.isEmpty()) {
      const [r, c, dep] = q.deQueue();
      infectionTime = Math.max(infectionTime, dep);

      for (let i = 0; i < 4; i++) {
        const nr = r + DR[i];
        const nc = c + DC[i];

        if (nr < N && nc < M && nr >= 0 && nc >= 0 && !map[nr][nc]) {
          map[nr][nc] = 2;
          target--;
          q.enQueue([nr, nc, dep + 1]);
        }
      }
    }

    console.log(target === 0 ? infectionTime : -1);
  };

  bfs(coords, 0);
}

Solution(N, M, input);
