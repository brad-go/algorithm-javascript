# 20061. 모노미노도미노 2

## 문제 링크

https://www.acmicpc.net/problem/20061

## 문제 분류

: 구현

## 소요 시간

: 2시간 30분

## 풀이 방법

파랑색 보드를 세로로 돌리면 초록색 보드와 같은 모양이 된다. 나는 파랑색 보드를 90도 회전시켜서 초록색 보드와 같은 모양으로 만들었고, x, y를 파란색 보드에 맞게 변경해서 사용하는 방법으로 문제를 풀이했다.

x, y는 다음과 같이 변경할 수 있다.

- t = 1: [x, y] => [y, 3 - x]
- t = 2: [[x, y], [x, y + 1]] => [[y, 3 - x], [y + 1, 3 - x]]
- t = 3: [[x, y], [x + 1, y]] => [[y, 3 - x], [y, 2 - x]]

1. 초록, 파랑 보드를 10 \* 6 크기로 생성한다. 빨강 보드를 포함한 크기로 생성한다.
2. 입력받은 블록을 초록, 파랑 보드에서 각각 이동 시킨다.
3. 초록과 파랑 보드에서 행이 꽉 차면 해당 행을 제거하고 점수를 증가시킨다.
4. 사라진 행의 수만큼 아래로 이동시킨다.
5. 4, 5번 행에 (빨강 보드를 제외한 보드의 특별한 영역) 블록이 있다면 해당 행 만큼 아래에서 부터 행을 비운다.
6. 사라진 행의 수만큼 아래로 이동시킨다.
7. 점수와 파랑, 초록 보드에 남아있는 블록들의 수만큼 개수를 세서 반환한다.

## 풀이 코드

