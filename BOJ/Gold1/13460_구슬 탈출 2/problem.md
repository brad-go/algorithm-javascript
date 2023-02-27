# 13460. 구슬 탈출 2

## 문제 링크

https://www.acmicpc.net/problem/13460

## 문제 분류

: 구현, 그래프, 너비 우선 탐색

## 소요 시간

: 4시간

## 풀이 방법

보드에 있는 빨강, 파랑 구슬을 상하좌우로 기울여서 빨간 구슬이 탈출 구멍에 들어가 탈출하기 위해 몇 번의 기울임이 필요한가를 찾는 문제였다. 상하좌우 총 4방향이고, 최대 10번까지만 움직이라고 했으니 움직이는 횟수의 최댓값은 4^10이 된다. 그러므로 BFS가 풀이에 더 적합할 것 같아서 해당 방법으로 풀이했는데, DFS와 함께 방문배열을 통해 문제를 풀이하는 것이 더 좋았을 듯 싶다.

우선, 구슬들의 움직임을 매번 보드에서 표시해가면서 문제를 풀이하려고 했지만, 매번 그렇게 탐색을 하기에는 어려움이 있었다. 그래서 나는 보드에서 처음 구슬의 위치를 찾고, **위칫값을 가진 구슬 객체**를 만든 후에 보드에서는 구슬 표시를 지워버렸다.

이제 구슬을 움직이게 만들어야 하니 **구슬이 움직이지 못하는 조건**을 찾아보자.

- 이동하려는 칸이 벽('#')일 때
- 이동하려는 칸에 다른 색의 구슬이 있을 때

이 두가지 경우에는 구슬이 움직이지 못한다. 이를 제외한 경우에는 구슬이 움직일 수 있다. 그러나 구슬은 동시에 움직여야 하고, 한번 움직이면 막힐 때까지 굴러가야 한다. 빨강, 파랑 구슬을 동시에 움직이기는 꽤 어려울 것 같다. 그렇다고 매번 빨강 구슬을 먼저 움직이면 빨강 구슬이 가려는 길을 파랑 구슬이 막고 있다면 사실 굴러갈 수 있는 것을 못 굴러가게 되는 상황이 생긴다. 그렇다면 어떤 구슬을 먼저 움직이게 만들어야 할까?

나는 매번 기울이는 동작 전에 **구슬들을 현재 위치를 기준으로 정렬**하는 방법으로 이 문제를 해결했다. 위쪽으로 기룽인다면 더 위쪽에 있는 구슬을 먼저 굴리고, 오른쪽이라면 더 오른쪽에 있는 구슬을 먼저 굴리는 방식으로 위의 문제를 해결할 수 있다.

이번에는 구슬이 굴러가다가 구멍을 만났을 때를 생각해보자. 나는 구슬이 굴러가다가 구멍을 만나면 멈추고, 탈출하게 만들었다. 파랑 구슬이 먼저 들어간다면 어차피 실패이지만, 빨강 구슬과 파랑 구슬이 동시에 들어갈때는 어떨까? 예를 들어 이 문제의 예제 7번을 보자.

```
##########
#.O....RB#
##########
```

왼쪽으로 기울인다면 빨강 구슬이 구멍 자리에서 멈추고, 파랑 구슬이 굴러가게 된다. 사실 파랑 구슬도 같이 빠지게 되어서 실패하는 경우인데, 빨강 구슬이 구멍 자리에서 파랑 구슬을 막고 있으니 성공으로 처리가 될 수 있다. 그러므로 **구슬이 구멍에 만나게 된다면 보드에서 없애줘야 한다**.

마지막으로 방문처리에 대한 문제이다. 위에서 말했듯이, 이 문제는 최대 기울이기 횟수가 4^10이 된다. 2초의 시간으로는 이 모든 경우의 수를 탐색하기에는 시간이 모자라다. 그렇다면 어떻게 해야할까? 사실 방문 배열을 이용해서 이 문제를 해결하고 싶었지만, 나는 BFS로 이 문제에 접근했고, 방문 배열이 모든 경우에서 공유하게
되므로 방문 배열을 이용할 수가 없었다.

