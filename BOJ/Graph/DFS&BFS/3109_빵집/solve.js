// prettier-ignore
const [rc, ...map] = require('fs').readFileSync('./input2.txt').toString().trim().split('\n');
const [R, C] = rc.split(" ").map(Number);

const DR = [-1, 0, 1];
const DC = [1, 1, 1];

function solution(R, C, map) {
  const visited = Array.from(Array(R), () => Array(C).fill(false));
  const answer = map.reduce((pipe, _, idx) => {
    return pipe + dfs(R, C, map, visited, idx, 0);
  }, 0);

  return answer;
}

const dfs = (R, C, map, visited, r, c) => {
  visited[r][c] = true;

  if (c === C - 1) return 1;

  for (let dir = 0; dir < 3; dir++) {
    const nr = r + DR[dir];
    const nc = c + DC[dir];

    if (isInRange(R, C, nr, nc) && map[nr][nc] === "." && !visited[nr][nc]) {
      const pipes = dfs(R, C, map, visited, nr, nc);
      if (pipes) return 1;
    }
  }

  return 0;
};

const isInRange = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && C;
};

console.log(solution(R, C, map));
