# 새로운 게임 - 17780

[문제 링크](https://www.acmicpc.net/problem/17780)

## 문제 풀이

### 풀이 설명

1. 게임 진행 횟수가 1000번이 넘거나, 게임 말들이 4개 이상이 되면 게임을 종료하고 -1을 반환한다. 위 조건 전까지 `while`문을 통해 아래를 반복한다.
2. 게임 말들을 담은 배열을 반복문을 통해 말들의 개수(K)만큼 각 말들을 이동 시킨다.
3. 이동 시킬 때는 해당 말이 가장 아래 있는지 확인한다.
4. 맨 아래라면 이동을 시키는데, 현재 말이 가진 좌표값과 방향값을 이용해 다음으로 이동할 위치를 구한다.
5. 다음으로 이동할 위치가 파랑이나 보드를 벗어난다면

   - 방향값을 바꾸고(짝수라면 + 1, 홀수라면 - 1), 이동할 위치를 다시 업데이트한다.
   - 업데이트된 이동하려고 하는 위치가 파랑이나 보드를 벗어난다면 다음 말로 넘어간다.
   - 아니라면 아래의 로직을 통해 말을 이동시킨다.

6. 이동하려는 칸이 하양이라면

   - 현재 말이 있는 위치에 있는 말들의 좌표값을 이동할 위치로 업데이트해준다.
   - 이동하려는 위치에 말들이 없다면, 기존 칸의 말들을 이동시킨다.
   - 이동하려는 위치에 말들이 있다면, 기존 칸의 말들의 뒤에 붙여준다.
   - 보드의 기존 칸을 비워준다.

7. 이동하려는 칸이 빨강이라면
   - 현재 말이 있는 위치에 있는 말들의 좌표값을 이동할 위치로 업데이트해준다.
   - 현재 칸에 있는 말이 두개 이상이라면, 첫번째 말의 맨 아래라고 표시하는 값을 false로 바꾸고, 마지막 말을 맨 아래라고 표시하는 값을 true로 변경하고, 해당 배열을 뒤집어준다.
   - 이동하려는 위치에 말들이 없다면, 기존 칸의 말들을 이동시킨다.
   - 이동하려는 위치에 말들이 있다면, 기존 칸의 말들의 뒤에 붙여준다.
   - 보드의 기존 칸을 비워준다.

### 전체 코드

```js
// prettier-ignore
const input = require('fs').readFileSync('./input6.txt').toString().trim().split('\n');
const [N, K] = input[0].split(" ").map(Number);
// 게임 보드의 각 칸의 색깔을 담은 2차원 배열
const color = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // prettier-ignore
const piecesInfo = input.slice(N + 1).map((line) => line.split(' ').map(v => v - 1)); // prettier-ignore

// 방향값
const DX = [0, 0, -1, 1];
const DY = [1, -1, 0, 0];

// 각 색을 상수화
const WHITE = 0;
const RED = 1;
const BLUE = 2;

// 각 말의 정보를 나타낼 클래스
class Piece {
  constructor(id, x, y, dir) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.isBottom = true;
  }
}

// 게임을 진행할 말들을 담은 배열
const pieces = piecesInfo.map((pieceInfo, idx) => {
  const [x, y, dir] = pieceInfo;
  return new Piece(idx + 1, x, y, dir);
});

function solution(N, K, color, pieces) {
  // 게임 보드 위의 말들을 나타낼 2차원 배열
  const board = Array.from(Array(N), () => Array(N).fill().map(() => [])); // prettier-ignore
  // 입력값에 따라 게임보드를 초기화
  initBoard(board, pieces);

  // 몇번의 턴이 돌았는지 나타낼 변수
  let turn = 0;

  // 최대 1000번까지 진행
  while (++turn < 1001) {
    // 한 턴마다 각 말들을 이동시킴
    for (let i = 0; i < K; i++) {
      // 이동한 칸에 있는 말들의 개수
      const size = movePiece(board, color, pieces[i]);

      // 이동한 칸에 말이 있고, 4개 이상이라면 게임 종료하고 몇번째 턴인지 반환
      if (size && size >= 4) {
        return turn;
      }
    }
  }

  // 1000번이 넘었다면 -1 반환
  return -1;
}

const initBoard = (board, pieces) => {
  pieces.forEach((piece) => {
    const { x, y } = piece;
    board[x][y].push(piece);
  });
};

// 말들을 보드의 색에 따라서 이동시키는 함수
const movePiece = (board, color, piece) => {
  if (!piece.isBottom) return;

  const { x, y, dir } = piece;

  // 다음 이동할 위치값
  let nx = x + DX[dir];
  let ny = y + DY[dir];

  // 보드를 벗어나거나 파랑이라면
  if (!isInRange(nx, ny) || color[nx][ny] === BLUE) {
    // 방향을 변경
    changeDirection(piece);

    // 다시 한번 이동할 위치를 업데이트해주기
    nx = x + DX[piece.dir];
    ny = y + DY[piece.dir];

    // 또 파랑이거나 보드를 벗어난다면 방향만 바꾸고 종료
    if (!isInRange(nx, ny) || color[nx][ny] === BLUE) return;
  }

  // 이동할 위치가 하양이라면
  if (color[nx][ny] === WHITE) {
    // 해당 칸의 말들 모두 위치값 업데이트
    board[x][y].forEach((piece) => {
      piece.x = nx;
      piece.y = ny;
    });

    // 해당 칸에 말이 하나라면
    if (board[nx][ny].length === 0) {
      board[nx][ny].push(...board[x][y]);
      // 해당 칸이 말이 여럿이라면
    } else {
      // 이미 이동할 위치에 말이 존재하므로 지금 이동하는 말들은 모두 위에 쌓이므로
      board[x][y].forEach((piece) => (piece.isBottom = false));
      board[nx][ny] = board[nx][ny].concat(board[x][y]);
    }

    // 기존 칸을 비워줌
    board[x][y].length = 0;
  }

  // 이동할 위치가 빨강이라면
  if (color[nx][ny] === RED) {
    // 해당 칸의 말들 모두 위치값 업데이트
    board[x][y].forEach((piece) => {
      piece.x = nx;
      piece.y = ny;
    });

    if (board[x][y].length > 1) {
      board[x][y][0].isBottom = false;
      board[x][y][board[x][y].length - 1].isBottom = true;
      board[x][y].reverse();
    }

    // 해당 칸에 말이 하나라면
    if (board[nx][ny].length === 0) {
      board[nx][ny].push(...board[x][y]);
      // 해당 칸이 말이 여럿이라면
    } else {
      // 이미 이동할 위치에 말이 존재하므로 지금 이동하는 말들은 모두 위에 쌓이므로
      board[x][y].forEach((piece) => (piece.isBottom = false));
      board[nx][ny] = board[nx][ny].concat(board[x][y]);
    }

    // 기존 칸을 비워줌
    board[x][y].length = 0;
  }

  // 이동한 칸의 말들의 개수를 반환
  return board[nx][ny].length;
};

// 범위 체크
const isInRange = (x, y) => {
  if (0 <= x && x < N && 0 <= y && y < N) return true;
  return false;
};

// 방향 변경
const changeDirection = (piece) => {
  if (piece.dir % 2 === 0) piece.dir += 1;
  else piece.dir -= 1;
};

console.log(solution(N, K, color, pieces));
```
