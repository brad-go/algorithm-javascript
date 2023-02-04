# N-Queen

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12973

## 문제 분류

: 스택

## 풀이 과정

1. 스택을 생성한다.
2. 문자열의 문자를 처음부터 하나씩 확인해 나가면서 아래를 수행한다.
3. 현재 문자가 스택의 마지막 문자와 같고, 스택이 비지 않았다면 스택에서 문자를 꺼낸다.
4. 그렇지 않다면 스택에 문자를 집어 넣는다.
5. 스택에 문자가 남아있다면 짝지어 제거 불가하므로 0을 반환 스택이 비었다면 1을 반환한다.

## 풀이 코드

```js
const solution = (s) => {
  const stack = [];

  for (const char of s) {
    // 스택이 비지 않고, 스택의 마지막 문자가 현재 문자와 같다면 같은 문자가 연속이므로 제거
    if (stack.length && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length ? 0 : 1;
};
```
