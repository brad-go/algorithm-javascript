const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, M, map) => {
  const distances = Array.from(Array(N), () => Array(M).fill(0));
  const [sr, sc] = findTarget(N, M, map);

  bfs(distances, map, sr, sc);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (distances[i][j] === 0 && map[i][j] === 1) {
        distances[i][j] = -1;
      }
    }
  }

  return distances.map((row) => row.join(" ")).join("\n");
};

const findTarget = (N, M, map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) return [i, j];
    }
  }
};

const bfs = (distances, map, sr, sc) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[sr, sc, 0]];
  const visited = Array.from(Array(map.length), () =>
    Array(map[0].length).fill(false)
  );

  visited[sr][sc] = true;

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    distances[r][c] = dist;

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInRange(map, nr, nc) || !map[nr][nc] || visited[nr][nc]) continue;

      visited[nr][nc] = true;
      queue.push([nr, nc, dist + 1]);
    }
  }
};

const isInRange = (map, r, c) => {
  return 0 <= r && r < map.length && 0 <= c && 0 < map[0].length;
};

console.log(solution(N, M, map));
