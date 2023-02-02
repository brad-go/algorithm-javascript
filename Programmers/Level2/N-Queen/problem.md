# N-Queen

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12952

## 문제 분류

: 백트래킹, 완전 탐색

## 풀이 과정

n개의 퀸을 보드에 배치해야 했기에, 완전 탐색으로 풀이할 수 있을 것 같았다.
퀸이 어차피 한 줄에 하나씩 밖에 존재하지 못하므로, 1차원 배열을 통해 퀸의 위치를 유추해 낼 수 있을 것이라 생각했다. 그래서 순열을 통해 배치할 수 있는 퀸의 모든 위치를 탐색한 후에 해당 배치가 유효한지 체크하는 방식으로 구현하다가 대각선 상에 존재하는지를 체크하는 방법을 도저히 알 수가 없었다.

그래서 다른 분들의 코드를 참고해서 dfs 방식으로 문제를 풀이할 수 있었다. dfs 방식으로 백트래킹하는 것은 이해에 문제가 없었지만, 대각선 상에 위치하는 것을 체크하는 것이 이해하기가 정말 어려웠다.

문제를 풀이하는 핵심 아이디어는 두가지다.

- **퀸은 한 줄에 하나씩 밖에 존재하지 못하므로 1차원 배열을 통해 문제를 풀이**한다.
- 대각선에 다른 퀸이 위치한지 탐색이 필요한데, **대각선은 열의 차와 행의 차가 동일한 경우**이다.

(1, 0)에 퀸이 위치했다고 생각해보자. 행과 열의 차이가 1이다. (0, 1), (2, 1), (3, 2)는 모두 대각선에 위치한 칸이다. 모두 행과 열의 차이는 1로 일정하다. 따라서 **대각선은 열과 행의 차가 동일한 경우**란 것을 알 수 있다.

즉, 다음의 식을 통해 두 퀸이 대각선에 위치한지 알 수 있다.

```
|두 퀸 위치의 행 번호 차이| === |두 퀸 위치의 열 번호 차이|
```

예를 들어 (1, 0), (2, 1)의 위치를 보자.

```
|1 - 2| === |0 - 1|
```

두 위치의 행과 열의 차이는 동일하므로 대각선에 위치한다.

2차원 배열에서는 직접 행과 열의 값을 넣어주면 되겠지만, 1차원 배열에서는 그렇게 할 수 없다. 이 문제를 해결하기 위해서는

- 1차원 배열의 인덱스를 행(row)으로써 사용하기
- 1차원 배열의 해당 인덱스의 값을 열(column)으로 사용하기

위 두 가지를 만족하게 해서 문제를 풀이할 수 있다.

그렇다면 초기에 접근했던 방식으로 문제를 한 번 풀이해보자.

```js
const solution = (n) => {
  // n이 1이라면 1을 반환
  if (n === 1) return 1;

  // 모든 순열을 구해준다.
  const permutations = getPermutations(
    new Array(n).fill().map((_, index) => index + 1),
    n
  );

  // 퀸을 배치할 수 있는 개수를 담을 변수
  let answer = 0;

  // 순열을 통해 구한 퀸을 배치할 위치
  permutations.forEach((permutation) => {
    // 1차원 배열의 보드에 퀸을 배치
    const board = new Array(n)
      .fill()
      .map((row, index) => [index, permutation[index] - 1]);

    // 올바른 위치에 퀸을 배치했다면 즉, 서로 공격하지 않는다면 정답 증가
    if (isValid(board)) answer++;
  });

  return answer;
};

// 순열을 구하는 함수
const getPermutations = (array, select) => {
  const results = [];

  if (select === 1) {
    return array.map((number) => [number]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, select - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);

    results.push(...attached);
  });

  return results;
};

// 보드에 있는 퀸이 대각선 상에 위치했는지 체크하는 함수
const isValid = (board) => {
  // 1차원 배열의 모든 원소(퀸의 위치)들을 서로 비교
  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      // 대각선에 위치했다면
      if (isDiagonal(board[i], board[j])) {
        return false;
      }
    }
  }

  return true;
};

// 두 퀸의 행의 차와 열의 차를 이용해 대각선에 위치했는지 확인
const isDiagonal = (pos1, pos2) => {
  return Math.abs(pos1[0] - pos2[0]) === Math.abs(pos1[1] - pos2[1]);
};
```

이 방식으로는 결과적으로 문제를 완전히 해결할 수는 없다. 순열을 통해 모든 배치의 조합을 탐색하기 때문에, n이 10 이상이 되면 맥시멈 콜스택 오류가 나게된다.

## 풀이한 코드

DFS를 통해 퀸을 하나씩 배치해나가는 방식으로 문제를 풀이할 수 있었다.

```js
const solution = (n) => {
  // 퀸을 배치할 보드
  const board = new Array(n).fill(0);
  // 배치한 퀸의 개수
  const answer = { count: 0 };

  // dfs를 통해 n개의 퀸을 배치할 수 있는 방법의 수 찾기
  findPlacementMethod(n, board, 0, answer);

  return answer.count;
};

const findPlacementMethod = (n, board, row, answer) => {
  // 만약 row가 n이 되었다면 보드의 마지막 줄까지 퀸을 배치하면서 탐색을 완료했다는 것이므로
  if (row === n) {
    answer.count++;
    return;
  }

  // 0부터 n까지 반복하면서 퀸을 보드에 배치하기 - column
  for (let column = 0; column < n; column++) {
    // 이미 탐색한 위치라면 건너뛰기
    if (board[row]) continue;

    // 보드에 행에 해당하는 인덱스 열 값을 넣어주기
    board[row] = column;

    // 대각선, 상하좌우로 겹치지 않아 배치할 수 있다면
    if (isPlaceable(board, row)) {
      // 다음 행에 대해서 탐색을 진행
      findPlacementMethod(n, board, row + 1, answer);
    }

    // 다음 탐색을 위해 백트래킹 처리
    board[row] = 0;
  }
};

// 놓을 수 있는지 체크하기
const isPlaceable = (board, row) => {
  // 현재 라인 이전까지를 검사하기 때문에 row까지
  for (let i = 0; i < row; i++) {
    // 같은 줄이라면
    const isSameLine = board[row] === board[i];
    // 대각선이라면
    const isDiagonal = Math.abs(board[row] - board[i]) === Math.abs(row - i);

    if (isSameLine || isDiagonal) return false;
  }

  // 같은 줄도 대각선도 아니라면 배치 가능
  return true;
};
```
