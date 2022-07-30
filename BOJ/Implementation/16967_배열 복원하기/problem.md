# 배열 복원하기 - 16967

[문제 링크](https://www.acmicpc.net/problem/16967)

## 문제 풀이

배열을 X줄 만큼 잘라내고, 마지막 줄에서 잘라내서 복원하는 방식을 사용하려고 했는데, 이는 Y값이 H - 1에서만 적용이 가능했다. 그래서 문제에서 제시한대로 조건을 만들어 배열을 복원해야 했다.

### 풀이 설명

1. A배열을 H, W 크기로 만들어준다.
2. B배열의 크기만큼 반복문을 돌면서 아래의 조건에 따라 배열을 채워나간다.

- 배열이 겹치는 부분인지 (X <= i && i < H && Y < = j && j < W)
- 배열의 첫 줄 (i < X && j < W)
- 배열의 왼쪽 (X <= i && i < H && j < Y)

### 전체 코드

```js
// prettier-ignore
const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [H, W, X, Y] = input[0].split(" ").map(Number);
const B = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(H, W, X, Y, B) {
  const A = Array.from(Array(H), () => Array(W).fill(0));

  for (let i = 0; i < H + X; i++) {
    for (let j = 0; j < W + Y; j++) {
      // 겹치는 부분인지
      if (X <= i && i < H && Y <= j && j < W) {
        A[i][j] = B[i][j] - A[i - X][j - Y];
      } else if (i < X && j < W) {
        A[i][j] = B[i][j];
      } else if (X <= i && i < H && j < Y) {
        A[i][j] = B[i][j];
      }
    }
  }

  return A.map((line) => line.join(" ")).join("\n");
}

console.log(solution(H, W, X, Y, B));
```

### 코드 개선

처음 떠올린 배열을 잘라붙이는 방식이 머릿속에 가득차있어 문제를 더 쉽게 풀 수 있는 방법을 찾지 못했던 것 같다.

기존에 반복문을 통해 B배열의 전체를 돌게 했는데, `B[i][j] - A[i - X][j - Y]` 연산을 통해 필요한 값을 구할 수 있으므로, B 배열 전체를 순환할 필요가 없었다.

전체를 순회하지 않으므로 조건도 더욱 간단해진다. 복원할 배열이 될 A의 위와 왼쪽의 첫 줄은 X, Y만을 이용해 채울 수 있다. 그리고 나머지는 B배열과 구한 값의 뺄셈을 통해 구해낸다.

```js
// prettier-ignore
const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [H, W, X, Y] = input[0].split(" ").map(Number);
const B = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(H, W, X, Y, B) {
  const A = Array.from(Array(H), () => Array(W).fill(0));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      // 겹치지 않는 부분 - 맨 윗줄과 맨 왼쪽 줄
      if (i < X || j < Y) {
        A[i][j] = B[i][j];
        continue;
      }

      // 겹치는 부분
      A[i][j] = B[i][j] - A[i - X][j - Y];
    }
  }

  return A.map((line) => line.join(" ")).join("\n");
}

console.log(solution(H, W, X, Y, B));
```