그래서 차선책으로 나는 방문 처리가 아닌 **원래 구슬들의 위치와 움직인 후의 구슬들의 위치를 비교**했다. 만약, 빨간 구슬과 파란 구슬이 움직인 후에도 제자리라면 해당 기울이는 동작은 필요가 없다. 그래서 해당 기울임 동작에서 분기를 끊어버림으로써 이를 해결할 수 있었다.

1. 빨강, 파랑 구슬의 위치를 찾고, 해당 위치를 비운다.
2. 찾은 구슬 위치를 이용해 위치, 색깔, 구멍을 만났는지 여부를 가진 객체를 생성한다.
3. 아래의 BFS탐색을 이용해 몇 번의 기울임을 통해 빨강 구슬을 탈출시킬 수 있는지 찾는다.
4. 큐에 구슬들과 기울임 횟수를 집어넣고 큐가 빌때까지 반복한다.
5. 만약 10번을 기울여봤다면 종료하고 -1을 반환한다. (탈출 불가로 여김)
6. 상하좌우 네 방향으로 구슬을 기울여본다.
7. 각 기울임마다 기존 구슬들을 꺼내서 복사해준다. (기존값과 비교를 위해)
8. 복사한 구슬들을 주어진 방향에 따라 어떤 것이 먼저 굴러갈 것인지 정렬해준다.
9. 정렬한 구슬들을 순서대로 굴려준다.
10. 구슬이 더 이상 움직이지 않을 때까지 굴린다.
11. 만약 구슬이 탈출구를 만났따면 구슬을 보드에서 제거하고, 탈출 여부를 true로 변경한다.
12. 구슬들을 굴린 후에 구슬들이 이전 위치와 동일한 위치에 있다면 해당 분기는 탐색을 멈춘다.
13. 구슬이 가진 탈출 여부값을 이용해 탈출한 구슬이 있는지 확인한다.
14. 만약 구슬이 둘다 빠졌다면 해당 분기는 탐색을 멈춘다.
15. 아무 공도 빠지지 않았을 경우 해당 구슬들을 큐에 다시 넣고, 기울임 횟수를 증가시키며 탐색을 진행한다.
16. 만약 빨강 구슬이 구멍에 빠졌다면 기울임 횟수를 반환하고 탐색을 종료한다.
17. 10번이 지난 후에도 빨강 구슬이 탈출하지 못했다면 -1을 반환한다.

## 풀이 코드

