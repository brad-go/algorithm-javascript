# 행렬의 곱셈

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12949

## 문제 분류

: 수학, 구현

## 풀이 과정

행렬의 곱셈 방식을 알면 간단히 풀 수 있는 문제였다.

렬은 앞 행렬의 열의 개수와 뒤 행렬의 행의 개수가 같아야 한다. 행렬 A의 열과 행렬 B의 행의 개수가 같을 때

```
A(m * k) * B(k * n) = AB(m * n)
```

위와 같은 식이 성립한다.

각 자리의 원소들은 행렬 A의 제 i행과 행렬 B의 제 j열의 성분을 차례대로 곱하여 더한 값이 행렬 AB의 (i, j)의 성분이 된다.

1. 곱한 결과를 담을 2차원 배열 matrix를 행렬 곱셈 법칙에 따라 크기에 맞게 생성한다. (M \* N)
2. 행렬 A의 각 행의 원소들과 행렬 B의 각 열의 원소들을 곱해준다.

## 풀이한 코드

```js
const solution = (arr1, arr2) => {
  const M = arr1.length;
  const N = arr2[0].length;
  const K = arr2.length;

  const matrix = Array.from(Array(M), () => Array(N).fill(null));

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let element = 0;

      for (let k = 0; k < K; k++) {
        element += arr1[i][k] * arr2[k][j];
      }

      matrix[i][j] = element;
    }
  }

  return matrix;
};
```

## 코드 개선

```js
const solution = (arr1, arr2) => {
  // 행렬 arr1의 각 행에 대해 반복(M)
  return arr1.map((row) => {
    // 행렬 arr2의 각 열에 대해 반복(N)
    return arr2[0].map((_, n) => {
      // 행렬 arr1의 행 길이 혹은 행렬 arr2의 열 길이인 K만큼 반복하면서 서로 곱하고 더해준다.
      return row.reduce((acc, cur, k) => acc + cur * arr2[k][n], 0);
    });
  });
};
```
