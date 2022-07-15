// prettier-ignore
const input = require('fs').readFileSync('./input4.txt').toString().trim().split('\n');
const [R, C] = input[0].split(" ").map(Number);
const cave = input.slice(1, R + 1).map((line) => line.split("")).reverse(); // prettier-ignore
const THROWN_COUNT = Number(input[R + 1]);
const THROWN_HEIGHT = input[R + 2].split(" ").map((v) => v - 1);

function solution(cave, THROWN_COUNT, THROWN_HEIGHT) {
  const visited = Array.from(Array(R), () => Array(C).fill(0));

  for (let count = 0; count < THROWN_COUNT; count++) {
    const target = throwStick(cave, THROWN_HEIGHT[count], count);

    if (!target) continue;

    checkClusterOnTheGround(cave, visited);
    const derivedCluster = findCluster(cave, visited, target[0], target[1]);

    if (!derivedCluster) continue;

    dropCluster(derivedCluster);
    visited.forEach((line) => line.fill(0));
  }

  const answer = cave.map((line) => line.join("")).reverse().join("\n"); // prettier-ignore
  return answer;
}

const throwStick = (cave, height, count) => {
  let target;

  if (count % 2 === 0) {
    for (let i = 0; i < C; i++) {
      if (cave[height][i] === ".") continue;

      cave[height][i] = ".";
      target = [height, i];
      break;
    }
  } else {
    for (let i = C - 1; i >= 0; i--) {
      if (cave[height][i] === ".") continue;

      cave[height][i] = ".";
      target = [height, i];
      break;
    }
  }

  return target;
};

const checkClusterOnTheGround = (cave, visited) => {
  const ground = cave[0];

  ground.forEach((space, idx) => {
    if (space === "." || visited[0][idx]) return;
    findCluster(cave, visited, 0, idx);
  });
};

const findCluster = (cave, visited, sr, sc) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const clusterPoints = [];
  const queue = [[sr, sc]];
  visited[sr][sc] = 1;

  while (queue.length) {
    const [r, c] = queue.pop();

    for (let dir = 0; dir < 4; dir++) {
      let nr = r + DR[dir];
      let nc = c + DC[dir];

      if (isInRange(nr, nc) && cave[nr][nc] === "x" && !visited[nr][nc]) {
        visited[nr][nc] = 1;
        clusterPoints.push([nr, nc]);
        queue.push([nr, nc]);
      }
    }
  }

  return clusterPoints;
};

const isInRange = (nr, nc) => {
  if (0 <= nr && nr < R && 0 <= nc && nc < C) return true;
  return false;
};

const dropCluster = (cluster) => {
  const heightDifferences = [];
  let diff = 0;

  cluster.forEach(([r, c]) => (cave[r][c] = "."));
  cluster.forEach(([r, c]) => {
    while (0 < r && cave[r-- - 1][c] === ".") diff++;

    heightDifferences.push(diff);
    diff = 0;
  });

  const minHeightDifference = Math.min(...heightDifferences);
  cluster.forEach(([r, c]) => (cave[r - minHeightDifference][c] = "x"));
};

console.log(solution(cave, THROWN_COUNT, THROWN_HEIGHT));
