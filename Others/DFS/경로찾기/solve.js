// const [n, m, ...input] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split(/\s/)
//   .map((v) => +v);

// function Solution(n) {
//   const map = new Array(n);
//   for (let i = 0; i < n; i++) {
//     map[i] = new Array(m).fill().map((_, idx) => input[idx + i * m]);
//   }

//   const DR = [0, 1, 0, -1];
//   const DC = [1, 0, -1, 0];

//   let count = 0;

//   const search = (r, c, dir) => {
//     if (map[r][c] === 2) return;
//     if (map[r][c] !== 3 && map[r][c] !== 1) map[r][c] = 10;

//     count++;

//     dir = 0;
//     let nr = r + DR[dir];
//     let nc = c + DC[dir];

//     console.log(map);

//     if (nr < n && nc < m && r >= 0 && c >= 0 && map[nr][nc] !== 1) {
//       search(nr, nc, dir);
//     } else {
//       dir = (dir + 1) % 4;
//       search(r + DR[dir], c + DC[dir], dir);
//     }
//   };

//   search(0, 0, 0);
//   console.log(count);
// }

// Solution(n);

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

  const visited = Array.from(Array(n), () => Array(m).fill(0));

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  let idx = 1;

  const search = (r, c, dir) => {
    for (let i = 0; i < 4; i++) {
      let nr = r + DR[i % 4];
      let nc = c + DC[i % 4];

      if (nr >= n || nc >= m || nr < 0 || nc < 0) continue;

      if (map[nr][nc] !== 1 && visited[nr][nc] === 0) {
        visited[nr][nc] = idx;
        idx++;

        console.log("방향", i);
        console.log(visited);

        search(nr, nc, i);
      }
    }
  };

  search(0, 0, 0);
  console.log(visited[n - 1][m - 1]);
}

Solution(n);

// if (map[r][c] === 2) return;
// if (visited[n - 1][c - 1] === 1) return;
// if (r === n - 1 && c === m - 1) return;
