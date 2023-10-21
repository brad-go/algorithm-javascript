# 10988. 팰린드롬인지 확인하기

## 문제 링크

https://www.acmicpc.net/problem/10988

## 문제 분류

: 구현, 문자열

## 소요 시간

: 20분

## 풀이 방법

1. stack으로 풀이해보자.
2. 단어의 길이가 홀수인경우와 홀수가 아닌 경우가 있다.
3. 홀수인 경우에는 가운데 문자를 무시하자
4. 나머지 단어에 대해 가운데 전까지 stack에 넣고 stack에서 하나씩 뽑아가면서
5. 나머지 반에 대해 비교해서 모두 같다면 펠린드롬

## 풀이 코드

```js
const filePath = process.platform == "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim(); // prettier-ignore

const solution = (input) => {
  const stack = [];
  const chars = [...input];
  const wordLength = chars.length;
  const halfLength = Math.floor(wordLength / 2);

  const isPalindrome = chars.every((char, index) => {
    if (index == halfLength && wordLength % 2 == 1) {
      return true;
    }

    if (index < halfLength) {
      stack.push(char);

      return true;
    }

    const poppedChar = stack.pop();

    return poppedChar == char;
  });

  return isPalindrome ? 1 : 0;
};

console.log(solution(input));
```

## 코드 개선

직접 비교를 통해서도 할 수 있다. 문자열로 하는 것이 성능은 더 좋은 것 같지만.

```js
const solution = (input) => {
  const chars = [...input];
  const reversedChars = [...input.split("").reverse()];
  const isPalindrome = chars.every(
    (char, index) => char == reversedChars[index]
  );

  return isPalindrome ? 1 : 0;
};
```
