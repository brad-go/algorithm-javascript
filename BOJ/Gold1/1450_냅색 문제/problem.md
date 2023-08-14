# 1450. 냅색 문제

## 문제 링크

https://www.acmicpc.net/problem/1450

## 문제 분류

: 이분 탐색, 중간에서 만나기

## 소요 시간

: 1시간 30분

## 풀이 방법

문제가 "냅색 문제"라는 제목을 가졌기에 냅색 알고리즘을 통해 풀이하려고 했는데, 계속 실패했다. N과 C의 범위를 커버하면서 1초 내에 이 문제를 풀이하기 위해서는 더 효율적인 알고리즘이 필요했다.

이 문제는 **"Meet in the middle"**이라는 알고리즘을 통해 풀이할 수 있었다.

브루트포스로 문제를 해결하기에는 시간 초과가 발생할 수 있기에, 분할정복처럼 N을 절반으로 나눠서
연산한 다음에 결과를 합쳐서 문제를 풀이하는 방식의 알고리즘이다.

=> **"N^M의 연산을 2\*N^(M-1)의 연산으로 줄일 수 있다."**

1. 시간 복잡도를 줄이기 위해 범위를 절반으로 줄인다. -> 무게 배열을 반으로 나눈다.
2. 반으로 나눈 두 개의 무게 배열에서 각각 무게의 합의 모든 경우의 수를 찾는다.
3. 두 번째 합의 경우의 수가 담긴 배열을 정렬해준다.
4. 첫 번째 합의 경우의 수가 담긴 배열을 탐색하면서 아래를 반복한다.
5. 최대 무게보다 현재 무게가 더 크다면 건너뛴다.
6. 최대 무게에서 현재 무게를 뺀 값을 이분 탐색을 통해 조건을 만족하는 부분 집합의 개수를 구한다.

## 풀이 코드

```js
const solution = (N, C, weights) => {
  // 시간 복잡도를 줄이기 위해 범위를 절반으로 줄인다.
  const weightsA = weights.slice(0, Math.floor(N / 2));
  const weightsB = weights.slice(Math.floor(N / 2));

  // weightsA, B에서 나올 수 있는 무게의 합의 모든 경우의 수를 담을 배열
  const weightsSumA = [];
  const weightsSumB = [];

  // 각 배열에서 나올 수 있는 무게의 합의 모든 경우의 수를 찾기
  findSumCombinations(weightsA, weightsSumA, 0, 0);
  findSumCombinations(weightsB, weightsSumB, 0, 0);

  // 이분 탐색을 위해 정렬해주기
  weightsSumB.sort((a, b) => a - b);

  const count = weightsSumA.reduce((acc, cur) => {
    // 현재 배낭에 담은 무게를 빼고 더 담을 수 있는 무게
    const target = C - cur;

    if (target < 0) return acc;

    // 이분 탐색을 통해서 담을 수 있는 무게의 경우의 수를 찾아 더해주기
    return acc + binarySearch(weightsSumB, target, 0, weightsSumB.length);
  }, 0);

  return count;
};

const findSumCombinations = (array, sumArray, index, sum) => {
  if (index === array.length) {
    sumArray.push(sum);

    return;
  }

  findSumCombinations(array, sumArray, index + 1, sum);
  findSumCombinations(array, sumArray, index + 1, sum + array[index]);
};

const binarySearch = (array, target, start, end) => {
  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (array[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
};
```
