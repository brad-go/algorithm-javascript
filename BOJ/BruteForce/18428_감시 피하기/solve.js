const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const N = Number(input.shift());
const map = input.map((line) => line.split(" "));

function solution(N, map) {
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  return putObstacle(N, map, visited, 0) ? "YES" : "NO";
}

const putObstacle = (N, map, visited, count) => {
  if (count === 3) {
    if (!isStudentsFound(N, map)) return true;

    return false;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] !== "X" || visited[i][j]) continue;

      visited[i][j] = true;
      map[i][j] = "O";

      if (putObstacle(N, map, visited, count + 1)) return true;

      map[i][j] = "X";
      visited[i][j] = false;
    }
  }

  return false;
};

const isStudentsFound = (N, map) => {
  const DX = [0, 1, 0, -1];
  const DY = [1, 0, -1, 0];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] !== "T") continue;

      for (let dir = 0; dir < 4; dir++) {
        let nx = i + DX[dir];
        let ny = j + DY[dir];
        let isFound = findStudents(N, map, nx, ny, DX[dir], DY[dir]);

        if (isFound) return true;
      }
    }
  }

  return false;
};

const findStudents = (N, map, i, j, x, y) => {
  if (0 <= i && i < N && 0 <= j && j < N) {
    const current = map[i][j];

    if (current === "S") return true;
    if (current === "O") return false;

    return findStudents(N, map, i + x, j + y, x, y);
  }

  return false;
};

console.log(solution(N, map));