```js
const CELL = {
  wall: "#",
  empty: ".",
  hole: "O",
  redBall: "R",
  blueBall: "B",
};

const solution = (N, M, board) => {
  // 처음 구슬들의 위치를 찾아서 구슬 배열 만들기
  const balls = findBalls(N, M, board).map(([r, c], index) => {
    return makeBall(r, c, index === 0 ? CELL.redBall : CELL.blueBall);
  });

  // 빨강 구슬 탈출을 위한 기울임 횟수 찾기
  return findMoveCountForRedBallEscape(N, M, board, balls);
};

// 구슬 위치 찾기
const findBalls = (N, M, board) => {
  const balls = new Array(2).fill(null);

  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      // 각각의 색의 구슬을 만나면 해당 위치를 구하고 해당 위치의 표기를 지워준다.
      if (board[i][j] === CELL.redBall) {
        balls[0] = [i, j];
        board[i][j] = CELL.empty;
      }
      if (board[i][j] === CELL.blueBall) {
        balls[1] = [i, j];
        board[i][j] = CELL.empty;
      }
    }
  }

  return balls;
};

// 구슬 생성
const makeBall = (r, c, color, isEscape = false) => {
  return { r, c, color, isEscape };
};

// 빨강 구슬 탈출을 위한 기울임 횟수 찾기
const findMoveCountForRedBallEscape = (N, M, board, balls) => {
  // 큐에 구슬들 배열과 기울임 횟수를 집어 넣기
  const queue = [[balls, 0]];

  // 큐가 빌때까지 bfs 탐색
  while (queue.length) {
    // 기존 위치의 구슬들과 기울임 횟수
    const [balls, count] = queue.shift();

    // 총 10번 시도에서 빨강 구슬이 탈출을 못하면 실패
    if (count === 10) break;

    // 4방향으로
    for (let dir = 0; dir < 4; dir++) {
      // 각각의 분기에서 탐색을 위해 구슬을 복사
      const currentBalls = balls.map((ball) => ({ ...ball }));

      // 주어진 방향에 근거해 구슬 정렬하기
      sortBalls(currentBalls, dir);

      // 순서대로 구슬 굴리기
      moveBall(N, M, board, dir, currentBalls[0], currentBalls[1]);
      moveBall(N, M, board, dir, currentBalls[1], currentBalls[0]);

      // 빨간 구슬과 파란 구슬이 모두 움직인 후에도 제자리라면 더 이상 탐색할 필요없음
      if (isStop(balls, currentBalls)) continue;

      // 구슬이 구멍에 탈출했는지 체크
      const escaped = currentBalls.filter(({ isEscape }) => isEscape);

      // 구슬이 둘다 빠졌거나 파란 구슬이 빠졌다면 실패
      if (escaped.length > 1) continue;

      // 아무 구슬도 구멍에 빠지지 않았을 경우 계속 탐색
      if (escaped.length === 0) {
        queue.push([currentBalls, count + 1]);
        continue;
      }

      // 빨강 구슬이 구멍에 빠졌다면 성공
      if (escaped[0].color === CELL.redBall) return count + 1;
    }
  }

  return -1;
};

// 구슬 배열 정렬
const sortBalls = (balls, direction) => {
  const sorting = [
    // 0: 위쪽 - 더 위에 있는 구슬이 앞으로 오도록
    (a, b) => a.r - b.r,
    // 1: 오른쪽 - 더 오른쪽에 있는 구슬이 앞으로 오도록
    (a, b) => b.c - a.c,
    // 2: 아래쪽 - 더 아래에 있는 구슬이 앞으로 오도록
    (a, b) => b.r - a.r,
    // 3: 왼쪽 - 더 왼쪽에 있는 구슬이 앞으로 오도록
    (a, b) => a.c - b.c,
  ];

  return balls.sort(sorting[direction]);
};

// 구슬 굴리기
const moveBall = (N, M, board, dir, ball, otherBall) => {
  // 상, 우, 하, 좌 - 위부터 시계방향으로 탐색을 위해
  const DR = [-1, 0, 1, 0];
  const DC = [0, 1, 0, -1];

  while (true) {
    // 현재 구슬의 위치
    const { r, c } = ball;

    // 해당 방향값을 통해 다음 위치 구하기
    let nr = r + DR[dir];
    let nc = c + DC[dir];

    // 굴러갈 수 없는 곳이라면 멈추기
    if (!isInRange(N, M, nr, nc) || !isMovable(board, nr, nc, otherBall)) break;

    // 구슬의 위치 최신화
    ball.r = nr;
    ball.c = nc;

    // 만약 구슬이 구멍을 만났다면 멈추기
    if (isEscapeHole(board, nr, nc)) {
      // 다른 구슬도 구멍에 올 수 있으므로 해당 구슬의 위치를 보드에서 제거
      ball.r = -1;
      ball.c = -1;
      // 탈출 여부를 탈출로 표시
      ball.isEscape = true;
      break;
    }
  }
};

// 보드 내에 있는지 체크
const isInRange = (N, M, r, c) => {
  return 1 <= r && r < N - 1 && 1 <= c && c < M - 1;
};

// 공이 굴러갈 수 있는 곳인지 체크, 벽이나 다른 구슬이 있는 곳이라면 불가
const isMovable = (board, r, c, otherBall) => {
  return !(
    board[r][c] === CELL.wall ||
    (otherBall.r === r && otherBall.c === c)
  );
};

// 구멍을 만났는지 체크
const isEscapeHole = (board, r, c) => {
  return board[r][c] === CELL.hole;
};

// 구슬이 움직이지 않았는지 확인
const isStop = (originBalls, afterBalls) => {
  // 기존 빨강, 파랑 구슬과 움직인 후의 빨강 파랑 구슬의 위치를 비교
  const originRedBall = findBallColor(originBalls, CELL.redBall);
  const originBlueBall = findBallColor(originBalls, CELL.blueBall);
  const afterRedBall = findBallColor(afterBalls, CELL.redBall);
  const afterBlueBall = findBallColor(afterBalls, CELL.blueBall);

  // 두 구슬 모두 움직이지 않았다면
  return (
    originRedBall.r === afterRedBall.r &&
    originRedBall.c === afterRedBall.c &&
    originBlueBall.r === afterBlueBall.r &&
    originBlueBall.c === afterBlueBall.c
  );
};

// 구슬의 색깔 찾기
const findBallColor = (balls, targetColor) => {
  return balls.find(({ color }) => color === targetColor);
};

console.log(solution(N, M, board));
```

