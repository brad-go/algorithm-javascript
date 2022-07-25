# 새로운 게임 2 - 17837

[문제 링크](https://www.acmicpc.net/problem/17837)

## 문제 풀이

새로운 게임(백준 17780)과 아주 유사하지만 조금 더 어려운 문제였다. 다른 점은 이전 문제는 한 말이 다른 말 위에 올라가면 움직이지 않았지만, 이번 문제는 위에 있어도 움직이는 것이 달랐다.

즉 각 칸에 위치한 말들을 한 번에 참조를 통해 움직일 수 있었지만, 이번 문제에서는 같은 칸에 있는 말 중 특정 말들만을 따로 다뤄야 해서 각 말들을 담은 배열을 업데이트 시켜주는 것이 관건이었다.

### 풀이 설명

1. 말이 한 칸에 4개 이상 쌓이거나 더이상 진행할 수 없을 때까지 말들을 이동시킨다.
2. 말의 방향을 이용해 현재 위치와 방향, 다음 위치를 구한다.
3. 다음 위치가 파랑이나 갈 수 없다면 방향을 반대로 전환하고, 다시 다음 위칫값을 갱신한다. 그런데도 다음 위치가 파랑이나 갈 수 없다면 다음 말의 순서로 넘어간다.
4. 다음 위치가 하양이나 빨강이라면 아래의 순서로 진행한다.
5. 현재 칸에 위치한 이번 말의 인덱스(몇번째에 쌓여 있는지)를 구한다.
6. 인덱스를 기준으로 남아있을 말들과 움직일 말들을 구한다.
7. 빨강이라면 움직일 말들을 반대로 뒤집는다.
8. 다음 위치에 움직일 말들을 집어넣어주고, 현재 위치에는 남아있을 말들로 갱신한다.
9. 말들을 관리하는 배열을 업데이트한다.

### 전체 코드

```js
// prettier-ignore
const input = require('fs').readFileSync('./input5.txt').toString().trim().split('\n');
const [N, K] = input[0].split(" ").map(Number);
const color = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // prettier-ignore
const pieceInfo = input.slice(N + 1).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore

const DR = [0, 0, -1, 1];
const DC = [1, -1, 0, 0];
const WHITE = 0;
const RED = 1;
const BLUE = 2;

class Piece {
  constructor(id, r, c, dir) {
    this.id = id;
    this.r = r;
    this.c = c;
    this.dir = dir;
  }
}

function solution(N, K, color, pieceInfo) {
  const { board, pieces } = initGame(N, pieceInfo);
  let turn = 0;

  while (turn++ < 1000) {
    for (let i = 0; i < K; i++) {
      const size = movePiece(board, pieces, pieces[i], color); // prettier-ignore

      if (size >= 4) return turn;
    }
  }

  return -1;
}

const initGame = (N, pieceInfo) => {
  const pieces = getPieces(pieceInfo);
  const board = getBoard(N, pieces);

  return { board, pieces };
};

const getPieces = (pieceInfo) => {
  return pieceInfo.map(([r, c, dir], id) => new Piece(id + 1, r, c, dir));
};

const getBoard = (N, pieces) => {
  const board = Array.from(Array(N), () => Array(N).fill().map(() => [])); // prettier-ignore
  pieces.forEach((piece) => board[piece.r][piece.c].push(piece));

  return board;
};

const movePiece = (board, pieces, piece, color) => {
  const { r, c, dir } = piece;
  let nr = r + DR[dir];
  let nc = c + DC[dir];

  // 파랑이나 보드를 벗어난다면
  if (!isInRange(N, nr, nc) || color[nr][nc] === BLUE) {
    piece.dir = changeDirection(dir);

    nr = r + DR[piece.dir];
    nc = c + DC[piece.dir];

    if (!isInRange(N, nr, nc) || color[nr][nc] === BLUE) return;
  }

  // 빨강이나 하양이라면
  if (color[nr][nc] === WHITE || color[nr][nc] === RED) {
    // 현재 말이 몇번째에 위치한지 구하기
    const pieceIndex = board[r][c].findIndex((cur) => cur.id === piece.id);
    // 남아있을 말들
    const piecesToStay = board[r][c].filter((_, idx) => idx < pieceIndex);
    // 움직일 말들
    const piecesToMove = board[r][c]
      .filter((_, idx) => idx >= pieceIndex)
      .map(({ id, dir }) => new Piece(id, nr, nc, dir));

    // 빨강이라면 반대로 뒤집기
    if (color[nr][nc] === RED) piecesToMove.reverse();

    // 다음 위치에 집어넣기
    board[nr][nc].push(...piecesToMove);
    // 현재 위치에 이동한 말들은 제외하고 갱신
    board[r][c] = piecesToStay;

    // 말들을 관리하는 배열 업데이트
    updatePieces(pieces, piecesToMove);
  }

  return board[nr][nc].length;
};

const isInRange = (N, r, c) => {
  if (0 <= r && r < N && 0 <= c && c < N) return true;
  return false;
};

const changeDirection = (direction) => {
  if (direction % 2 === 0) return direction + 1;
  return direction - 1;
};

const updatePieces = (pieces, piecesToMove) => {
  pieces.forEach((piece) => {
    const current = piecesToMove.find((p) => p.id === piece.id);
    if (!current) return;
    piece.r = current.r;
    piece.c = current.c;
  });
};

console.log(solution(N, K, color, pieceInfo));
```
