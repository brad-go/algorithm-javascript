# 1874. 스택 수열

## 문제 링크

https://www.acmicpc.net/problem/1874

## 문제 분류

: 스택, 자료 구조

## 소요 시간

: 15분

## 풀이 방법

1. 스택을 생성한다.
2. 오름차순으로 스택에 집어넣어야 하므로 for문을 통해 스택에 수를 하나씩 넣는다.
3. 넣을 때마다 answer에 +기호를 넣어준다.
4. 스택에 수가 들어있고, 스택의 마지막이 만드려는 수열의 현재 인덱스와 같다면 스택에서 해당 수를 꺼내고, 수열의 숫자를 가리키는 인덱스를 증가시킨다. answer에 -기호를 넣어준다.
5. 스택이 비었다면 answer를 출력하고, 스택에 수가 남아있다면 해당 수열을 만들지 못하는 것이므로 NO를 출력한다.

## 풀이 코드

```js
const solution = (N, numbers) => {
  const stack = [];

  let answer = "";
  let index = 0;

  // 오름차순으로 수를 넣기 위해 for문 사용
  for (let i = 1; i <= N; i++) {
    // 스택에 수를 넣어주기
    stack.push(i);
    answer += "+\n";

    // 스택이 비지 않았고, 스택의 마지막 수가 만들고자 하는 수열의 현재 인덱스와 같다면
    while (stack.length && stack[stack.length - 1] === numbers[index]) {
      // 스택에서 해당 수 꺼내기
      stack.pop();
      answer += "-\n";
      // 인덱스를 증가시켜 수열의 다음 수와 비교할 수 있도록 하기
      index++;
    }
  }

  // 스택이 비지 않았다면 해당 수열을 만들 수 없는 것
  return stack.length ? "NO" : answer.trim();
};
```
