# 최소직사각형

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/86491

## 문제 분류

: 완전탐색

## 풀이 과정

1. 가로에 더 긴 쪽이 오도록 sizes를 순회하면서 세로가 가로보다 크다면 둘을 바꿔준다.
2. 주어진 배열에서 가로 중에 가장 긴 것과 세로 중에 가장 긴것을 곱한 값을 반환한다.

```js
const solution = (sizes) => {
  const newSizes = sizes.map(([w, h]) => (h > w ? [h, w] : [w, h]));
  const width = Math.max(...newSizes.map(([w]) => w));
  const height = Math.max(...newSizes.map(([_, h]) => h));

  return width * height;
};
```

## 코드 개선

```js
const solution = (sizes) => {
  const maxWidth = Math.max(
    ...sizes.map(([width, height]) => Math.max(width, height))
  );
  const maxHeight = Math.max(
    ...sizes.map(([width, height]) => Math.min(width, height))
  );

  return maxWidth * maxHeight;
};
```

## 코드 개선 2

reduce를 통해 sizes를 한 번만 순회하기 때문에 가장 성능이 좋다.

```js
const solution = (sizes) => {
  const [width, height] = sizes.reduce(
    ([maxWidth, maxHeight], [currentWidth, currentHeight]) => {
      return [
        Math.max(maxWidth, Math.max(currentWidth, currentHeight)),
        Math.max(maxHeight, Math.min(currentWidth, currentHeight)),
      ];
    },
    [0, 0]
  );

  return width * height;
};
```