## 코드 개선

위의 코드는 방문처리가 안되어있기 때문에 꽤 느리다. 아래 코드는 방문 처리를 통해 위의 코드를 리팩토링한 버전이다.

```js
const CELL = {
  wall: "#",
  empty: ".",
  hole: "O",
  redBall: "R",
  blueBall: "B",
};
const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

const solution = (N, M, board) => {
  const balls = findBalls(N, M, board).map(([r, c], index) => {
    return makeBall(r, c, index === 0 ? CELL.redBall : CELL.blueBall);
  });

  return findMoveCountForRedBallEscape(N, M, board, balls);
};

const findBalls = (N, M, board) => {
  const balls = new Array(2).fill(null);

  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      if (board[i][j] === CELL.redBall) {
        balls[0] = [i, j];
        board[i][j] = CELL.empty;
      }
      if (board[i][j] === CELL.blueBall) {
        balls[1] = [i, j];
        board[i][j] = CELL.empty;
      }
    }
  }

  return balls;
};

const makeBall = (r, c, color, isEscape = false) => {
  return { r, c, color, isEscape };
};

const findMoveCountForRedBallEscape = (N, M, board, balls) => {
  const queue = [[balls, 0]];
  // 방문 처리를 위해 Set 객체 선언
  const visited = new Set();
  const [red, blue] = balls;

  // 현재 빨강, 파랑 구슬의 위치를 토대로 방문처리
  visited.add(makeVisitedString(red, blue));

  while (queue.length) {
    const [balls, count] = queue.shift();

    if (count === 10) return -1;

    for (let dir = 0; dir < 4; dir++) {
      const currentBalls = balls.map((ball) => ({ ...ball }));

      sortBalls(currentBalls, dir);
      moveBall(N, M, board, dir, currentBalls[0], currentBalls[1]);
      moveBall(N, M, board, dir, currentBalls[1], currentBalls[0]);

      const red = findBallColor(currentBalls, CELL.redBall);
      const blue = findBallColor(currentBalls, CELL.blueBall);

      if (blue.isEscape) continue;
      if (red.isEscape) return count + 1;

      const visitedString = makeVisitedString(red, blue);

      // 방문했던 곳이라면 분기 종료, 두 구슬의 위치를 기준으로 새롭게 방문한 곳만 탐색
      if (!visited.has(visitedString)) {
        // 방문했다면 방문처리
        visited.add(visitedString);
        queue.push([currentBalls, count + 1]);
      }
    }
  }

  return -1;
};

// 빨강, 파랑 구슬의 위치를 문자열로 표기
const makeVisitedString = (redBall, blueBall) => {
  return `[${redBall.r}, ${redBall.c}], [${blueBall.r}, ${blueBall.c}]`;
};

const sortBalls = (balls, direction) => {
  const sorting = [
    (a, b) => a.r - b.r,
    (a, b) => b.c - a.c,
    (a, b) => b.r - a.r,
    (a, b) => a.c - b.c,
  ];

  return balls.sort(sorting[direction]);
};

const moveBall = (N, M, board, dir, ball, otherBall) => {
  while (true) {
    const { r, c } = ball;

    let nr = r + DR[dir];
    let nc = c + DC[dir];

    if (!isInRange(N, M, nr, nc) || !isMovable(board, nr, nc, otherBall)) break;

    ball.r = nr;
    ball.c = nc;

    if (isEscape(board, nr, nc)) {
      ball.r = -1;
      ball.c = -1;
      ball.isEscape = true;
      break;
    }
  }
};

const isInRange = (N, M, r, c) => {
  return 1 <= r && r < N - 1 && 1 <= c && c < M - 1;
};

const isMovable = (board, r, c, otherBall) => {
  return !(
    board[r][c] === CELL.wall ||
    (otherBall.r === r && otherBall.c === c)
  );
};

const isEscape = (board, r, c) => {
  return board[r][c] === CELL.hole;
};

const findBallColor = (balls, targetColor) => {
  return balls.find(({ color }) => color === targetColor);
};
```
