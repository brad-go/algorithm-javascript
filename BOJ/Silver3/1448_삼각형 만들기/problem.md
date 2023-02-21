# 1448. 삼각형 만들기

## 문제 링크

https://www.acmicpc.net/problem/1448

## 문제 분류

: 수학, 그리디 알고리즘, 정렬

## 소요 시간

: 50분

## 풀이 방법

N개의 빨대 중 세 개를 선택해서 삼각형이 되는지 확인하고, 삼각형이 된다면 세 변 길이의 합의 최댓값을 구하는 문제였다.
문제를 풀기 위해서는 세 변의 정보를 알 때, 삼각형이 되는 경우를 알아야 한다. 삼각형은 세 변의 길이를 알 때, 가장 긴 변의
길이가 나머지 두 변의 길이의 합보다 작은 경우 삼각형이 된다.

이제 삼각형이 되는 조건을 알았으니 문제 풀이를 구상해보자.

- N은 1,000,000까지 이므로 완전탐색은 불가능하다.
- 빨대의 길이는 중복될 수 있다.
- 빨대의 길이는 정렬되어있지 않다.

문제를 살펴보면 위 정보들을 알 수 있다. 위 정보들을 토대로 풀이 방법을 생각하면 하나의 반복문으로 문제를 풀이해야 한다.
세 변을 선택해야 하는데, 반복문을 어떻게 하나를 사용해서 풀이할 수 있을까?

해답은 정렬에 있다. 빨대의 길이가 담긴 배열을 오름차순으로 정렬한 후에 가장 긴 길이부터 세 개의 빨대를 선택하고, 삼각형이
되는지 확인하는 방식으로 문제를 풀이할 수 있다.

1. 빨대의 길이들을 오름차순으로 정렬한다. (자바스크립트 기본 정렬 메서드를 사용하는데, 내림차순 정렬보다 효율적이다)
2. 길이가 긴 것부터 빨대를 세개씩 골라가면서 삼각형이 되는지 확인한다. 이렇게 해도 삼각형이 되는 모든 경우를 탐색할 수 있는 이유는 가장 긴 변을 제외한 두 변을 골랐음에도 삼각형이 안된다면 더 짧은 빨대들은 어차피 삼각형이 될 수 없기 때문이다.
3. 삼각형이 된다면 세 변을 더해준다.
4. 정답보다 작다면 반복문을 탈출하고 정답을 반환한다.
5. 정답보다 크다면 현재 값을 정답으로 만들어준다.

## 풀이 코드

```js
const solution = (N, straws) => {
  // 오름차순 정렬
  straws.sort((a, b) => a - b);

  let answer = 0;

  // 가장 긴 변에서 부터 탐색
  for (let i = N - 3; i >= 0; i--) {
    // 삼각형이 되지 않는다면 다음으로 건너뛰기
    if (straws[i + 2] >= straws[i + 1] + straws[i]) continue;

    // 세 변의 합
    const sum = straws[i + 2] + straws[i + 1] + straws[i];

    // 정답이 더 크다면 더 탐색할 필요가 없으므로 탈출
    if (answer > sum) break;

    // 세 변의 합을 정답에 저장
    answer = sum;
  }

  // 삼각형이 될 수 없다면 -1 아니면 삼각형이 되는 가장 긴 세 변의 합을 출력
  return answer ? answer : -1;
};
```

## 코드 개선

직접 [퀵정렬](https://github.com/brad-go/algorithm-typescript/tree/main/src/algorithms/sorting/quick-sort)을 구현하면 더욱 빠르다.

```js
const solution = (N, straws) => {
  const sorted = quickSort(straws);

  let answer = 0;

  for (let i = 0; i < N - 2; i++) {
    if (sorted[i] >= sorted[i + 1] + sorted[i + 2]) continue;

    const sum = sorted[i + 2] + sorted[i + 1] + sorted[i];

    if (answer > sum) break;

    answer = sum;
  }

  return answer ? answer : -1;
};

const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left >= right) return array;

  const pivot = partition(array, left, right);

  if (left < pivot - 1) quickSort(array, left, pivot - 1);
  if (pivot < right) quickSort(array, pivot, right);

  return array;
};

const partition = (array, left, right) => {
  const pivot = array[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (array[left] > pivot) left++;
    while (array[right] < pivot) right--;

    if (left <= right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }

  return left;
};
```
