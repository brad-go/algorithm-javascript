# 17144. 미세먼지 안녕!

## 문제 링크

https://www.acmicpc.net/problem/17144

## 문제 분류

: 구현

## 소요 시간

: 1시간

## 풀이 방법

매초마다 미세먼지를 확산 및 공기청정기를 동작시키고 T초가 지난 후에 방 안에 남아있는 미세먼지의 수를 구하는 문제였다. 나는 2차원 배열인 방을 매 초마다 업데이트 해주는 방식으로 문제를 풀이했는데, 매초마다 매번 방을 탐색하면서 미세먼지를 구해야하기 때문에, 미세먼지만 모은 배열로 문제를 풀이해도 괜찮을 것 같다.

1. 공기 청정기의 위치를 찾는다.
2. 매 초마다 아래를 반복한다.
3. 방안의 미세먼지를 찾는다.
4. 미세먼지를 네 방향(상하좌우)으로 확산시킨다.
5. 공기 청정기를 위쪽, 아래쪽을 동작시킨다.

## 풀이 코드

```js
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const solution = (R, C, T, room) => {
  // 공기 청정기의 위치 찾기
  const airCleaner = findAirCleaner(R, room);

  let time = 0;

  // T초가 될 때까지
  while (time < T) {
    // 미세먼지 확산시키기
    spreadDusts(R, C, room, dusts);
    // 공기청정기 작동
    operateAirCleaner(R, C, room, airCleaner);

    time++;
  }

  // 방 안에 남은 미세먼지의 양 반환
  return getAmountOfDustLeft(room);
};

const findAirCleaner = (R, room) => {
  const position = [];

  for (let i = 0; i < R; i++) {
    if (room[i][0] === -1) position.push([i, 0]);
  }

  return { up: position[0], down: position[1] };
};

const findDusts = (room) => {
  const dusts = [];

  room.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value && value !== -1) dusts.push({ r, c, amount: value });
    });
  });

  return dusts;
};

// 미세먼지 확산시키기
const spreadDusts = (R, C, room, dusts) => {
  // 미세먼지의 위치와 양 찾기
  const dusts = findDusts(room);

  // 각 미세먼지마다 확산 시키기
  dusts.forEach((dust) => spreadDust(R, C, room, dust));
};

const spreadDust = (R, C, room, dust) => {
  const { r, c, amount } = dust;
  const spreadAmount = Math.floor(amount / 5);

  let spreadCount = 0;

  dirs.forEach(([dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;

    // 방 안이고 공기 청정기가 아니라면
    if (!isInRoom(R, C, nr, nc) || isAirCleaner(room, nr, nc)) return;

    // 해당 칸에 확산되는 먼지의 양을 더해주기
    room[nr][nc] += spreadAmount;
    spreadCount += 1;
  });

  // 기존 칸에서 확산된 미세먼지의 양 빼주기
  room[r][c] -= spreadAmount * spreadCount;
};

const isInRoom = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && c < C;
};

const isAirCleaner = (room, r, c) => {
  return room[r][c] === -1;
};

const operateAirCleaner = (R, C, room, airCleaner) => {
  operateUpperSide(R, C, room, airCleaner.up);
  operateLowerSide(R, C, room, airCleaner.down);
};

// 미세먼지를 반시계 방향으로 회전시키기
const operateUpperSide = (R, C, room, airCleaner) => {
  const [r] = airCleaner;

  for (let i = r - 1; i > 0; i--) {
    room[i][0] = room[i - 1][0];
  }

  for (let i = 0; i < C - 1; i++) {
    room[0][i] = room[0][i + 1];
  }

  for (let i = 0; i < r; i++) {
    room[i][C - 1] = room[i + 1][C - 1];
  }

  for (let i = C - 1; i > 1; i--) {
    room[r][i] = room[r][i - 1];
  }

  room[r][1] = 0;
};

// 미세먼지를 시계 방향으로 회전시키기
const operateLowerSide = (R, C, room, airCleaner) => {
  const [r] = airCleaner;

  for (let i = r + 1; i < R - 1; i++) {
    room[i][0] = room[i + 1][0];
  }

  for (let i = 0; i < C - 1; i++) {
    room[R - 1][i] = room[R - 1][i + 1];
  }

  for (let i = R - 1; i > r; i--) {
    room[i][C - 1] = room[i - 1][C - 1];
  }

  for (let i = C - 1; i > 1; i--) {
    room[r][i] = room[r][i - 1];
  }

  room[r][1] = 0;
};

const getAmountOfDustLeft = (room) => {
  return room.reduce((total, row) => {
    const rowSum = row.reduce((sum, cur) => {
      if (cur === -1 || cur === 0) return sum;

      return sum + cur;
    }, 0);

    return total + rowSum;
  }, 0);
};
```
