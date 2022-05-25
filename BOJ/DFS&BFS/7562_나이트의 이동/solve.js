const [t, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(t, input) {
  const bfs = (len, start, target) => {
    const [sr, sc] = start;
    const [tr, tc] = target;

    const DR = [-1, -2, -2, -1, 1, 2, 2, 1];
    const DC = [-2, -1, 1, 2, 2, 1, -1, -2];

    const q = [];
    const map = Array.from(Array(len), () => Array(len).fill(0));

    map[sr][sc] = 1;
    q.push([sr, sc, 0]);

    while (q.length) {
      const [r, c, move] = q.shift();

      if (r === tr && c === tc) {
        console.log(move);
        return;
      }

      for (let dir = 0; dir < 8; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (nr < len && nc < len && nr >= 0 && nc >= 0 && !map[nr][nc]) {
          map[nr][nc] = 1;
          q.push([nr, nc, move + 1]);
        }
      }
    }
  };

  for (let i = 0; i < Number(t); i++) {
    const l = Number(input.shift());
    const startPos = input.shift().split(" ").map(Number);
    const targetPos = input.shift().split(" ").map(Number);

    bfs(l, startPos, targetPos);
  }
}

Solution(t, input);
