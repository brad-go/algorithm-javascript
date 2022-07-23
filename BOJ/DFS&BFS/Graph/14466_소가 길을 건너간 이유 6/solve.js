// prettier-ignore
const [nkr, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K, R] = nkr.split(" ").map(Number);
const roads = input.slice(0, R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore
const cows = input.slice(R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore

const DR = [0, 1, 0, -1];
const DC = [1, 0, -1, 0];

function solution(N, K, roads, cows) {
  const map = Array.from(Array(N), () => Array(N).fill().map(() => Array(4).fill(0))); // prettier-ignore
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  let count = 0;

  makeRoad(map, roads);

  cows.forEach(([r, c], cur) => {
    visited.forEach((visit) => visit.fill(0));
    bfs(map, visited, r, c);

    for (let i = cur + 1; i < K; i++) {
      if (!visited[cows[i][0]][cows[i][1]]) count++;
    }
  });

  return count;
}

const makeRoad = (map, roads) => {
  roads.forEach((road) => {
    const [startR, startC, endR, endC] = road;

    for (let dir = 0; dir < 4; dir++) {
      let nextR = startR + DR[dir];
      let nextC = startC + DC[dir];

      if (nextR !== endR || nextC !== endC) continue;

      map[startR][startC][dir] = 1;
      map[nextR][nextC][(dir + 2) % 4] = 1;
    }
  });
};

const bfs = (map, visited, sr, sc) => {
  const queue = [[sr, sc]];
  visited[sr][sc] = 1;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      if (map[r][c][dir]) continue;

      let nr = r + DR[dir];
      let nc = c + DC[dir];

      if (!isInRange(nr, nc) || visited[nr][nc]) continue;

      visited[nr][nc] = 1;
      queue.push([nr, nc]);
    }
  }
};

const isInRange = (r, c) => {
  if (r < 0 || N <= r || c < 0 || N <= c) return false;
  return true;
};

console.log(solution(N, K, roads, cows));
