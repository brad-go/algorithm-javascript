# 봄버맨 - 16918

[문제 링크](https://www.acmicpc.net/problem/16918)

## 문제 풀이

시작에서 일부 칸에 폭탄이 설치되어있고, 1초가 지난 후에 폭탄 설치와 폭발을 반복한다. 그러므로 1초가 지난 상태에서 시작할 수 있다.

### 풀이 설명

1. 폭탄을 0 ~ 2의 수로 표시하고, 폭탄이 없는 곳을 -1로 표시한다.
2. 시작 시 1초가 지난 후 3, 4를 반복하므로 폭탄이 있는 곳을 1초가 지난 상태인 1로 입력받아준다.
3. while문을 통해 time을 증가시키면서 짝수라면 폭탄을 설치하고, 홀수라면 폭탄을 폭발 시킨다.
4. 폭탄 설치 시에는 폭탄이 없는 곳에는 폭탄을 설치(0), 폭탄이 있는 곳은 시간을 1씩 증가시킨다.
5. 폭탄 폭발 시에는 폭탄이 있고, 곧 터질 폭탄이 아니라면 1씩 증가시킨다.
6. 곧 터질 폭탄(2)라면 자신의 위치와 인접한 네곳의 위치를 사방탐색을 이용해 -폭발 시킨다(1로 표시한다).

### 전체 코드

```js
// prettier-ignore
const [rcn, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [R, C, N] = rcn.split(" ").map(Number);
// 폭탄이 있다면 1 없다면 -1로 표시
const board = input.map((line) => line.split('').map((v) => v === 'O' ? 1 : -1)); // prettier-ignore

function solution(R, C, N, board) {
  let time = 1;

  // 시간이 1씩 증가하면서 보드 상황을 업데이트
  while (time++ < N) {
    // 시간이 짝수라면 폭탄 설치
    if (time % 2 === 0) installBomb(R, C, board);
    // 홀수라면 폭발
    else explodeBomb(R, C, board);
  }

  // 다시 문자열의 형태로 되돌려 반환
  return board
    .map((line) => line.map((v) => (v === -1 ? "." : "O")).join(""))
    .join("\n");
}

// 폭탄 설치 - 1초가 걸리므로 설치하지 않는 곳은 1씩 증가
const installBomb = (R, C, board) => {
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (board[r][c] === -1) board[r][c] = 0;
      else board[r][c] += 1;
    }
  }
};

// 폭탄 폭발 - 1초 후에 폭발이 일어나므로 폭발에 영향이 없는 곳의 폭탄은 1씩 증가
const explodeBomb = (R, C, board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      // 곧 터질 폭탄이 아니라면
      if (board[r][c] !== 2) {
        // 폭탄이 있는 곳이라며
        if (board[r][c] !== -1) board[r][c]++;
        continue;
      }

      // 자신의 위치 폭발
      board[r][c] = -1;

      // 상하좌우 인접한 네 곳을 폭발시킨다.
      for (let dir = 0; dir < 4; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        // 보드 안에 있으면서 이제 터질 폭탄인지 체크
        if (!isInRange(R, C, nr, nc) || board[nr][nc] === 2) continue;

        // 폭발
        board[nr][nc] = -1;
      }
    }
  }
};

// 보드 범위 체크
const isInRange = (R, C, r, c) => {
  if (0 <= r && r < R && 0 <= c && c < C) return true;
  return false;
};

console.log(solution(R, C, N, board));
```
