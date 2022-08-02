// prettier-ignore
const [nkr, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K, R] = nkr.split(" ").map(Number);
const roads = input.slice(0, R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore
const cows = input.slice(R).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore

const DR = [0, 1, 0, -1];
const DC = [1, 0, -1, 0];

function solution(N, K, R, roads, cows) {
  const map = Array.from(Array(N), () => Array(N).fill().map(() => Array(4).fill(0))); // prettier-ignore
  makeRoad(map, roads);

  const count = cows.reduce((count, [r, c]) => {
    return count + dijkstra(map, cows, r, c);
  }, 0);

  return count / 2;
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

const dijkstra = (map, cows, sr, sc) => {
  const digit = Array.from(Array(N), () => Array(N).fill(Number.MAX_SAFE_INTEGER)); // prettier-ignore
  const queue = [[sr, sc]];

  digit[sr][sc] = 0;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      let nr = r + DR[dir];
      let nc = c + DC[dir];
      let weight = 0;

      if (!isInRange(nr, nc)) continue;

      if (map[r][c][dir]) weight = 1;

      if (digit[r][c] + weight < digit[nr][nc]) {
        digit[nr][nc] = digit[r][c] + weight;
        queue.push([nr, nc]);
      }
    }
  }

  const count = cows.reduce((count, [r, c]) => {
    return digit[r][c] !== 0 ? count + 1 : count;
  }, 0);

  return count;
};

const isInRange = (r, c) => {
  if (r < 0 || N <= r || c < 0 || N <= c) return false;
  return true;
};

console.log(solution(N, K, R, roads, cows));
