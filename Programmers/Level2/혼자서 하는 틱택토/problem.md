# 혼자서 하는 틱택토

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/160585

## 문제 분류

: 구현

## 소요 시간

: 2시간

## 풀이 과정

쉬어보여서 금방 풀고 자려고했다가 한참을 풀었다. 문제 풀이 방법은 간단했다. 틱택토 게임의 진행이 잘못된 경우를 모두 찾아내서 0으로 반환하고 나머지는 1로 반환하면 된다. O가 항상 선공이라는 것에 유의하자.

진행이 잘못된 경우는 생각보다 쉽게 찾을 수 있었다.

1. O의 개수보다 X의 개수가 많을 경우
2. O가 X보다 2이상 많을 경우
3. O가 이겼는데, X가 더 많거나 같을 경우
4. X가 이겼는데, O가 더 많을 경우
5. 승자가 O, X 둘다인 경우

규칙은 찾아냈지만, 승자를 어떻게 가려내는지가 관건이었다. 더 효율적이고 깔끔한 방식을 찾다가 결국 찾지 못하고 하드 코딩해서 풀어버렸다. 이 방법을 찾느라 시간을 많이 썼지만 방법을 찾지 못해서 아쉽다.

그리고 위의 진행이 잘못된 경우도 조금씩 자잘하게 놓친 부분들이 있었다. 승자가 둘다면 안되니까 승자를 담은 배열이 2이상이면이라고 했다가 틀린다던가 등등 말이다. 결국 위 조건을 가지고 풀이하면 다음과 같다.

1. 보드에서 O와 X의 개수를 센다.
2. 보드를 확인하면서 승자가 누구인지 찾는다.
3. 위의 다섯 가지 조건에 어긋나는지를 판별하고 모두 다 통과하면 1 아니면 0을 반환한다.

## 풀이 코드

```js
const solution = (board) => {
  const winner = [];
  const marks = { O: 0, X: 0 };

  countMarks(board, marks);
  findWinner(board, winner);

  // X가 O보다 많거나 O가 X보다 2개 이상 많은 경우
  if (marks.O < marks.X || marks.O - marks.X > 1) return 0;
  // 승자가 O, X 둘다인 경우
  if (new Set(winner).size > 1) return 0;
  // 승자가 O일 때 X의 개수가 O와 같거나 더 많은 경우
  if (winner[0] === "O" && marks.X >= marks.O) return 0;
  // 승자가 X일 때 O의 개수가 X보다 많은 경우
  if (winner[0] === "X" && marks.O > marks.X) return 0;

  return 1;
};

const countMarks = (board, marks) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      marks.O += board[i][j] === "O" ? 1 : 0;
      marks.X += board[i][j] === "X" ? 1 : 0;
    }
  }
};

const findWinner = (board, winner) => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] !== "." &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      winner.push(board[i][0]);
    }
    if (
      board[0][i] !== "." &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      winner.push(board[0][i]);
    }
  }

  if (
    board[0][0] !== "." &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    winner.push(board[0][0]);
  }

  if (
    board[0][2] !== "." &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    winner.push(board[0][2]);
  }
};
```

## 코드 개선

미리 상수값으로 빙고가 되는 인덱스의 번호를 적어두고 이를 사용함으로써, 보드를 한칸한칸 i, j값으로 바꿔가며 비교할 필요는 없어졌다.

```js
const solution = (board) => {
  const counts = countOXMarks(board);
  const bingo = findWinningMark(board);

  if (counts.O < counts.X || counts.O - counts.X > 1) return 0;
  if (bingo.O && bingo.X) return 0;
  if (bingo.O && counts.X >= counts.O) return 0;
  if (bingo.X && counts.O > counts.X) return 0;

  return 1;
};

const countOXMarks = (board) => {
  const counts = { O: 0, X: 0 };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === ".") continue;

      counts[board[i][j]]++;
    }
  }

  return counts;
};

const findWinningMark = (board) => {
  const bingoIndicies = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const bingo = { O: 0, X: 0 };

  bingoIndicies.forEach((indicies) => {
    let mark;
    let count = 1;

    for (let i = 0; i < indicies.length; i++) {
      const x = Math.floor(indicies[i] / 3);
      const y = indicies[i] % 3;

      if (board[x][y] === ".") break;

      if (i === 0) {
        mark = board[x][y];
        continue;
      }

      count += mark === board[x][y] ? 1 : 0;
    }

    if (count === 3) bingo[mark]++;
  });

  return bingo;
};
```
