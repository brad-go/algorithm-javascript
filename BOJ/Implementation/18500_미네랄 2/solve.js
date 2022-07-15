// prettier-ignore
const input = require('fs').readFileSync('./input4.txt').toString().trim().split('\n');
const [R, C] = input[0].split(" ").map(Number);
const cave = input.slice(1, R + 1).map((line) => line.split("")).reverse(); // prettier-ignore
const THROWN_COUNT = Number(input[R + 1]);
const THROWN_HEIGHT = input[R + 2].split(" ").map((v) => v - 1);

const DR = [0, 1, 0, -1];
const DC = [1, 0, -1, 0];

function solution(cave, THROWN_COUNT, THROWN_HEIGHT) {
  let count = 0;

  while (count < THROWN_COUNT) {
    const visited = Array.from(Array(R), () => Array(C).fill(0));

    // 막대기 던지기
    throwStick(cave, THROWN_HEIGHT[count], count);

    // 땅에 있는 클러스터
    for (let i = 0; i < cave[0].length; i++) {
      if (visited[0][i] || cave[0][i] === ".") continue;

      findCluster(cave, visited, 0, i);
    }

    // 떠있는 클러스터 탐색
    const restMineralPoints = findMineral(cave, visited);

    count++;
    if (!restMineralPoints.length) continue;

    for (let i = 0; i < restMineralPoints.length; i++) {
      const [r, c] = restMineralPoints[i];

      if (visited[r][c]) continue;

      const clusterPoints = findCluster(cave, visited, r, c);

      for (let j = 0; j < clusterPoints.length; j++) {
        const [r, c] = clusterPoints[j];
        cave[r][c] = ".";
      }

      const heightDiff = [];

      for (let j = 0; j < clusterPoints.length; j++) {
        let [r, c] = clusterPoints[j];
        let diff = 0;

        while (0 < r && cave[r - 1][c] === ".") {
          r--;
          diff++;
        }

        heightDiff.push(diff);
      }

      // 아래로 떨어뜨리기
      const minHeightDiff = Math.min(...heightDiff);

      for (let j = 0; j < clusterPoints.length; j++) {
        const [r, c] = clusterPoints[j];
        cave[r - minHeightDiff][c] = "x";
      }
    }
  }

  const answer = cave
    .map((line) => line.join(""))
    .reverse()
    .join("\n");
  return answer;
}

const throwStick = (cave, height, count) => {
  if (count % 2 === 0) {
    for (let i = 0; i < cave[height].length; i++) {
      if (cave[height][i] === "x") {
        cave[height][i] = "."; // 미네랄 파괴
        break;
      }
    }
  } else {
    for (let i = cave[height].length; i >= 0; i--) {
      if (cave[height][i] === "x") {
        cave[height][i] = ".";
        break;
      }
    }
  }
};

const findCluster = (cave, visited, sr, sc) => {
  const clusterPoints = [[sr, sc]];
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

const findMineral = (cave, visited) => {
  const mineralPoint = [];

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (cave[i][j] === "." || visited[i][j]) continue;

      mineralPoint.push([i, j]);
    }
  }

  return mineralPoint;
};

console.log(solution(cave, THROWN_COUNT, THROWN_HEIGHT));
