# 14502. 연구소

## 문제 링크

https://www.acmicpc.net/problem/14502

## 문제 분류

: 구현, 브루트포스 알고리즘, 그래프, 너비 우선 탐색

## 소요 시간

: 1시간 30분

## 풀이 방법

문제 풀이 아이디어는 금방 떠올랐다. 사실 시간 초과 때문에 될까말까 하면서 시도했지만, 성공했다. 문제 풀이는 세 단계로 이루어진다.

1. DFS를 통해 벽을 세 개 설치한다.
2. 벽을 세 개 설치했따면, 바이러스들의 위치를 찾고, BFS로 바이러스를 퍼뜨린다.
3. 바이러스가 퍼진 연구실 안에 있는 안전 구역의 크기를 세어서 최댓값과 비교해 갱신한다.

위의 로직대로 벽을 세우고, 바이러스를 퍼뜨리고, 안전 구역의 크기를 세는 로직은 정확히 동작했다. 그러나 시간 초과 때문에 문제를 완전히 풀이하는데, 시간을 많이 잡아먹었다.

처음에는 벽을 세운 후에 각 바이스들의 위치에서 BFS를 통해 바이러스를 퍼뜨렸는데, 이게 문제였다. 이 반복문 하나 때문에 시간 초과가 발생한거였다. 이 문제는 BFS 탐색 시작 시에 큐에 바이러스들의 위치를 모두 집어넣고 탐색을 진행시킴으로써 해결할 수 있었다.

## 풀이 코드

```js
const LAB = {
  empty: 0,
  wall: 1,
  virus: 2,
};

const solution = (N, M, lab) => {
  // 바이러스들 위치 찾기
  const viruses = findViruses(N, M, lab);

  // 총 안전 구역의 수
  let answer = 0;

  // DFS로 벽 세개 세우기
  const buildWall = (count) => {
    // 벽을 세개 세웠다면
    if (count === 3) {
      // 참조를 끊기 위해 벽을 세운 연구실 복사
      const newLab = lab.map((row) => [...row]);

      // 바이러스 퍼뜨리기
      spreadVirus(N, M, newLab, viruses);

      // 안전구역을 구해서 지금까지 만든 안전구역 최댓값과 비교
      answer = Math.max(answer, findSafetyZoneCount(newLab));

      return;
    }

    // 연구실 전체를 돌면서 벽 세우기
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        // 빈 곳이 아니라면
        if (lab[i][j] !== LAB.empty) continue;

        // 빈 곳이면 벽 세우기
        lab[i][j] = LAB.wall;
        // 벽을 세운 연구실의 상태로 다음 벽 세우러 가기
        buildWall(count + 1);
        // 다른 곳에 벽을 세우기 위해 다시 지워주기
        lab[i][j] = LAB.empty;
      }
    }
  };

  // 세 개가 될때까지 벽 세우기
  buildWall(0);

  return answer;
};

// 바이러스의 위치 찾기
const findViruses = (N, M, lab) => {
  const viruses = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (lab[i][j] === LAB.virus) viruses.push([i, j]);
    }
  }

  return viruses;
};

// bfs로 바이러스 퍼뜨리기
const spreadVirus = (N, M, lab, viruses) => {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  // 바이러스들의 위치 큐에 담기 - 해당 위치에서 탐색을 시작해야 하므로
  const queue = [...viruses];
  const visited = Array.from(Array(N), () => Array(M).fill(false));

  // 바이러스가 원래 있던 위치를 방문 처리
  viruses.forEach(([sr, sc]) => (visited[sr][sc] = true));

  // 큐가 빌 때까지
  while (queue.length) {
    const [r, c] = queue.shift();

    // 사방으로 퍼뜨리기
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // 연구실 안쪽이고, 방문한적이 없고 벽이 아니라면
      if (!isInLab(N, M, nr, nc) || visited[nr][nc] || lab[nr][nc] === LAB.wall)
        continue;

      // 바이러스 퍼뜨리기
      lab[nr][nc] = LAB.virus;
      visited[nr][nc] = true;

      // 다음 위치에서 다시 탐색 시작
      queue.push([nr, nc]);
    }
  }
};

// 연구실 안쪽인지 확인
const isInLab = (N, M, r, c) => 0 <= r && r < N && 0 <= c && c < M;

// 안전구역의 수 세기
const findSafetyZoneCount = (lab) => {
  return lab.reduce((acc, cur) => {
    return acc + cur.filter((cell) => cell === LAB.empty).length;
  }, 0);
};
```

