# 14499. 주사위 굴리기

## 문제 링크

https://www.acmicpc.net/problem/14499

## 문제 분류

: 구현

## 소요 시간

: 2시간

## 풀이 방법

주사위 굴려서 주사위의 바닥에 보드의 숫자를 복사하고, 굴릴 때마다 주사위의 위쪽 정수를 출력하는 문제였다. 주사위를 이동시키는 것은 어렵지 않았지만, 주사위를 어떻게 표현해야할까가 꽤나 고민이되는 문제였다. 주사위를 1차원 배열로 나타낼 수 있을 것 같았는데, 그것보다 직관적으로 2차원 배열을 통해 풀이했다. 생각했던 것처럼 특별한 숨겨진 풀이 방법이 있다기보다는 조금은 하드코딩이 필요한 문제였다.

1. 세로 4칸, 가로 3칸의 주사위를 생성한다.
2. 입력받은 명령대로 주사위를 한 칸씩 굴리며 보드에서 이동시킨다.
3. 주사위가 굴러가면 각 방향마다 주사위의 면을 다르게 표시해야 한다.

- 동쪽: 가로 맨 오른쪽 면의 값, 세로 맨 아래 면의 값을 빼두고, 가로를 오른쪽으로 한칸씩 민다. 저장해둔 세로 아래 면의 값을 가로 맨 왼쪽에 넣고, 가로 맨 오른쪽 면의 값을 세로 맨 아래에 넣는다.
- 서쪽: 가로 맨 왼쪽 면의 값, 세로 맨 아래 면의 값을 빼두고, 가로를 왼쪽으로 한칸씩 민다. 저장해둔 세로 아래 면의 값을 가로 맨 오른쪽에 넣고, 가로 맨 왼쪽 면의 값을 세로 맨 아래에 넣는다.
- 북쪽: 세로 맨 위의 값을 빼두고, 세로를 한칸씩 위로 민다. 빼둔 값을 세로 맨 아래에 넣는다.
- 남쪽: 세로 맨 아래의 값을 빼두고, 세로를 아래로 한칸씩 민다. 빼둔 값을 세로 맨 위에 넣는다.

4. 주사위를 굴리고 주사위의 현재 위치를 최신화한다.
5. 보드의 현재 위치가 0이라면 주사위 바닥면의 값을 보드 현재 위치의 값에 넣는다.
6. 보드의 현재 위치가 0이 아니라면 주사위 바닥면의 값을 보드 현재 위치의 값으로 넣는다.
7. 각 굴릴 때마다 주사위 맨위의 값을 출력한다.

풀이를 하고 나니 1차원 배열이나 객체로 주사위를 표현해서도 문제를 풀이할 수 있다. 하지만 현재 코드도 느리지 않으니 패스!

## 풀이 코드

```js
const solution = (board, commands, x, y) => {
  const dice = Array.from(Array(4), () => Array(3).fill(0));
  const DR = [0, 0, -1, 1];
  const DC = [1, -1, 0, 0];
  const position = { r: x, c: y };
  const log = [];

  commands.forEach((direction) => {
    const nr = position.r + DR[direction - 1];
    const nc = position.c + DC[direction - 1];

    if (!isInRange(board.length, board[0].length, nr, nc)) return;

    position.r = nr;
    position.c = nc;
    moveDice(dice, direction - 1);

    if (board[nr][nc] === 0) {
      copyDiceBottomSideToBoard(board, nr, nc, dice);
    } else {
      copyNumberToDiceBottomSide(board, dice, nr, nc);
    }

    log.push(getTopSide(dice));
  });

  return log.join("\n");
};

const isInRange = (N, M, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < M;
};

const moveDice = (dice, direction) => {
  const directions = [
    (dice) => moveEast(dice),
    (dice) => moveWest(dice),
    (dice) => moveNorth(dice),
    (dice) => moveSouth(dice),
  ];

  directions[direction](dice);
};

const moveEast = (dice) => {
  const bottom = dice[3][1];
  const right = dice[1][2];

  for (let i = 2; i > 0; i--) {
    dice[1][i] = dice[1][i - 1];
  }

  dice[1][0] = bottom;
  dice[3][1] = right;
};

const moveWest = (dice) => {
  const bottom = dice[3][1];
  const left = dice[1][0];

  for (let i = 0; i < 2; i++) {
    dice[1][i] = dice[1][i + 1];
  }

  dice[1][2] = bottom;
  dice[3][1] = left;
};

const moveNorth = (dice) => {
  const top = dice[0][1];

  for (let i = 0; i < 3; i++) {
    dice[i][1] = dice[i + 1][1];
  }

  dice[3][1] = top;
};

const moveSouth = (dice) => {
  const bottom = dice[3][1];

  for (let i = 3; i > 0; i--) {
    dice[i][1] = dice[i - 1][1];
  }

  dice[0][1] = bottom;
};

const copyDiceBottomSideToBoard = (board, r, c, dice) => {
  board[r][c] = getBottomSide(dice);
};

const copyNumberToDiceBottomSide = (board, dice, r, c) => {
  dice[3][1] = board[r][c];
  board[r][c] = 0;
};

const getBottomSide = (dice) => dice[3][1];

const getTopSide = (dice) => dice[1][1];
```
