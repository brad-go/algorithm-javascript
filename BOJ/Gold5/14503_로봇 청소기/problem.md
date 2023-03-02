# 14503. 로봇 청소기

## 문제 링크

https://www.acmicpc.net/problem/14503

## 문제 분류

: 구현

## 소요 시간

: 1시간 20분

## 풀이 방법

문제 풀이는 문제에 나온대로 구현을 하면되었지만, 어떻게 구현할지를 고민하다가 시간이 좀 걸렸다. DFS를 통해서 청소기가 방 안을 청소하게 만들어서 이 문제를 해결할 수 있었다.

1. 위치, 방향을 가진 청소기 생성
2. 처음 위치부터 청소 시작
3. 만약 사방이 청소되어있거나 벽이라면 후진한다. 후진할 곳이 벽이라면 작동을 멈춘다.
4. 후진에 성공했다면 계속 청소를 진행한다.
5. 네 방향 중에 청소할 곳이 하나라도 있다면, 반시계 방향으로 청소기를 회전시킨다.
6. 해당 방향의 앞쪽 칸이 방 안이고, 청소되지 않은 곳이며, 벽이 아니라면 청소기를 전진시키고, 청소를 진행한다.

## 풀이 코드

```js
const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const ROOM = {
  uncleaned: 0,
  wall: 1,
  cleaned: 2,
};

const solution = (N, M, R, C, D, board) => {
  // 청소기 생성
  const cleaner = createCleaner(R, C, D);

  // 청소 진행
  cleanUp(N, M, board, cleaner);

  // 청소한 칸의 개수 반환
  return countCleanedPlace(board);
};

// 청소기 생성
const createCleaner = (R, C, D) => ({ r: R, c: C, dir: D, isAlive: true });

// 청소
const cleanUp = (N, M, board, cleaner) => {
  const { r, c } = cleaner;
  // 현재 위치 청소
  board[r][c] = ROOM.cleaned;

  // 사방이 모두 청소 되어있다면
  if (isAllCleaned(board, cleaner)) {
    // 뒤로 후진
    moveBackward(N, M, board, cleaner);

    // 후진에 성공했다면 계속 청소
    if (cleaner.isAlive) cleanUp(N, M, board, cleaner);
    return;
  }

  // 네 방향만 탐색하면 되니까
  for (let dir = 0; dir < 4; dir++) {
    // 반시계 방향으로 90도 회전
    rotateCleaner(cleaner);

    // 다음 칸의 위치 구하기
    const [dr, dc] = DIRECTIONS[cleaner.dir];
    const nr = cleaner.r + dr;
    const nc = cleaner.c + dc;

    // 다음 칸이 방 안이고, 청소되지 않은 곳이며, 벽이 아니라면
    if (
      isInRoom(N, M, nr, nc) &&
      board[nr][nc] === ROOM.uncleaned &&
      board[nr][nc] !== ROOM.wall
    ) {
      // 청소기를 이동시키기
      cleaner.r = nr;
      cleaner.c = nc;

      // 청소 진행
      cleanUp(N, M, board, cleaner);
      break;
    }
  }
};

// 네 방향이 모두 청소되어있다면
const isAllCleaned = (board, cleaner) => {
  return DIRECTIONS.every(([dr, dc]) => {
    return (
      board[cleaner.r + dr][cleaner.c + dc] === ROOM.cleaned ||
      board[cleaner.r + dr][cleaner.c + dc] === ROOM.wall
    );
  });
};

// 청소기 후진시키기
const moveBackward = (N, M, board, cleaner) => {
  // 현재 방향에서 후진 방향 구하기
  const [dr, dc] = DIRECTIONS[(cleaner.dir + 2) % 4];
  const nr = cleaner.r + dr;
  const nc = cleaner.c + dc;

  // 방 안이 아니며, 벽이라면 청소기 작동 중지
  if (!isInRoom(N, M, nr, nc) || board[nr][nc] === ROOM.wall) {
    cleaner.isAlive = false;
    return;
  }

  // 후진 가능하면 청소기 후진시키기
  cleaner.r = nr;
  cleaner.c = nc;
};

const isInRoom = (N, M, r, c) => 1 <= r && r < N - 1 && 1 <= c && c < M - 1;

const rotateCleaner = (cleaner) => {
  cleaner.dir = cleaner.dir - 1 < 0 ? 3 : cleaner.dir - 1;
};

const countCleanedPlace = (board) => {
  return board.reduce((acc, cur) => {
    return acc + cur.filter((cell) => cell === ROOM.cleaned).length;
  }, 0);
};
```
