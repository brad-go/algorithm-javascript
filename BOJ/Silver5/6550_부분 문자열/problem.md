# 6550. 부분 문자열

## 문제 링크

https://www.acmicpc.net/problem/6550

## 문제 분류

: 문자열

## 소요 시간

: 1시간

## 풀이 방법

정말 간단한 문제였는데, 접근을 잘못해서 한참을 헤맸다.

처음에는 완전 탐색을 통해 t의 문자열이 s의 길이가 되도록 문자를 제거하는 모든 경우의 문자열을 비교해서 문제를 해결하려고 했지만,
Maximum CallStack 오류가 발생해서 다른 접근 방법을 찾아야 했다.

다음 접근 방식은 중첩 반복문을 이용해서 s와 t의 문자를 각각 비교하고, 같은 문자를 발견하면 변수 index에 값을 저장한다.
그리고 다음 같은 문자를 발견했을때, 변수 index의 값이 현재 순회하고 있는 인덱스의 값보다 작은지 확인하고, 작다면 진행 아니면 NO를 반환하게 했다.
예제는 모두 통과했지만, 백준에서는 자꾸 실패했다.

다음 생각한 접근은 문자열 t의 문자를 확인하면서 s의 문자와 같은 문자가 있다면 index를 증가시키고, t의 문자를 모두 확인했따면
index의 길이를 s의 길이와 비교해서 'Yes' or 'No'를 출력하는 방식이었다.

예를 들어, sequence와 subsequence를 비교해보자.

| index | i   | s[index] | t[i] | equal |
| ----- | --- | -------- | ---- | ----- |
| 0     | 0   | s        | s    | true  |
| 1     | 1   | e        | u    |       |
| 1     | 2   | e        | b    |       |
| 1     | 3   | e        | s    |       |
| 1     | 4   | e        | e    | true  |
| 2     | 5   | q        | q    | true  |
| 3     | 6   | u        | u    | true  |
| 4     | 7   | e        | e    | true  |
| 5     | 8   | n        | n    | true  |
| 6     | 9   | c        | c    | true  |
| 7     | 10  | e        | e    | true  |

t의 모든 문자를 확인하고나면 index는 7이되어있다. sequence의 길이는 7이므로 true를 반환한다.

실패하는 케이스도 한 번 보자.

| index | i   | s[index] | t[i] | equal |
| ----- | --- | -------- | ---- | ----- |
| 0     | 0   | p        | c    |       |
| 0     | 1   | p        | o    |       |
| 0     | 2   | p        | m    |       |
| 0     | 3   | p        | p    | true  |
| 1     | 4   | e        | r    |       |
| 1     | 5   | e        | e    | true  |
| 2     | 6   | r        | s    |       |
| 2     | 7   | r        | s    |       |
| 2     | 8   | r        | i    |       |
| 2     | 9   | r        | o    |       |
| 2     | 10  | r        | n    |       |

index가 person의 길이인 6이 되지 못했다. 즉, s는 t의 부분 문자열이 아니다.

즉, 다음과 같이 풀이할 수 있다.

1. t의 모든 문자를 확인하면서 아래를 수행한다.
2. s의 처음 문자부터 t의 문자를 비교한다.
3. 만약 같다면 s의 다음 문자를 t의 문자와 비교한다. 이때, 이전까지 비교했던 t의 다음 문자부터 비교한다.
4. t의 모든 문자를 확인했을 때, s의 마지막 문자까지 확인했다면 부분 문자열을 가진 것이다.

## 풀이 코드

```js
const solution = (s, t) => {
  let index = 0;

  for (let i = 0; i < t.length; i++) {
    // 같은 문자가 있다면 s의 다음 문자를 확인할 수 있도록 index 증가
    if (s[index] === t[i]) index++;
  }

  // s의 마지막 문자까지 확인했다면 t는 s를 부분 문자열로 가지고 있다.
  return index === s.length ? "Yes" : "No";
};
```
