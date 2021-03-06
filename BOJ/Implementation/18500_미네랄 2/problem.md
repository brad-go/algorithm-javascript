# 미네랄 2 - 18500

[문제 링크](https://www.acmicpc.net/problem/18500)

## 문제 풀이

문제에서 말하는 클러스터라는게 어떤 것을 나타내는지 이해가 잘 안됐었다. 그러나 몇 번 자세히 읽다보니 클러스터는 미네랄 뭉치를 말하는 거였다.
막대기를 던짐으로 인해 미네랄이 파괴되면, 새로 파생된 클러스터가 공중에 떠있을 수 있다. 이 떠있는 클러스터를 모양을 유지한 채로 바닥이나 다른 클러스터를 만나기전까지 아래로 내려야했다.
그러므로 파생된 클러스터에 있는 미네랄들의 좌표를 모두 알아야했고, 그 좌표들을 이용해 바닥이나 다른 클러스터를 만나기 전까지의 높이를 구해 아래로 이동시켜주는 방식으로 문제를 풀이할 수 있었다.

### 풀이 설명

1. 입력받은 횟수만큼 while문을 통해 아래를 반복한다.
2. 막대기를 던져서 이번 회차가 짝수라면 왼쪽에서, 홀수라면 오른쪽에서부터 확인하면서 미네랄을 만나면 파괴한다.
3. 땅에 있는 클러스터를 방문처리를 통해 체크해준다. 클러스터가 여러개 있을 수 있으므로, 맨 아랫줄을 반복문을 통해 전부 확인해준다. 클러스터를 찾는 것은 findCluster함수를 이용해 BFS방식으로 찾아낸다.
4. 땅에 있는 클러스터를 찾았다면 공중에 떠있는 클러스터를 찾는다. 방문처리 되지 않은 곳을 탐색하면서 공중에 떠있는 미네랄들의 좌표를 찾는다.
5. 찾은 좌표들이 없다면 다음 막대기를 던진다.
6. 찾은 좌표들이 있다면, 해당 좌표들을 통해서 떠있는 클러스트들을 찾는다.
7. 떠있는 클러스트들의 좌표값을 이용해 잠시 동굴에서 없애준다.
8. 각 좌표들이 바닥이나 다른 클러스터를 만나기까지의 높이를 구한다.
9. 구한 높이들에서 가장 최솟값만큼 클러스터들을 내려준다.

### 전체 코드

```js
const input = require('fs').readFileSync('./input4.txt').toString().trim().split('\n'); // prettier-ignore
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
```

### 코드 개선

코드를 리팩토링하다가 파생되는 클러스터는 막대기를 던질 때마다 최대 1개씩만 생긴다는 것을 알아챘다.
그러므로 땅에 붙어있는 클러스터와 연결되지 않은 모든 미네랄들의 좌표를 구한 후 각 미네랄들 마다 클러스터를 찾는 작업을 할 필요가 없었다.
막대기를 던져서 미네랄이 부서진 좌표를 통해 파생된 클러스터를 찾고, 해당 클러스터를 아래로 떨어뜨려주면 되었다.

```js
// prettier-ignore
const input = require('fs').readFileSync('./input4.txt').toString().trim().split('\n');
const [R, C] = input[0].split(" ").map(Number);
const cave = input.slice(1, R + 1).map((line) => line.split("")).reverse(); // prettier-ignore
const THROWN_COUNT = Number(input[R + 1]);
const THROWN_HEIGHT = input[R + 2].split(" ").map((v) => v - 1);

function solution(cave, THROWN_COUNT, THROWN_HEIGHT) {
  const visited = Array.from(Array(R), () => Array(C).fill(0));

  for (let count = 0; count < THROWN_COUNT; count++) {
    // 막대기를 던지고 파괴된 미네랄의 좌표 반환
    const target = throwStick(cave, THROWN_HEIGHT[count], count);
    // 파괴된 미네랄이 없다면 다음 막대기 던지기
    if (!target) continue;

    // 땅에 붙어있는 클러스터 방문처리해주기
    checkClusterOnTheGround(cave, visited);
    // 위에서 찾은 좌표를 통해 파생된 클러스터 찾기
    const derivedCluster = findCluster(cave, visited, target[0], target[1]);
    // 파생된 클러스터가 없다면 다음 막대기 던지기
    if (!derivedCluster) continue;
    // 파생된 클러스터 떨어뜨리기
    dropCluster(derivedCluster);
    visited.forEach((line) => line.fill(0));
  }

  const answer = cave.map((line) => line.join("")).reverse().join("\n"); // prettier-ignore
  return answer;
}

// 막대기 던지기
const throwStick = (cave, height, count) => {
  let target;

  // 짝수라면 왼쪽에서부터 미네랄 찾아서 부수기
  if (count % 2 === 0) {
    for (let i = 0; i < C; i++) {
      if (cave[height][i] === ".") continue;

      cave[height][i] = ".";
      target = [height, i];
      break;
    }
  } else {
    // 홀수라면 오른쪽에서부터 미네랄 찾아서 부수기
    for (let i = C - 1; i >= 0; i--) {
      if (cave[height][i] === ".") continue;

      cave[height][i] = ".";
      target = [height, i];
      break;
    }
  }

  return target;
};

// 땅에 붙어있는 클러스터 방문처리해주기 - 떠있는 클러스터를 찾을 수 있게 하기 위해 필요
const checkClusterOnTheGround = (cave, visited) => {
  const ground = cave[0];

  ground.forEach((space, idx) => {
    if (space === "." || visited[0][idx]) return;
    findCluster(cave, visited, 0, idx);
  });
};

// BFS로 클러스터 찾기
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

      // 범위를 벗어나지 않고, x이면서 방문하지 않은 곳이라면
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

// 클러스터 떨어뜨리기
const dropCluster = (cluster) => {
  const heightDifferences = [];
  let diff = 0;

  // 각 클러스터의 미네랄들을 잠시 동굴에서 없애주기
  cluster.forEach(([r, c]) => (cave[r][c] = "."));
  // 각 미네랄들의 좌표를 이용해서 각 미네랄들이 바닥이나 다른 클러스터를 만날 때까지의 높이 차 구하기
  cluster.forEach(([r, c]) => {
    while (0 < r && cave[r-- - 1][c] === ".") diff++;

    heightDifferences.push(diff);
    diff = 0;
  });

  // 최소 높이차를 구하고, 기존 좌표에서 높이차만큼 아래의 좌표에 미네랄 표시
  const minHeightDifference = Math.min(...heightDifferences);
  cluster.forEach(([r, c]) => (cave[r - minHeightDifference][c] = "x"));
};

console.log(solution(cave, THROWN_COUNT, THROWN_HEIGHT));
```
