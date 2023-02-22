const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const map = input.slice(1).map((str) => str.split("").map(Number));

const solution = (N, map) => {
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  const houseCounts = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 0 || visited[i][j]) continue;

      houseCounts.push(bfs(map, visited, i, j));
    }
  }

  houseCounts.sort((a, b) => a - b);

  return [houseCounts.length, ...houseCounts].join("\n");
};

const bfs = (map, visited, sr, sc) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[sr, sc]];

  visited[sr][sc] = 1;

  let count = 1;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInRange(N, nr, nc) || visited[nr][nc] || !map[nr][nc]) continue;

      visited[nr][nc] = 1;
      count++;

      queue.push([nr, nc]);
    }
  }

  return count;
};

const isInRange = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

console.log(solution(N, map));
