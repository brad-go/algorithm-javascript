# 17837. 새로운 게임 2

## 문제 링크

https://www.acmicpc.net/problem/17837

## 문제 분류

: 구현

## 소요 시간

: 2시간

## 풀이 방법

단순한 구현 문제였는데 생각보다 시간이 오래 걸렸다. 문제 자체는 어렵지 않았지만, 종료 조건이 되었음에도 반복문을 종료하지 않아서 종료 조건이 덮어씌워지거나, 4개 이상의 말이 쌓이면 종료인데, 4인 경우에만 종료를 시키는 등 작은 실수를 해놓고 다른 데서 오류를 찾다가 시간을 많이 소모했다.

1. 말들을 표시할 보드와 위치, 방향, id를 가진 말들을 담은 배열을 생성한다.
2. 1000번이 넘거나 말이 네 개 쌓일 때까지 아래를 반복한다.
3. 아래에 따라 1번부터 K번까지 말을 이동한다.
4. 말이 가진 방향으로 다음 위치가 보드를 벗어나는지, 파랑, 빨강, 흰색인지 확인한다.
5. 파랑이나 보드를 벗어난다면 말의 방향을 반대로 바꾸고 다시 다음 위치를 구한다. 이번에도 보드를 벗어나거나 파랑 칸이라면 제자리에 멈춘다. 그렇지 않다면 아래의 방법대로 말을 이동시킨다.
6. 현재 말의 id를 이용해 해당 칸에서 말의 인덱스를 구한다. (몇 번째 층에 쌓여있는지)
7. 해당 말부터 마지막까지를 구한다.
8. 다음 칸이 하양이라면 다음 칸으로 이동시킨다. 다음 칸에 말이 있다면 그 위에 쌓는다.
9. 다음 칸이 빨강이라면 7에서 구한 말들의 순서를 반대로 뒤집는다. 그리고 다음 칸으로 이동시킨다. 다음 칸에 말이 있다면 그 위에 쌓는다.

## 풀이 코드

```js
const dirs = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const solution = (N, K, colors, pieceInfos) => {
  const { board, pieces } = init(N, pieceInfos);

  let turn = 0;
  // 말이 네 개 쌓였는지 확인할 변수
  let isOver = false;

  // 1000번까지
  while (turn <= 1000) {
    // 1번부터 K번 말까지
    pieces.forEach((piece) => {
      // 이미 네개쌓였다면 게임 종료
      if (isOver) return;

      // 말 이동시키기
      isOver = movePiece(board, colors, pieces, piece);
    });

    turn += 1;

    if (isOver) break;
  }

  return turn > 1000 ? -1 : turn;
};

const init = (N, pieceInfos) => {
  // 말들을 표시할 보드
  const board = Array.from(Array(N), () => Array.from(Array(N), () => []));
  // 1번부터 K번까지 순서대로 말을 이동시키기 위해 말 배열 생성
  const pieces = pieceInfos.map((info, index) => {
    const [r, c, dir] = info.map((value) => value - 1);
    const piece = createPiece(index + 1, r, c, dir);

    board[r][c].push(piece);

    return piece;
  });

  return { board, pieces };
};

const createPiece = (id, r, c, dir) => ({ id, r, c, dir });

const movePiece = (board, colors, pieces, piece) => {
  const { r, c, dir } = piece;

  let nr = r + dirs[dir][0];
  let nc = c + dirs[dir][1];

  // 다음 칸이 파랑이나 보드를 벗어나는지
  if (!isInBoard(N, nr, nc) || colors[nr][nc] === 2) {
    // 방향 변경
    const ndir = changeDirection(dir);

    nr = r + dirs[ndir][0];
    nc = c + dirs[ndir][1];
    piece.dir = ndir;

    // 이번에도 다음 칸이 파랑이나 보드를 벗어난다면 제자리에 멈추기
    if (!isInBoard(board.length, nr, nc) || colors[nr][nc] === 2)
      return board[r][c].length >= 4;
  }

  // 해당 칸의 현재 말부터 그 위에 쌓인 말들 찾기
  const index = board[r][c].findIndex(({ id }) => id === piece.id);
  const moved = board[r][c].slice(index);
  // 밑에 남은 나머지 말
  const rest = board[r][c].slice(0, index);

  // 말들의 위치 정보 갱신
  moved.forEach(({ id }) => {
    pieces[id - 1].r = nr;
    pieces[id - 1].c = nc;
  });

  // 남은 말들로 갱신
  board[r][c] = rest;

  // 다음 칸이 하양이라면
  if (colors[nr][nc] === 0) {
    // 그대로 옮기기
    board[nr][nc].push(...moved);
  } else {
    // 뒤집어서 옮기기
    board[nr][nc].push(...moved.reverse());
  }

  return board[nr][nc].length >= 4;
};

const isInBoard = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const changeDirection = (dir) => {
  return dir % 2 === 0 ? dir + 1 : dir - 1;
};
```

## 코드 개선

```js
const solution = (N, K, colors, pieceInfos) => {
  const { board, pieces } = init(N, pieceInfos);

  let turn = 1;

  while (turn <= 1000) {
    for (const piece of pieces) {
      const isOver = movePiece(board, colors, pieces, piece);

      if (isOver) return turn;
    }

    turn += 1;
  }

  return -1;
};

const init = (N, pieceInfos) => {
  const board = Array.from(Array(N), () => Array.from(Array(N), () => []));
  const pieces = pieceInfos.map((info, index) => {
    const [r, c, dir] = info.map((value) => value - 1);
    const piece = createPiece(index + 1, r, c, dir);

    board[r][c].push(piece);

    return piece;
  });

  return { board, pieces };
};

const createPiece = (id, r, c, dir) => ({ id, r, c, dir });

const movePiece = (board, colors, pieces, piece) => {
  const dr = [0, 0, -1, 1];
  const dc = [1, -1, 0, 0];
  const { r, c, dir } = piece;

  let nr = r + dr[dir];
  let nc = c + dc[dir];

  if (!isInBoard(board.length, nr, nc) || colors[nr][nc] === 2) {
    piece.dir = changeDirection(dir);

    nr = r + dr[piece.dir];
    nc = c + dc[piece.dir];

    if (!isInBoard(N, nr, nc) || colors[nr][nc] === 2) return;
  }

  const currentIndex = board[r][c].findIndex(({ id }) => id === piece.id);
  const movedPieces = board[r][c].slice(currentIndex);

  movedPieces.forEach((piece) => {
    piece.r = nr;
    piece.c = nc;
  });

  board[r][c] = board[r][c].slice(0, currentIndex);

  if (colors[nr][nc] === 1) movedPieces.reverse();

  board[nr][nc].push(...movedPieces);

  return board[nr][nc].length >= 4;
};

const isInBoard = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const changeDirection = (dir) => {
  return dir % 2 === 0 ? dir + 1 : dir - 1;
};
```
