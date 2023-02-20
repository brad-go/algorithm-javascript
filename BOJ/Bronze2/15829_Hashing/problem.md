# 15829. Hashing

## 문제 링크

https://www.acmicpc.net/problem/15829

## 문제 분류

: 문자열, 해시

## 소요 시간

: 10분

## 풀이 방법

> 해시함수: 임의의 길이를 입력받아서 고정된 길이의 출력을 내보내는 함수로 자료의 저장과 탐색에 쓰인다.

1. 문자열에 속해있는 a ~ z까지의 각 문자를 charCode를 이용해서 1 ~ 26의 정수로 이루어진 수열로 만든다.
2. 위 수열에 주어진 수식을 이용해 답을 출력한다.

## 풀이 코드

```js
const solution = (string) => {
  const R = 31;
  const M = 1234567891;

  const progression = string.split("").map((char) => char.charCodeAt() - 96);
  const hash = progression.reduce(
    (acc, cur, index) => acc + cur * Math.pow(R, index),
    0
  );

  return hash % M;
};
```

## 코드 개선

50점을 받는 것은 너무나도 쉬웠지만, 100점을 받기 위해서는 위와 같이 풀이할 수 없었다. 길이가 길어지면서
Math.pow를 사용해서 R의 거듭제곱을 구할 때, R이 M보다 커지면 오차가 발생하게되므로 매 연산마다 M으로 나눠줄 필요가 있었다.

```js
const R = 31;
const M = 1234567891;

const solution = (string) => {
  const hash = string.split("").reduce((acc, cur, index) => {
    acc += (cur.charCodeAt() - 96) * getCounting(index);
    return acc % M;
  }, 0);

  return hash % M;
};

const getCounting = (index) => {
  let counting = 1;

  for (let i = 1; i <= index; i++) {
    counting *= R;
    counting %= M;
  }

  return counting;
};
```

## 다른 코드

```js
const solution = (string) => {
  const R = 31;
  const M = 1234567891;

  let r = 1;

  const hash = string.split("").reduce((acc, cur) => {
    acc += (cur.charCodeAt() - 96) * r;
    r *= R;
    r %= M;

    return acc % M;
  }, 0);

  return hash % M;
};
```
