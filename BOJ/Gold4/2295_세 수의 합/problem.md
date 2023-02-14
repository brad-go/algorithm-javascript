# 2295. 세 수의 합

## 문제 링크

https://www.acmicpc.net/problem/2295

## 문제 분류

: 이분 탐색, 해쉬

## 소요 시간

: 2시간

## 풀이 방법

처음에는 완전탐색과 dfs를 이용해서 세 수를 각각 구하면서 답을 찾는 방식으로 풀이했었지만, 시간 초과가 나서 실패했다. 그래서 문제의 알고리즘 분류를 확인하고 문제를 풀이할 수 있었다.

시간을 줄이기 위해 세 수의 합을 두 수의 합으로 변경해줄 필요가 있었다. 두 수의 합으로 변경한다면 다음과 같은 식을 도출할 수 있다.

```js
sum[i] + arr[j] = arr[k];
```

sum[i]를 두 수의 합으로 볼 때, arr[k](k번째 수, d)를 구하기 위해 arr[j]만을 구하면 된다는 것을 알 수 있다.

이 식은 다음과 같이 변경할 수도 있다.

```js
sum[i] = arr[k] - arr[j];
```

우리는 sum[i]를 알 수 있고, 반복문을 통해서 arr[k]와 arr[j]의 값을 대입해볼 수 있다.

즉, 풀이 방식은 다음과 같다.

1. 두 수의 합을 구하기
2. arr[k] - arr[j]의 값을 sum 배열에서 찾기
3. sum배열에 해당 값이 존재한다면 arr[k]값을 반환하기

sum 배열에서 값을 찾는 것은 이분 탐색을 사용해서 빠르게 찾아낼 수 있다.

## 풀이 코드

```js
const solution = (N, U) => {
  const numbers = U.sort((a, b) => a - b);
  const sums = [];

  // 두 수의 합을 구하기
  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      sums.push(numbers[i] + numbers[j]);
    }
  }

  // 이분 탐색을 위해 정렬해주기
  sums.sort((a, b) => a - b);

  // 큰 수부터 탐색할 것이므로 뒤에서부터 탐색
  for (let i = N - 1; i >= 0; i--) {
    for (let j = i; j >= 0; j--) {
      // arr[k] - arr[j]
      const target = numbers[i] - numbers[j];
      // sum배열에 target이 존재하는지 찾기
      const isExist = binarySearch(sums, target, 0, sums.length - 1);

      // 존재한다면 세 수의 합인 arr[k]반환하기
      if (isExist) return numbers[i];
    }
  }
};

const binarySearch = (array, target, left, right) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (target === array[mid]) {
      return true;
    } else if (target < array[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
};
```

## 코드 개선

두 수의 합이 존재하는지 찾기 위해 이분 탐색을 사용했었는데, Set 객체를 활용할 수도 있다.

```js
const solution = (N, U) => {
  // numbers를 큰 수부터 내림차순 정렬
  const numbers = U.sort((a, b) => b - a);
  const sumSet = new Set();

  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      sumSet.add(numbers[i] + numbers[j]);
    }
  }

  // arr[k] - arr[j]값이 sumSet에 존재한다면 arr[k]반환
  for (const a of numbers) {
    for (const b of numbers) {
      if (sumSet.has(a - b)) return a;
    }
  }
};
```