## 코드 개선

연구실의 크기가 최대 8\*8로 64칸으로 이루어질 수 있다. 이 안에서 이 중에서 3곳을 선택하는 조합 함수를 사용하면 1번 테스트 케이스만 해도 6000개가 넘게 된다. 나는 당연히 스택오버플로우가 나거나 시간초과가 날 것이라 생각하고, 조합을 배제했었다. 하지만 이 문제의 경우 조합을 사용하는 것이 훨씬 빠르고 효율적이었다. 바이러스를 퍼뜨리는 것도 BFS가 아닌 DFS가 빨랐다는 점도 신기하다.

1. 조합 알고리즘을 통해 세 개의 벽을 배치할 수 있는 위치 조합들을 모두 구한다.
2. 각 벽을 세우는 방법마다 DFS로 바이러스를 퍼뜨리면서 바이러스의 수를 센다.
3. 연구실의 총 크기 - 바이러스의 수 - 벽의 수 - 설치한 벽의 수(3)을 뺀 것이 안전 구역의 수이다.
4. 바이러스를 퍼뜨리고 안전 구역의 수를 세가면서 가장 안전 구역을 많이 확보했을 때의 수를 반환한다.

```js
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const lab = input.slice(1).map((str) => str.split(" ").map(Number));

const LAB = {
  empty: 0,
  wall: 1,
  virus: 2,
};

const solution = (N, M, lab) => {
  const { wallBuildingCombinations, viruses, wallCount } = init(lab);
  const totalPlaceCount = N * M;

  let answer = 0;

  // 연구실에 벽을 세개 설치할 수 있는 모든 경우의 수 탐색
  wallBuildingCombinations.forEach((walls) => {
    const newLab = lab.map((row) => [...row]);

    // 벽 설치
    walls.forEach(([r, c]) => (newLab[r][c] = LAB.wall));

    // 바이러스를 퍼뜨리면서 바이러스의 개수 세기
    const virusCount = viruses.reduce((acc, [r, c]) => {
      return acc + spreadVirus(N, M, newLab, r, c);
    }, 0);
    // 연구실 총 공간의 수 - 바이러스 - 벽의 수를 뺀 것이 안전 구역의 수
    const safetyZoneCount = totalPlaceCount - virusCount - wallCount - 3;

    answer = Math.max(answer, safetyZoneCount);
  });

  return answer;
};

const init = (lab) => {
  const viruses = [];
  const emptyPlaces = [];

  let wallCount = 0;

  // 연구실을 확인하면서 바이러스와 빈공간, 벽의 수를 센다.
  lab.forEach((row, rowIndex) => {
    row.forEach((place, columnIndex) => {
      if (place === LAB.empty) emptyPlaces.push([rowIndex, columnIndex]);
      if (place === LAB.virus) viruses.push([rowIndex, columnIndex]);
      if (place === LAB.wall) wallCount++;
    });
  });

  // 빈 공간을 세 개씩 선택하는 모든 경우의 수를 찾는다.
  const wallBuildingCombinations = getCombinations(emptyPlaces, 3);

  return { wallBuildingCombinations, viruses, wallCount };
};

// 조합 알고리즘
const getCombinations = (array, select) => {
  if (select === 1) {
    return array.map((item) => [item]);
  }

  const results = [];

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

// DFS로 바이러스 퍼뜨리기
const spreadVirus = (N, M, lab, r, c) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let virusCount = 0;

  for (let dir = 0; dir < 4; dir++) {
    const nr = r + DR[dir];
    const nc = c + DC[dir];

    if (
      !isInLab(N, M, nr, nc) ||
      lab[nr][nc] === LAB.virus ||
      lab[nr][nc] === LAB.wall
    )
      continue;

    lab[nr][nc] = LAB.virus;
    virusCount += spreadVirus(N, M, lab, nr, nc);
  }

  return virusCount + 1;
};

// 연구실을 벗어나는지 확인
const isInLab = (N, M, r, c) => 0 <= r && r < N && 0 <= c && c < M;
```
