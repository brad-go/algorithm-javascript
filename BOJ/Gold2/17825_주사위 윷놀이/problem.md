# 17825. 주사위 윷놀이

## 문제 링크

https://www.acmicpc.net/problem/17825

## 문제 분류

: 구현, 브루트포스 알고리즘, 백트래킹

## 소요 시간

: 3시간

## 풀이 방법

문제를 풀이하는 핵심은 보드(윷놀이 판)를 어떻게 나타낼 건지, 해당 칸에 말이 있는지를 어떻게 체크할 것인지였다.

보드를 2차원 배열로 0 ~ 40 까지의 2차원 배열로 나타내고, 문제에서 주어진 대로 그대로 나타내볼까도 싶었지만 꽤나 복잡한 하드 코딩이 필요했다. 그래서 나는
보드를 4개로 나누기로 했다. 0 ~ 40까지 2씩 증가하는 길이가 21의 배열과 10, 20, 30(파란색 선이 있는 칸)에서 40까지의 배열을 따로 각각 만들어주었다.

이동하려는 칸에 말이 있는지를 체크하기 위해서는 보드가 4개로 나누어졌기 때문에, 각 말들의 위치를 보정해줄 필요가 있었다. 마치 하나의 보드위에 있듯이 만들기 위해
점수가 40인 칸에 있을 경우에는 기본 보드의 마지막 칸에 위치하도록, 10, 20, 30의 보드에서 점수가 25인 칸부터는 10 보드의 25로 위치를 보정해줘야 했다.

## 풀이 코드

```js
const solution = (dice) => {
  const board = createBoard();
  // 보드에서 각 말들의 위치를 나타내기
  const pieces = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  let answer = 0;

  // 입력받은 주사위 번호대로 이동시키기
  const move = (count, score) => {
    // 10번을 이동했다면
    if (count === 10) {
      // 점수 갱신
      answer = Math.max(answer, score);

      return;
    }

    // 1번부터 4번 말을 한번씩 선택해보면서 주사위 번호만큼 이동시켜보기
    for (let i = 0; i < 4; i++) {
      // 선택한 말의 현재 위치
      const [r, c] = pieces[i];

      // 이미 마지막에 도착했다면 해당 말은 이동 불가
      if (r === -1) continue;

      let [nr, nc] = [r, c];

      // 주사위 번호만큼 이동시키기
      nc += dice[count];

      // 끝까지 이동했을 경우
      if (nc >= board[nr].length) {
        [nr, nc] = [-1, -1];
        // 기본 보드에서 10에 도착했을 경우 파란선으로 이동.
      } else if (nr === 0 && board[nr][nc] === 10) {
        [nr, nc] = [1, 0];
        // 기본 보드에서 20에 도착했을 경우 파란선으로 이동. 맨 처음이 null이므로 nc는 1
      } else if (nr === 0 && board[nr][nc] === 20) {
        [nr, nc] = [2, 1];
        // 기본 보드에서 30에 도착했을 경우 파란선으로 이동.
      } else if (nr === 0 && board[nr][nc] === 30) {
        [nr, nc] = [3, 0];
      }

      // 이동하려는 칸에 말이 존재한다면
      if (isPieceExist(board, pieces, nr, nc)) continue;

      // 위치 갱신
      pieces[i] = [nr, nc];

      // 갱신된 상태로 다음 말 이동 및 점수 추가
      move(count + 1, nr >= 0 ? score + board[nr][nc] : score);

      // 위치 초기화
      pieces[i] = [r, c];
    }
  };

  move(0, 0);

  return answer;
};

const createBoard = () => {
  const board_last = [25, 30, 35, 40];
  // 2차원 배열의 보드 생성
  const board = [
    // 0 ~ 40까지 2씩 증가하는 배열
    new Array(21).fill().map((_, index) => index * 2),
    // 10에 도착했을 경우 사용할 보드
    [10, 13, 16, 19].concat(board_last),
    // 20에 도착했을 경우 사용할 보드. 10, 30 보드보다 한 칸이 적기 때문에 앞을 null로 채워준다.
    [null, 20, 22, 24].concat(board_last),
    // 30에 도착했을 경우 사용할 보드
    [30, 28, 27, 26].concat(board_last),
  ];

  return board;
};

const isPieceExist = (board, pieces, r, c) => {
  // 10, 20, 30 보드에서 공통적으로 사용하는 점수가 25부터인 칸에 들어섰을 경우
  if (r > 1 && c > 3) {
    // 10보드로 통일해주기
    r = 1;
  }

  // 파란선을 따라 이동했을 경우에 점수가 40인 칸에 도달했을 경우
  if (r > 0 && board[r][c] === 40) {
    r = 0;
    c = board[0].length - 1;
  }

  for (let [r2, c2] of pieces) {
    if (r2 === -1) continue;

    // 10, 20, 30 보드에서 공통적으로 사용하는 점수가 25부터인 칸에 들어섰을 경우
    if (r2 > 1 && c2 > 3) {
      r2 = 1;
    }

    // 파란선을 따라 이동했을 경우에 점수가 40인 칸에 도달했을 경우
    if (board[r2][c2] === 40) {
      r2 = 0;
      c2 = board[0].length - 1;
    }

    // 다른 말이 이미 해당 위치에 존재한다면
    if (r === r2 && c === c2) return true;
  }

  return false;
};
```
