# 15686. 치킨 배달

## 문제 링크

https://www.acmicpc.net/problem/15686

## 문제 분류

: 구현, 브루트포스 알고리즘, 백트래킹

## 소요 시간

: 1시간

## 풀이 방법

각 치킨집들의 위치를 모두 구하고, M개를 선택해서 각 집에서의 치킨거리를 구한 합을 더하면 되는 문제였다.

1. 각 집과 치킨집의 위치를 찾는다.
2. dfs를 통해 치킨집 M개를 선택한다.
3. M개 선택 후 도시의 치킨거리를 계산한다.
4. 도시의 치킨 거리는 각 집의 치킨거리를 모두 더한 값

## 풀이 코드

```js
const CITY = {
  empty: 0,
  house: 1,
  chicken: 2,
};

const solution = (N, M, city) => {
  // 집과 치킨집들의 위치 찾기
  const { houses, chickens } = findPlaces(city);
  // 선택된 치킨집들의 위치가 담길 배열
  const selected = [];

  let answer = Number.MAX_SAFE_INTEGER;

  // DFS를 통해 치킨집 M개 선택하기
  const dfs = (count, index) => {
    // M개를 선택했다면
    if (count === M) {
      // 도시의 치킨거리를 구해서 정답 최솟값으로 갱신
      answer = Math.min(answer, getChickenDistOfCity(selected, houses));
      return;
    }

    // 인덱스를 늘려가며 치킨집 하나씩 선택하기
    for (let i = index; i < chickens.length; i++) {
      selected.push(chickens[i]);
      dfs(count + 1, i + 1);
      selected.pop();
    }
  };

  dfs(0, 0);

  return answer;
};

const findPlaces = (city) => {
  const houses = [];
  const chickens = [];

  city.forEach((row, rowIndex) => {
    row.forEach((place, columnIndex) => {
      if (place === CITY.house) houses.push([rowIndex, columnIndex]);
      if (place === CITY.chicken) chickens.push([rowIndex, columnIndex]);
    });
  });

  return { houses, chickens };
};

const getChickenDistOfCity = (chickens, houses) => {
  // 모든 집의 치킨거리 더하기
  return houses.reduce((acc, house) => {
    // 각 집의 치킨거리를 구해서
    return acc + getChickenDistOfHouse(chickens, house);
  }, 0);
};

const getChickenDistOfHouse = (chickens, house) => {
  // 각 집에서 모든 치킨집과의 거리를 비교해서 가장 작은 값 반환
  return chickens.reduce(
    (acc, chicken) =>
      Math.min(acc, getDistance(house[0], house[1], chicken[0], chicken[1])),
    Number.MAX_SAFE_INTEGER
  );
};

const getDistance = (r1, c1, r2, c2) => {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};
```
