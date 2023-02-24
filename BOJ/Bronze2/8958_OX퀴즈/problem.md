# 8958. OX퀴즈

## 문제 링크

https://www.acmicpc.net/problem/8958

## 문제 분류

: 문자열, 구현

## 소요 시간

: 5분

## 풀이 방법

1. 주어진 문자열에서 O를 만날 때마다 콤보값을 증가시키며 해당 값을 점수에 추가한다.
2. X를 만나면 콤보를 0으로 만든다.
3. 1, 2를 문자열이 끝날 때까지 반복한다.

## 풀이 코드

```js
const solution = (result) => {
  let combo = 0;

  return result.split("").reduce((acc, cur) => {
    combo = cur === "O" ? combo + 1 : 0;
    acc = cur === "O" ? acc + combo : acc;

    return acc;
  }, 0);
};
```
