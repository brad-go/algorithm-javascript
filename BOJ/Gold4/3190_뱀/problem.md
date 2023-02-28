# 3190. 뱀

## 문제 링크

https://www.acmicpc.net/problem/3190

## 문제 분류

: 구현, 자료 구조, 큐

## 소요 시간

: 2시간

## 풀이 방법

풀이 방법은 간단해서 쉽게 해결 방법을 도출할 수 있었지만, 문제의 입력을 잘못 이해해서 시간을 한참 소요했다. 문제에서 입력되는 사과의 위치가 이차원 배열 상에서 인덱스로 나타낼 때 -1씩 빼줬어야 했는데, 이 간단한 걸 놓쳤었다.

문제 풀이는 간단하다. 보드를 N\*N 크기의 2차원 배열로 생성하고, 사과를 위치시킨다. 중요한 것은 뱀이 길이가 길어질 때, 머리 쪽이 아닌 몸통부터 꼬리까지의 위치를 어떻게 나타내냐는 것인데, 방향 전환시에 머리부터 틀어지고 나머지는 머리가 움직인 위치를 따라서 움직여야하기 때문이다.

이를 해결하기 위해 큐 구조를 떠올렸다. 뱀이 이동할 때, 머리 부분에 새로운 데이터를 추가(push)하고, 이동한 곳에 사과가 있다면 뱀의 사이즈만 키운 것이고, 사과가 없다면 꼬리쪽에서 데이터를 빼면(shift) 된다.

1. 보드를 생성한다.
2. 사과들을 위치시킨다.
3. bfs 탐색을 통해 뱀을 이동시킨다.
4. 뱀은 위치 정보를 담은 큐로써 나타낸다. 가장 최신 부분인 오른쪽이 머리 부분, 가장 먼저 들어온 데이터인 왼쪽이 꼬리 부분으로 나타낸다.
5. 뱀을 이동 시킬 때마다 이동한 곳의 위치를 큐에 집어넣고, 사과가 있다면 그대로 진행해 뱀의 길이를 늘리고, 사과가 없다면 먼저 들어간 위치정보를 꺼내서 길이를 유지한다.
6. 입력 받은 방향 전환 명령 정보만큼 시간이 흘렀을 경우, 방향을 전환해준다.
7. 만약 뱀이 벽에 부딪히거나 자신의 몸에 닿으면 게임을 종료한다.

## 풀이 코드

```js
const solution = (N, apples, commands) => {
  const { board, snake } = initGame(N, apples);

  return startGame(N, board, snake, commands);
};

// 게임 초기화
const initGame = (N, apples) => {
  // 보드 생성
  const board = Array.from(Array(N), () => Array(N).fill(0));
  // 뱀 생성 - position은 큐의 형태로 이용 예정, 방향은 오른쪽부터
  const snake = { position: [[0, 0]], dir: 0 };

  // 사과 채우기
  fillApple(board, apples);

  return { board, snake };
};

// 사과 채우기
const fillApple = (board, apples) => {
  apples.forEach((apple) => {
    const [row, column] = apple.split(" ").map((v) => v - 1);

    board[row][column] = 2;
  });
};

// 게임 진행
const startGame = (N, board, originSnake, commands) => {
  // 우, 하, 좌, 상
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  // bfs 탐색을 위해 큐에 뱀 정보와 진행 시간을 집어넣는다.
  const queue = [[originSnake, 1]];

  // 방향 전환 명령의 인덱스
  let index = 0;

  // 큐가 빌 때까지
  while (queue.length) {
    const [snake, time] = queue.shift();
    const { position } = snake;
    // 뱀의 머리쪽의 위치를 꺼낸다.
    const [r, c] = position[position.length - 1];

    // 만약 현재 진행 시간이 방향 전환 명령의 시간보다 크다면
    if (commands[index]) {
      // 방향을 전환하고, 다음 진행시 다음 명령을 확인하기 위해 인덱스 증가
      index += changeDirection(snake, commands[index], time);
    }

    // 다음 위치 구하기
    let nr = r + DR[snake.dir];
    let nc = c + DC[snake.dir];

    // 벽에 닿거나 자신의 몸에 닿았다면 게임 종료
    if (!isInRange(N, nr, nc) || isSnake(snake, nr, nc)) return time;

    // 뱀 이동시키기
    moveSnake(board, snake, nr, nc);

    // 다음 진행을 위해 큐에 push
    queue.push([snake, time + 1]);
  }
};

// 뱀 이동시키기
const moveSnake = (board, snake, r, c) => {
  // 뱀이 위치한 곳들
  const { position } = snake;

  // 머리쪽에 최신 이동 위치를 집어넣기
  position.push([r, c]);

  // 사과가 있었다면
  if (isApple(board, r, c)) {
    // 사과 제거
    board[r][c] = 0;
  } else {
    // 사과가 없었다면 뱀의 길이가 늘지 않았으므로 꼬리 쪽에서 제거
    position.shift();
  }
};

// 보드 안의 범위에 있는지
const isInRange = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

// 해당 칸이 사과인지
const isApple = (board, r, c) => {
  return board[r][c] === 2;
};

// 이동한 위치가 뱀인지
const isSnake = (snake, r, c) => {
  const { position } = snake;

  return position.some(([row, column]) => row === r && column === c);
};

// 방향 전환하기
const changeDirection = (snake, turn, time) => {
  // 방향 전환할 시간, 바꿀 방향
  const [elapsedTime, directionToChange] = turn.split(" ");

  // 아직 진행 시간이 방향 전환 시간보다 작다면 방향 바꾸지 x
  if (Number(elapsedTime) >= time) return false;

  // 방향을 바꿔주기
  snake.dir = swapDirection(snake.dir, directionToChange);

  return true;
};

// 방향 전환
const swapDirection = (direction, toChange) => {
  // 만약 우회전이라면
  if (toChange === "D") return (direction + 1) % 4;

  // 좌회전이라면
  return direction <= 0 ? 3 : direction - 1;
};
```
