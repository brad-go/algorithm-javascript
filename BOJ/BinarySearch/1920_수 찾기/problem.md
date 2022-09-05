# 수 찾기 - 1920

[문제 링크](https://www.acmicpc.net/problem/1920)

## 문제 풀이

### 풀이 설명

기본적인 이진 탐색 문제였다.

- 기존 수열을 이진 탐색이 가능하게 하기 위해 오름차순으로 정렬해준다.
- 각각의 찾으려는 수들이 존재하는 지 이진 탐색을 통해 확인해준다.

### 풀이한 코드

```js
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const numbers = input[1].split(" ").map(Number).sort((a, b) => a - b); // prettier-ignore
const targets = input[3].split(" ").map(Number);

function solution(numbers, targets) {
  let answer = "";
  targets.forEach((target) => (answer += `${binarySearch(numbers, target)}\n`));
  return answer.trim();
}

const binarySearch = (array, target, start = 0, end = array.length - 1) => {
  if (start > end) return 0;

  const mid = Math.floor((start + end) / 2);
  const current = array[mid];

  if (current < target) {
    return binarySearch(array, target, mid + 1, end);
  } else if (current > target) {
    return binarySearch(array, target, start, mid - 1);
  } else {
    return 1;
  }
};

console.log(solution(numbers, targets));
```

### 다른 풀이

이진 탐색을 직접 구현하지 않고, Set 객체로 만들어서 has 메서드를 사용해서 문제를 풀이할 수도 있다.

```js
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const numbers = new Set(input[1].split(" ").map(Number)); // prettier-ignore
const targets = input[3].split(" ").map(Number);

function solution(numbers, targets) {
  const answer = targets.map((target) => (numbers.has(target) ? 1 : 0));
  return answer.join("\n");
}

console.log(solution(numbers, targets));
```
