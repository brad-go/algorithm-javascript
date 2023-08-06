# 20057. 마법사 상어와 토네이도

## 문제 링크

https://www.acmicpc.net/problem/20057

## 문제 분류

: 구현, 시뮬레이션

## 소요 시간

: 1시간 30분

## 풀이 방법

1. 초기 모래의 양을 구한다.
2. 토네이도를 중앙에서부터 회전시키면서 이동시킨다.
3. 토네이도가 이동할 때, 모래를 이동시키는데 지정된 비율에 따라 모래를 이동시켜준다.
4. 모든 이동이 끝난 후 초기 모래의 양에서 모래밭에 남은 모래의 양을 뺀 값을 반환한다.

## 풀이 코드

```js
// 방향 좌, 하, 우, 상
const DR = [0, 1, 0, -1];
const DC = [-1, 0, 1, 0];

const solution = (N, sands) => {
  // 초기의 총 모래의 양 구하기
  const totalSand = findAmountOfSand(sands);

  // 토네이도를 이동시키기
  moveTornado(N, sands);

  // 모래밭에 남은 모래의 양 구하기
  const leftSand = findAmountOfSand(sands);

  // 밖으로 날아간 모래의 양(== 초기 양에서 남은 모래의 양을 뺀 값)을 반환
  return totalSand - leftSand;
};

const moveTornado = (N, sands) => {
  // 모래밭의 중앙 위치 찾기 == 토네이도가 시작되는 위치
  let [r, c] = findStartingPosition(N);
  let dir = 0;
  // 이동할 블럭 수
  let blocksCount = 1;
  // 두번 방향이 바뀔 때마다 이동할 블럭 수가 1씩 증가하면 빙글빙글 돌릴 수 있다.
  let count = 0;

  while (true) {
    for (let i = 0; i < blocksCount; i++) {
      // 해당 방향으로 토네이도 이동
      r += DR[dir];
      c += DC[dir];

      // 모래 이동 시키기
      moveSand(sands, r, c, dir);

      // 좌상단에 도착했을 시 토네이도 종료
      if (r == 0 && c == 0) return;
    }

    // 블럭 수 만큼 이동 후 방향 전환
    dir = (dir + 1) % 4;
    count++;

    // 토네이도를 빙글빙글 돌리기 위해
    if (count == 2) {
      blocksCount++;
      count = 0;
    }
  }
};

// 초기 시작 위치 찾기
const findStartingPosition = (gridSize) => {
  const halfSize = Math.floor(gridSize / 2);

  return [halfSize, halfSize];
};

// 모래 이동시키기
const moveSand = (sands, r, c, dir) => {
  // 현재 위치의 모래 양
  const sand = sands[r][c];

  let nr = r + DR[dir] * 2;
  let nc = c + DC[dir] * 2;
  let movedSand = 0;

  // 이동할 방향의 끝부터
  let sandToMove = findProportionAmountOfSand(sand, 5);
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 수직
  sandToMove = findProportionAmountOfSand(sand, 7);
  nr = r + DR[(dir + 1) % 4];
  nc = c + DC[(dir + 1) % 4];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 7);
  nr = r + DR[(dir + 3) % 4];
  nc = c + DC[(dir + 3) % 4];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 2);
  nr = r + DR[(dir + 1) % 4] * 2;
  nc = c + DC[(dir + 1) % 4] * 2;
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 2);
  nr = r + DR[(dir + 3) % 4] * 2;
  nc = c + DC[(dir + 3) % 4] * 2;
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 진행 방향의 좌우 대각
  sandToMove = findProportionAmountOfSand(sand, 10);
  nr = r + DR[(dir + 1) % 4] + DR[dir];
  nc = c + DC[(dir + 1) % 4] + DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 10);
  nr = r + DR[(dir + 3) % 4] + DR[dir];
  nc = c + DC[(dir + 3) % 4] + DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 진행 방향 반대의 좌우 대각
  sandToMove = findProportionAmountOfSand(sand, 1);
  nr = r + DR[(dir + 1) % 4] - DR[dir];
  nc = c + DC[(dir + 1) % 4] - DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  sandToMove = findProportionAmountOfSand(sand, 1);
  nr = r + DR[(dir + 3) % 4] - DR[dir];
  nc = c + DC[(dir + 3) % 4] - DC[dir];
  movedSand += sandToMove;

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sandToMove;
  }

  // 진행 방향 앞 쪽
  nr = r + DR[dir];
  nc = c + DC[dir];

  if (isInSand(N, nr, nc)) {
    sands[nr][nc] += sand - movedSand;
  }

  sands[r][c] = 0;
};

const isInSand = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const findProportionAmountOfSand = (amountOfSand, proportion) => {
  return Math.trunc(amountOfSand * (proportion / 100));
};

const findAmountOfSand = (sands) => {
  return sands.reduce((acc, cur) => {
    acc += cur.reduce((acc, cur) => acc + cur, 0);

    return acc;
  }, 0);
};

console.log(solution(N, sands));
```
