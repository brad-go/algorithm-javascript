# 사탕 게임 - 3085

[문제 링크](https://www.acmicpc.net/problem/3085)

### 성능 요약

메모리: 128MB, 시간 1초

### 문제

상근이는 어렸을 적에 "봄보니 (Bomboni)" 게임을 즐겨했다.

가장 처음에 N×N크기에 사탕을 채워 놓는다. 사탕의 색은 모두 같지 않을 수도 있다. 상근이는 사탕의 색이 다른 인접한 두 칸을 고른다. 그 다음 고른 칸에 들어있는 사탕을 서로 교환한다. 이제, 모두 같은 색으로 이루어져 있는 가장 긴 연속 부분(행 또는 열)을 고른 다음 그 사탕을 모두 먹는다.

사탕이 채워진 상태가 주어졌을 때, 상근이가 먹을 수 있는 사탕의 최대 개수를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 보드의 크기 N이 주어진다. (3 ≤ N ≤ 50)

다음 N개 줄에는 보드에 채워져 있는 사탕의 색상이 주어진다. 빨간색은 C, 파란색은 P, 초록색은 Z, 노란색은 Y로 주어진다.

사탕의 색이 다른 인접한 두 칸이 존재하는 입력만 주어진다.

### 출력

첫째 줄에 상근이가 먹을 수 있는 사탕의 최대 개수를 출력한다.

### 예제 입력 1

```
3
CCP
CCP
PPC
```

### 예제 출력 1

```
3
```

### 예제 입력 2

```
4
PPPP
CYZY
CCPY
PPCC
```

### 예제 출력 2

```
4
```

### 예제 입력 3

```
5
YCPZY
CYZZP
CCPPP
YCYZC
CPPZZ
```

### 예제 출력 3

```
4
```

### 예제 입력 4

```
6
CCYYCC
YYCCYY
CCYYCC
YYCCYY
CCYYCC
YYCCYY
```

### 예제 출력 4

```
3
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

브루트 포스에 대한 개념없이 문제를 풀기 시작했는데, 정말 난감했다. 지금까지 푼 문제들은 문제 해결 핵심 아이디어를 찾으면, 코드로 구현해내는 것은 어렵지 않은 일이었는데, 이건 쉽지 않았다.

### 코드

```js
const [n, ...input] = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const board = input.map((line) => line.split(""));

  let ans = 0;

  // 보드를 확인하면서 최대로 연속된 사탕의 개수를 반환하는 함수
  const getMaxCandies = (board) => {
    let candies = 0;

    // 열 검사
    for (let i = 0; i < n; i++) {
      let count = 1;
      let memo = 0;
      for (let j = 0; j < n - 1; j++) {
        if (board[j][i] === board[j + 1][i]) {
          count++;
          memo = Math.max(memo, count);
        }
        if (board[j][i] !== board[j + 1][i]) count = 1;
      }
      candies = Math.max(candies, memo);
    }

    // 행 검사
    for (let i = 0; i < n; i++) {
      let count = 1;
      let memo = 0;
      for (let j = 0; j < n - 1; j++) {
        if (board[i][j] === board[i][j + 1]) {
          count++;
          memo = Math.max(memo, count);
        }
        if (board[i][j] !== board[i][j + 1]) count = 1;
      }
      candies = Math.max(candies, memo);
    }

    return candies;
  };

  // 보드를 순회하기
  loop: for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      // 가로 스왑
      if (board[i][j] !== board[i][j + 1]) {
        const temp1 = board[i][j];
        board[i][j] = board[i][j + 1];
        board[i][j + 1] = temp1;

        ans = Math.max(ans, getMaxCandies(board));

        if (ans === n) break loop;

        const temp2 = board[i][j];
        board[i][j] = board[i][j + 1];
        board[i][j + 1] = temp2;
      }

      // 세로 스왑
      if (board[j][i] !== board[j + 1][i]) {
        const temp1 = board[j][i];
        board[j][i] = board[j + 1][i];
        board[j + 1][i] = temp1;

        ans = Math.max(ans, getMaxCandies(board));

        if (ans === n) break loop;

        const temp2 = board[j][i];
        board[j][i] = board[j + 1][i];
        board[j + 1][i] = temp2;
      }
    }
  }
  console.log(ans);
}

