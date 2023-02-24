# 10815. 숫자 카드

## 문제 링크

https://www.acmicpc.net/problem/10815

## 문제 분류

: 자료 구조, 정렬, 이분 탐색

## 소요 시간

: 5분

## 풀이 방법

1. 상근이가 가지고 있는 카드 번호를 키 값으로 객체를 생성한다.
2. 확인하려는 카드들을 하나씩 확인하면서 상근이가 가졌다면 1, 아니면 0을 출력한다.

## 풀이 코드

```js
const solution = (cards, targets) => {
  const cardSet = new Set(cards);

  return targets.map((target) => (cardSet.has(target) ? 1 : 0)).join(" ");
};
```

## 다른 풀이

문제의 의도대로 이분 탐색과 정렬을 이용해서도 풀이할 수 있다.

```js
const solution = (cards, targets) => {
  // 이분 탐색을 위해 정렬
  cards.sort((a, b) => a - b);

  // 각 찾으려는 카드들을 이분 탐색을 통해 카드에서 찾아내기
  return targets
    .map((target) => binarySearch(cards, target, 0, cards.length - 1))
    .join(" ");
};

const binarySearch = (array, target, left, right) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] > target) {
      right = mid - 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      // 카드를 가지고 있는 경우
      return 1;
    }
  }

  // 카드가 없는 경우
  return 0;
};
```
