# 올바른 괄호

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12909

## 문제 분류

: 스택, 큐

## 풀이 과정

1. 문자열의 첫번째 문자가 닫는 괄호(")")라면 올바른 괄호가 아니다.
2. 스택을 표현할 변수를 선언해주고, 0으로 초기화한다. (스택을 배열로 선언해서 문자열을 push, pop을 이용해서 문제를 풀이할 수 있지만, 효율성에서 시간 초과가 나게 된다)
3. 문자열을 순회하면서 다음을 진행한다.
4. 여는 괄호("(")라면 스택에 1을 더하고 다음 문자로 넘어간다. (본래 배열이었다면 `push()` 라고 생각하면 된다)
5. 닫는 괄호(")")라면 스택에서 1을 빼준다. (본래 배열이었다면 `pop()` 과정) 만약 뺀 후에 스택에 0보다 작다면 올바르지 않은 괄호다.
6. 전체 문자열을 탐색한 후에 스택이 0보다 크다면 괄호의 짝이 맞지 않은 것이므로 올바른 괄호가 아니고, 0이라면 올바른 괄호임을 뜻한다.

## Solution

```js
const solution = (s) => {
  if (s[0] === ")") {
    return false;
  }

  let stack = 0;

  for (let char of s) {
    if (char === "(") {
      stack += 1;
      continue;
    }

    stack -= 1;
    if (stack < 0) return false;
  }

  return stack > 0 ? false : true;
};
```

## 코드 개선

if 문 대신 삼항 연산자를 사용해서 stack에 괄호가 쌓이고 제거됨을 표현할 수 있었다.

```js
const solution = (s) => {
  let stack = 0;

  for (let char of s) {
    stack += char === "(" ? 1 : -1;

    if (stack < 0) return false;
  }

  return stack === 0;
};
```

## 코드 개선 2

for문을 사용하지 않고, `reduce`를 사용해 코드를 좀 더 선언적으로 작성했다.

```js
const solution = (s) => {
  const balance = s.split("").reduce((acc, char, _, arr) => {
    acc += char === "(" ? 1 : -1;

    // break 걸기
    if (acc < 0) {
      return arr.splice(1);
    }

    return acc;
  }, 0);

  return balance === 0;
};
```
