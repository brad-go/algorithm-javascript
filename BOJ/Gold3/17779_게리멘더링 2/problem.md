# 17144. 게리멘더링 2

## 문제 링크

https://www.acmicpc.net/problem/17144

## 문제 분류

: 구현, 브루트포스 알고리즘

## 소요 시간

: 2시간 30분

## 풀이 방법

브루트포스를 이용한 구현 문제인데, 풀이 방법을 알아도 구현해내기가 쉽지 않았다. 처음에는 순열을 이용해서 x, y, d1, d2를 구하려고했는데, 문제에서 제시된 조건에 유효한 4개의 수가 왠지 모르게 나오지 않아서 dfs를 이용해서 네 개의 수를 구했다.

해당 값들을 가지고 경계선을 구한 후 5번째 선거구를 도시에서 채워주었다. 그리고 나머지 선거구들을 조건에 맞게 수를 채워준 후에 각 선거구의 인구수를 구한 후, 최댓값에서 최솟값을 뺀 차가 가장 적게 나타나는 경우의 값을 반환했다.

1. DFS로 조건에 유효한 x, y, d1, d2 값 구하기
2. 경계선 구하기
3. 5번 선거구 도시에 표시하기
4. 나머지 선거구 도시에 표시하기
5. 각 선거구의 인구 수 구하기
6. 인구수가 가장 많은 선거구와 가장 적은 선거구의 인구수 차를 찾아서 최솟값으로 정답 갱신

## 풀이 코드

```js
const solution = (N, city) => {
  const boundaryValues = [];

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (count) => {
    // 4개의 수를 선택했다면
    if (count === 4) {
      // 유효한 수의 조합인지 체크
      if (isValid(N, boundaryValues)) {
        // 해당 수들로 선거구를 나누기 위한 도시 생성
        const newCity = Array.from(Array(N), () => Array(N).fill(0));
        // 경계선 찾기
        const boundaries = getBoundaries(...boundaryValues);

        // 5번 선거구 도시에 표시
        findFifthElection(newCity, boundaries);
        // 나머지 선거구 도시에 표시
        findElections(newCity, boundaryValues);

        // 각 선거구의 인구수 구하기
        const counts = getCountsOfElection(N, newCity, city);
        const max = Math.max(...counts);
        const min = Math.min(...counts);

        // 인구수가 가장 많은 선거구와 가장 적은 선거구의 차로 정답 갱신
        answer = Math.min(answer, max - min);
      }
      return;
    }

    for (let i = 1; i < N; i++) {
      boundaryValues.push(i);
      dfs(count + 1);
      boundaryValues.pop();
    }
  };

  dfs(0);

  return answer;
};

// 유효한 수 조합인지 확인
const isValid = (N, boundaryValues) => {
  const [x, y, d1, d2] = boundaryValues;

  return (
    d1 >= 1 &&
    d2 >= 1 &&
    1 <= x &&
    x < x + d1 + d2 &&
    x + d1 + d2 <= N &&
    1 <= y - d1 &&
    y - d1 < y &&
    y < y + d2 &&
    y + d2 <= N
  );
};

// 경계선 좌표 구하기
const getBoundaries = (x, y, d1, d2) => {
  const boundaries = [];
  // 문제에서 제시한 경계선의 위치 범위
  const boundaryLines = [
    [x, y, x + d1, y - d1],
    [x, y, x + d2, y + d2],
    [x + d1, y - d1, x + d1 + d2, y - d1 + d2],
    [x + d2, y + d2, x + d1 + d2, y + d2 - d1],
  ];

  boundaryLines.forEach((lines, index) => {
    if (index === 1 || index === 2) getIncreaseLines(boundaries, ...lines);
    else getDecreaseLines(boundaries, ...lines);
  });

  // 중복을 제거하고, 배열의 인덱스로 사용할 수 있도록 1 빼기
  return [...new Set(boundaries.join(" ").split(" "))].map((elem) => {
    return elem.split(",").map((number) => number - 1);
  });
};

const getDecreaseLines = (boundaries, sx, sy, ex, ey) => {
  while (sx <= ex || sy >= ey) {
    boundaries.push([sx, sy]);
    sx += 1;
    sy -= 1;
  }
};

const getIncreaseLines = (boundaries, sx, sy, ex, ey) => {
  while (sx <= ex || sy <= ey) {
    boundaries.push([sx, sy]);
    sx += 1;
    sy += 1;
  }
};

// 다섯번째 선거구 도시에 표시하기
const findFifthElection = (city, boundaries) => {
  const max = boundaries.reduce((acc, cur) => {
    return Math.max(acc, Math.max(...cur));
  }, 0);
  const array = Array.from(Array(max + 1), () => []);

  boundaries.forEach(([r, c]) => array[r].push(c));

  array.forEach((columns, row) => {
    if (!columns.length) return;

    // 해당 행에 열이 하나라면
    if (columns.length === 1) {
      city[row][columns] = 5;
      return;
    }

    // 열 값의 크기를 정렬
    columns.sort((a, b) => a - b);

    for (let i = columns[0]; i <= columns[1]; i++) {
      city[row][i] = 5;
    }
  });
};

// 나머지 선거구 도시에 표시
const findElections = (city, values) => {
  const [x, y, d1, d2] = values;
  // 각 선거구의 범위 조건
  const elections = [
    [1, 1, x + d1 - 1, y],
    [1, y + 1, x + d2, N, 2],
    [x + d1, 1, N, y - d1 + d2 - 1],
    [x + d2 + 1, y - d1 + d2, N, N],
  ];

  elections.forEach((election, index) =>
    findElection(city, ...election, index + 1)
  );
};

const findElection = (city, sr, sc, er, ec, election) => {
  for (let r = sr; r <= er; r++) {
    for (let c = sc; c <= ec; c++) {
      // 1, 3 번 선거구라면 5를 만나면 더이상 탐색할 필요 없음
      if ((election === 1 || election === 3) && city[r - 1][c - 1] === 5) break;
      // 2번 선거구면 5를 만나면 건너뚜기
      if (election === 2 && city[r - 1][c - 1] === 5) continue;
      // 4번 선거구라면 0이 아니면 건너뛰기
      if (election === 4 && city[r - 1][c - 1] !== 0) continue;

      // 각 선거구를 표시
      city[r - 1][c - 1] = election;
    }
  }
};

// 각 선거구의 인구수 구하기
const getCountsOfElection = (N, city, people) => {
  const counts = new Array(5).fill(0);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      add(counts, city[i][j], people[i][j]);
    }
  }

  return counts;
};

const add = (counts, value, people) => (counts[value - 1] += people);
```