Solution(Number(n), input);
```

### 풀이

```js
const getMaxCandies = (board) => {
  let candies = 0;

  // 열 검사
  for (let i = 0; i < n; i++) {
    let count = 1;
    let memo = 0;
    for (let j = 0; j < n - 1; j++) {
      if (board[j][i] === board[j + 1][i]) {
        count++;
        memo = Math.max(memo, count);
      }
      if (board[j][i] !== board[j + 1][i]) count = 1;
    }
    candies = Math.max(candies, memo);
  }

  // 행 검사
  for (let i = 0; i < n; i++) {
    let count = 1;
    let memo = 0;
    for (let j = 0; j < n - 1; j++) {
      if (board[i][j] === board[i][j + 1]) {
        count++;
        memo = Math.max(memo, count);
      }
      if (board[i][j] !== board[i][j + 1]) count = 1;
    }
    candies = Math.max(candies, memo);
  }

  return candies;
};
```

이 함수는 이차원 배열로 이루어진 보드를 순회하면서 인자로 받은 현재 보드의 상태에서 가장 길게 연결된 사탕의 수를 반환한다. 열 검사 및, 행 검사 두번의 검사가 이루어지고, `candies` 변수 즉, 가장 길게 연결된 사탕의 개수는 `Math.max()`를 이용해 가장 높은 값으로 저장된다.

여기서의 핵심은 **연결된 사탕의 개수를 어떻게 세느냐**이다.

```js
if (board[i][j] === board[i][j + 1]) {
  count++;
  memo = Math.max(memo, count);
}
if (board[i][j] !== board[i][j + 1]) count = 1;
```

현재 칸과 다음 칸이 같다면 사탕의 수를 증가시키고, 이것을 메모해둔다. (`memo` 변수에 저장) 그리고 현재 칸과 다음 칸이 다르다면 `count` 변수를 1로 만든다. 이렇기 때문에 `memo` 변수 저장 시에는 `Math.max()`를 이용해서 사탕의 개수를 세준다.

```js
// 보드를 순회하기
loop: for (let i = 0; i < n; i++) {
  for (let j = 0; j < n - 1; j++) {
    // 가로 스왑
    if (board[i][j] !== board[i][j + 1]) {
      const temp1 = board[i][j];
      board[i][j] = board[i][j + 1];
      board[i][j + 1] = temp1;

      ans = Math.max(ans, getMaxCandies(board));

      if (ans === n) break loop;

      const temp2 = board[i][j];
      board[i][j] = board[i][j + 1];
      board[i][j + 1] = temp2;
    }

    // 세로 스왑
    if (board[j][i] !== board[j + 1][i]) {
      const temp1 = board[j][i];
      board[j][i] = board[j + 1][i];
      board[j + 1][i] = temp1;

      ans = Math.max(ans, getMaxCandies(board));

      if (ans === n) break loop;

      const temp2 = board[j][i];
      board[j][i] = board[j + 1][i];
      board[j + 1][i] = temp2;
    }
  }
}
```

그 다음 이 코드는 각 칸을 처음부터 끝까지 순회하면서, 현재 칸과 다음 칸의 사탕이 다르다면 서로 위치를 바꿔서 최고로 연결된 사탕의 개수를 확인한다.

- 다른 사탕끼리 위치 바꾸기
- `getMaxCandies`에 현재 보드 상태를 전달하고, 최대 사탕 개수를 반환받기
- `ans`라는 변수에 `Math.max()`를 이용해 현재값과 비교해 큰 것을 저장하기
- `ans`가 `n`(보드의 크기, 즉, 최대로 연결될 수 있는 사탕의 개수)과 같다면 반복문을 탈출
- 아니라면 보드를 원상태로 돌리고 다음 서로 다른 사탕끼리 위치 변환하기

가로로 위치를 변경하고, 다음은 세로로 위치를 변경하면서 위의 로직이 반복된다.

어떻게 정답을 받아냈지만, 정말 코드가 깔끔하지 못하고 지저분한 것 같다. 중복되는 코드도 많고, `loop break`를 쓰는 것이 좋은 코드인지 모르겠다. 더 나은 코드를 찾아봐야 겠다.

</div>
</details>
