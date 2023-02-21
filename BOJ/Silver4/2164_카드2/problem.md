# 14584. 암호 해독

## 문제 링크

https://www.acmicpc.net/problem/14584

## 문제 분류

: 자료 구조, 큐

## 소요 시간

: 1시간

## 풀이 방법

처음에는 큐로 풀이하려고 했지만, N이 500000만이기 때문에 시간 초과가 나서 풀이할 수 없었다. 그래서 N이 1일 때부터 1씩 증가시키면서 마지막에 남는 카드의 번호를 확인해봤다.

| N   | 마지막에 남는 카드의 수 | N   | 마지막에 남는 카드의 수 |
| --- | ----------------------- | --- | ----------------------- |
| 1   | 1                       | 9   | 2                       |
| 2   | 2                       | 10  | 4                       |
| 3   | 2                       | 11  | 6                       |
| 4   | 4                       | 12  | 8                       |
| 5   | 2                       | 13  | 10                      |
| 6   | 4                       | 14  | 12                      |
| 7   | 6                       | 15  | 14                      |
| 8   | 8                       | 16  | 16                      |

규칙이 보이는가? 2의 거듭제곱을 기준으로 마지막에 남는 카드의 번호를 찾아낼 수 있다.

- N이 2의 거듭제곱인 경우 마지막의 남는 카드의 번호는 N이다.
- 2의 거듭제곱보다 N이 클 경우 이전 2의 거듭제곱보다 1이 클수록 2씩 증가한다.

그러므로 다음과 같은 풀이 방법을 생각할 수 있다.

1. N이 2 이하라면 그대로 N을 반환한다.
2. N보다 작은 가장 큰 2의 거듭제곱을 찾는다.
3. N과 해당 수가 같다면 N을 반환한다.
4. 다르다면 둘의 차를 구한 후 2를 곱한 값을 반환한다.

## 풀이 코드

```js
const solution = (N) => {
  if (N <= 2) return N;

  // N보다 작은 가장 큰 2의 거듭제곱 찾기
  const exponent = Math.floor(Math.log2(N));
  const biggest = Math.pow(2, exponent);

  // N과 같다면 마지막에 남는 카드의 번호는 N
  if (biggest === N) return N;

  // 둘이 차를 구하기
  const diff = N - biggest;

  // N까지 1증가할 때마다 남는 카드의 번호는 2씩 증가하므로 2를 곱해서 반환
  return diff * 2;
};
```

## 코드 개선

내림 대신 올림을 사용하면 더 간단하게 풀이할 수 있다.

```js
const solution = (N) => {
  const exponent = Math.ceil(Math.log2(N));
  const max = Math.pow(2, exponent - 1);

  return (N - max) * 2;
};
```

## 다른 풀이

큐를 구현해서 직접 풀이할 수도 있었다. shift연산에서 시간이 많이 걸리기 때문에 이 방법을 포기했었는데, shift 연산을 하지 않고 push 연산만을 통해서 간단하게 구현할 수 있었다.

```js
const solution = (N) => {
  const queue = new Array(N).fill().map((_, index) => index + 1);

  let max = 0;

  while (max < queue.length - 1) {
    queue.push(queue[max + 1]);
    max += 2;
  }

  return queue[queue.length - 1];
};
```
