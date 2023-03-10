# 16234. 인구 이동

## 문제 링크

https://www.acmicpc.net/problem/16234

## 문제 분류

: 구현, 그래프, 너비 우선 탐색

## 소요 시간

: 1시간

## 풀이 방법

각 나라의 인구가 주어졌을 때, 인구 이동이 며칠동안 발생하는지 구하는 문제였다.

이 문제는 다음과 같이 풀이할 수 있다.

1. 모든 나라를 탐색하면서 BFS로 연합 찾기(탐색 조건은 인구차이가 L이상, R이하인 곳)
2. 연합을 이룬 나라의 수와 총 인구수를 구해서 해당 연합 국가들의 인구수를 평균으로 갱신한다.
3. 인구 이동이 없을 때까지 위를 반복한다.

## 풀이 코드

```js
const solution = (N, L, R, nations) => {
  // 인구 이동이 지속된 날
  let day = 0;

  while (true) {
    // 이전 국가
    const prevNations = nations.map((row) => [...row]);
    const visited = Array.from(Array(N), () => Array(N).fill(false));

    // 모든 나라를 탐색
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // 이미 연합된 나라면 건너뛰기
        if (visited[i][j]) continue;

        // 현재 나라를 기준으로 연합 국가 찾기
        findUnitedNations(N, L, R, nations, visited, i, j);
      }
    }

    // 인구의 변화가 없었다면 종료
    if (isNoMoreMovingPopulations(nations, prevNations)) break;

    visited.fill(false);
    day++;
  }

  return day;
};

const findUnitedNations = (N, L, R, nations, visited, sr, sc) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = [[sr, sc]];
  // 연합한 나라들의 위치와 수, 인구수를 담을 객체
  const united = {
    nations: [[sr, sc]],
    count: 1,
    population: nations[sr][sc],
  };

  visited[sr][sc] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      // 범위를 벗어나지 않고, 국경선을 공유할 수 있으며 연합이 아닌 곳이라면
      if (
        !isInLand(N, nr, nc) ||
        !canShareBorder(L, R, nations[r][c], nations[nr][nc]) ||
        visited[nr][nc]
      )
        return;

      // 연합하기
      visited[nr][nc] = true;
      united.population += nations[nr][nc];
      united.count += 1;
      united.nations.push([nr, nc]);

      // 연합한 나라를 기준으로 다른 연합 국가 찾기
      queue.push([nr, nc]);
    });
  }

  // 연합 국가들을 기준으로 인구를 평균으로 이동시키기
  movePopulation(united);
};

const isInLand = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const canShareBorder = (L, R, a, b) => {
  const diff = Math.abs(a - b);

  return L <= diff && diff <= R;
};

const movePopulation = (united) => {
  const populationOfUnites = Math.floor(united.population / united.count);

  united.nations.forEach(([r, c]) => (nations[r][c] = populationOfUnites));
};

// 이전 국가들의 상태와 현재 국가들의 상태를 비교해서 변화가 없는지 확인
const isNoMoreMovingPopulations = (nations, prevNations) => {
  return nations.every((row, rowIndex) => {
    return row.every(
      (nation, columnIndex) => nation === prevNations[rowIndex][columnIndex]
    );
  });
};
```
