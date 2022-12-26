# H-Index

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42747

## 문제 분류

: 정렬

## 풀이 과정

정렬보다는 조건을 생각하는 것이 더 까다로웠던 문제였다. 문제 이해가 어려웠기 때문이다.

하지만 정렬을 이용하는 것은 간단했다. h번 이상 인용된 논문이 h편 이상일 때를 구하기 위해 인용된 횟수가 큰 순서대로 citations를 내림차순으로 정렬해서 h값을 구할 수 있다.

```js
const solution = (citations) => {
  // 인용횟수가 큰 순서부터 내림차순으로 정렬
  citations.sort((a, b) => b - a);

  // hIndex들이 담길 배열
  const hIndicies = [];

  // 인용횟수가 담긴 배열을 순서대로 순회
  citations.forEach((citation, index) => {
    // 0이라면 아래의 조건에 부합할 수 없으므로 hIndex의 후보에 0을 넣어준다.
    if (citation === 0) {
      hIndicies.push(0);
    }

    const h = index + 1;

    // 현재 논문의 인용 횟수 h값보다 크거나 같다면
    if (citation >= h) {
      // h가 현재 인용횟수보다 작거나 같다면 h(현재 인덱스 + 1)를 아니라면 인용횟수를 넣어준다. 인용횟수가 더 많아도 h회 이상의 인용된 논문의 개수가 적을 수 있기 때문에
      hIndicies.push(h <= citation ? h : citation);
    }
  });

  return Math.max(...hIndicies);
};
```

## 코드 개선

map 함수를 이용해 조금 더 선언적인 방법으로 코드를 작성할 수 있었다.

```js
const solution = (citations) => {
  citations.sort((a, b) => b - a);

  const hIndicies = citations.map((citation, index) => {
    const h = index + 1;

    return citation >= h ? h : 0;
  });

  return Math.max(...hIndicies);
};

// 혹은

const solution = (citations) => {
  const hIndicies = citations
    .sort((a, b) => b - a)
    .map((citation, index) => (citation >= index + 1 ? index + 1 : 0));

  return Math.max(...hIndicies);
};
```

## 코드 개선 2

위의 코드는 문제를 그대로 코드로 직역해 놓은 것과 같다. 그래서 조금 더 효율적으로 풀이하기 위해 방법을 고민했다. 성능면에서 가장 뛰어났다.

```js
const solution = (citations) => {
  citations.sort((a, b) => b - a);

  let hIndex = 0;

  citations.forEach((citation, index) => {
    const h = index + 1;

    // 현재 인용횟수가 인용된 논문의 개수보다 크다면 인용된 논문의 개수가 hIndex
    if (citation >= h) {
      hIndex = h;
    }
  });

  return hIndex;
};

// 혹은

const solution = (citations) => {
  let hIndex = 0;

  citations
    .sort((a, b) => b - a)
    .forEach((citation, index) => {
      if (citation < index + 1) {
        return;
      }

      hIndex = index + 1;
    });

  return hIndex;
};
```

## 코드 개선 3

filter와 length를 잘 이용하면 훨씬 간단하게 문제를 풀이할 수 있었다.

1. 내림차순으로 citations 정렬하기
2. 각 인용횟수가 각 h값(idx + 1)보다 큰 경우만 걸러내기
3. 해당 배열의 길이가 hIndex가 된다.

```js
const solution = (citations) =>
  citations
    .sort((a, b) => b - a)
    .filter((citation, index) => citation >= index + 1).length;
```
