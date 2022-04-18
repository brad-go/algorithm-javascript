const [n, m, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n) {
  const map = new Array(n);
  for (let i = 0; i < n; i++) {
    map[i] = new Array(m).fill().map((_, idx) => input[idx + i * m]);
  }

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let count = 0;

  const search = (r, c, dir) => {
    if (map[r][c] === 2) return;
    if (map[r][c] !== 3 && map[r][c] !== 1) map[r][c] = 10;

    count++;

    dir = 0;
    let nr = r + DR[dir];
    let nc = c + DC[dir];

    console.log(map);

    if (nr < n && nc < m && r >= 0 && c >= 0 && map[nr][nc] !== 1) {
      search(r + DR[dir], c + DC[dir], dir);
    } else {
      dir = (dir + 1) % 4;
      search(r + DR[dir], c + DC[dir], dir);
    }
  };

  search(0, 0, 0);
  console.log(count);
}

Solution(n);
