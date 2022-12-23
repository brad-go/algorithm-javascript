# 같은 숫자는 싫어

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12906

## 문제 분류

: 스택

## 풀이 방법

스택을 이용해서 스택의 마지막에 있는 원소가 현재 원소와 같다면 건너뛰고, 다르다면 스택에 넣어주는 방법으로 문제를 해결했다.

## Solution

```js
const solution = (arr) => {
  const stack = [];

  arr.forEach((num) => {
    if (stack[stack.length - 1] === num) {
      return;
    }

    stack.push(num);
  });

  return stack;
};
```

## 코드 개선

```js
const solution = (arr) => {
  return arr.filter((num, index) => num !== arr[index + 1]);
};
```

스택을 사용하지 않고, filter 메서드를 이용해 다음에 위치한 숫자와 다른 숫자만을 남기는 방식으로 풀이할 수 있었다.