```js
const solution = (blocks) => {
  const [rows, columns] = [10, 4];
  // 빨강 보드를 포함한 크기만큼 각 색깔의 보드 생성
  // 파랑 보드를 90도 회전시켜서 초록 보드와 로직을 공유할 수 있도록 함
  const boards = {
    green: createBoard(rows, columns),
    blue: createBoard(rows, columns),
  };

  let totalScore = 0;

  // 입력받은 블록들을 순서대로 이동시키기
  blocks.forEach((block) => {
    // 빨강 보드에 블록을 놓기
    // 반환값은 해당 블록의 위치
    const currentBlock = putBlock(boards, block);

    // 해당 블록을 아래로 이동시키기
    moveCurrentBlock(boards, currentBlock);
    // 꽉찬 행이 있다면 제거하고 아래로 이동시키고 점수를 구하기
    totalScore += getScore(boards);
    // 특별한 행에 블록이 있다면 아래에서부터 제거하고 아래로 이동시키기
    removeSpecialRows(boards, rows, columns);
  });

  // 남아있는 블록의 수 세기
  const count = countBlocks(boards, rows, columns);

  return `${totalScore}\n${count}`;
};

const createBoard = (rows, columns) => {
  return Array.from(Array(rows), () => Array(columns).fill(0));
};

// 초록 파랑 보드에 블록 위치 시키기
const putBlock = (boards, block) => {
  const [t, x, y] = block;
  const newGreen = boards.green.map((row) => [...row]);
  const newBlue = boards.blue.map((row) => [...row]);
  // 현재 블록의 위치를 담을 객체
  const currentBlock = {
    green: [],
    blue: [],
  };

  // 1번 모양인 경우
  newGreen[x][y] = 1;
  newBlue[y][3 - x] = 1;

  currentBlock.green.push([x, y]);
  currentBlock.blue.push([y, 3 - x]);

  // 2번 모양인 경우
  if (t === 2) {
    newGreen[x][y + 1] = 1;
    newBlue[y + 1][3 - x] = 1;

    currentBlock.green.push([x, y + 1]);
    currentBlock.blue.push([y + 1, 3 - x]);
    // 3번 모양인 경우
  } else if (t === 3) {
    newGreen[x + 1][y] = 1;
    newBlue[y][2 - x] = 1;

    currentBlock.green.push([x + 1, y]);
    currentBlock.blue.push([y, 2 - x]);
  }

  boards.green = newGreen;
  boards.blue = newBlue;

  return currentBlock;
};

// 초록 파랑 보드에서 현재 블록 이동시키기
const moveCurrentBlock = (boards, currentBlock) => {
  moveBlock(boards.green, currentBlock.green);
  moveBlock(boards.blue, currentBlock.blue);
};

// 블록 이동시키기
const moveBlock = (board, block) => {
  let movedBlock = block.map((item) => [...item]);

  // 아래로 이동할 수 있을 때까지 위치 갱신
  while (isMovable(board, movedBlock)) {
    movedBlock = movedBlock.map(([r, c]) => [r + 1, c]);
  }

  // 보드에서 블록 위치 갱신
  block.forEach(([r, c]) => (board[r][c] = 0));
  movedBlock.forEach(([r, c]) => (board[r][c] = 1));
};

// 이동할 수 있는지 확인
const isMovable = (board, block) => {
  // 각 블록의 행 구하기
  const rows = block.map(([r]) => r);
  // 가장 아래에 있는 블록의 행 구하기
  const lowest = Math.max(...rows);
  // 아래에 위치한 블록들만 남기기
  const bottoms = block.filter(([r]) => r === lowest);

  // 아래 칸에 블록이 없는지 보드를 벗어나지 않는지 확인
  return bottoms.every(([r, c]) => {
    return r + 1 < board.length && board[r + 1][c] === 0;
  });
};

// 점수 구하기
const getScore = (boards) => {
  let score = 0;

  score += getBoardScore(boards.green);
  score += getBoardScore(boards.blue);

  return score;
};

// 각 보드마다 점수 구하기
const getBoardScore = (board) => {
  let score = 0;
  let removedIndex = 0;

  board.forEach((row, index) => {
    // 빨강 보드나 꽉찬 행이 아니면 건너뛰기
    if (index < 4 || row.some((block) => !block)) return;

    // 꽉찬 행이라면 점수 증가
    score += 1;
    // 지워진 행의 인덱스 구하기
    removedIndex = Math.max(removedIndex, index);

    // 해당 행 제거
    removeRow(board, index);
  });

  // 지워진 행이 없다면 점수만 반환
  if (!removedIndex) return score;

  // 지워진 행이 있다면 그 위에 위치한 블록들 아래로 이동시키기
  for (let i = removedIndex - score; i > 3; i--) {
    for (let j = 0; j < 4; j++) {
      if (!board[i][j]) continue;

      board[i][j] = 0;
      board[i + score][j] = 1;
    }
  }

  return score;
};

// 행 지우기
const removeRow = (board, index) => {
  board[index].fill(0);
};

// 특별한 행에 블록이 있다면 아래 행 지우고 아래로 이동시키기
const removeSpecialRows = (boards, rows, columns) => {
  removeSpecialRow(boards.green, rows, columns);
  removeSpecialRow(boards.blue, rows, columns);
};

// 특별한 행에 블록이 있다면 아래 행 지우고 아래로 이동시키기
const removeSpecialRow = (board, rows, columns) => {
  // 지워진 행의 수 찾기
  const removeCount = findRemoveCount(board);

  // 없다면 패스
  if (!removeCount) return;

  // 지울 행의 수만큼 제거
  for (let i = rows - 1; i > rows - removeCount - 1; i--) {
    removeRow(board, i);
  }

  // 지워진 만큼 아래로 이동시키기
  for (let i = rows - removeCount - 1; i > 3; i--) {
    for (let j = 0; j < columns; j++) {
      if (!board[i][j]) continue;

      board[i][j] = 0;
      board[i + removeCount][j] = 1;
    }
  }
};

// 특별한 행에 블록이 있는지 확인
const findRemoveCount = (board) => {
  if (board[4].some((block) => block)) return 2;
  if (board[5].some((block) => block)) return 1;
};

// 블록 수 세기
const countBlocks = (board, rows, columns) => {
  let count = 0;

  for (let i = 4; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board.green[i][j]) count += 1;
      if (board.blue[i][j]) count += 1;
    }
  }

  return count;
};
```
