# 행렬 곱셈 - 2740

[문제 링크](https://www.acmicpc.net/problem/2740)

## 문제 풀이

행렬 곱셈에 대해 알아야 풀이할 수 있는 문제였다. 행렬의 곱셈은 **앞의 행렬의 열의 수와 뒤의 행렬의 행의 수가 같아야 할 수 있는데**, 문제 자체 조건에서 그러한 행렬만이 들어온다고 해서 무조건 곱할 수 있는 행렬들이었다.

### 풀이 설명

1. 행렬을 곱하면 앞 행렬의 열의 수, 뒤 행렬의 행의 수와 같은 크기의 새 행렬이 만들어진다. 여기는 M이므로, M \* M 크기의 새 행렬을 만들어준다.
2. 앞 행렬의 행, 뒤 행렬의 열만큼 반복하면서 새 행렬에 들어갈 원소를 구해준다.
3. 원소를 구하는 것은 다음과 같다.

```
(0, 0) = 행렬 A의 첫번째 행의 원소들 * 행렬 B의 첫번쩨 열의 원소들
       = A[0][0] * B[0][0] + A[0][1] * B[1][0]
(0, 1) = 행렬 A의 첫번째 행의 원소들 * 행렬 B의 두번째 열의 원소들
       = A[0][0] * B[0][1] + A[0][1] * B[1][1]
...
(2, 2) = 행렬 A의 세번째 행의 원소들 * 행렬 B의 세번째 열의 원소들
       = A[2][0] * B[0][2] + A[2][1] * B[1][2]
```

즉, **행렬 A의 각 행의 원소들과 행렬 B의 각 열의 원소들을 M만큼 반복하면서 곱해서 더해주면 된다**.

### 전체 코드

```js
// prettier-ignore
const input = require("fs").readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const [_, K] = input[N + 1].split(" ").map(Number);
const A = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const B = input.slice(N + 2).map((row) => row.split(" ").map(Number));

const solution = (N, K, M, A, B) => {
  const matrix = Array.from(Array(N), () => Array(K));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < K; j++) {
      matrix[i][j] = getElement(M, A, B, i, j);
    }
  }

  matrix.forEach((row) => console.log(row.join(" ")));
};

const getElement = (M, A, B, x, y) => {
  let result = 0;

  for (let i = 0; i < M; i++) {
    result += A[x][i] * B[i][y];
  }

  return result;
};

solution(N, K, M, A, B);
```
