# 15685. 드래곤 커브

## 문제 링크

https://www.acmicpc.net/problem/15685

## 문제 분류

: 구현

## 소요 시간

: 1시간 30분

## 풀이 방법

풀이 방법은 문제를 보자마자 명확하게 떠올랐지만, 코드로 구현을 못해서 시간이 좀 걸렸다. 사실 더 빨리 풀 수 있었지만, 반복문을 두 번 사용하기가 싫어서 해결 방법을 찾다가 시간이 좀 오래 걸렸다. 지금 문제 풀이는 드래곤 커브의 움직임에 대한 방향들을 모두 구한 후 격자에 표시하는 방식으로 풀이했지만, 원래는 방향을 구하는 것과 표시를 동시에 하고 싶었었다.

먼저 문제를 이해해야 한다. 주어진 입력의 드래곤 커브가 각 주어진 좌표에서 시작해 해당 세대까지 증가한다는 뜻이다. 처음에 이를 해당 세대에서 그 위치를 지나간다는 뜻인줄 알고 어려움을 겪었었다.

풀이에 대한 핵심 아이디어는 두가지다.

첫 번째는 입력받은 첫 좌표와 방향을 통해서 주어진 세대까지 탐색을 하는 것이다. 각 세대마다 기존 방향들을 배열에 담고, 기존 배열의 마지막 요소(방향)부터 처음까지 반시계 방향으로 회전시켜 배열에 뒤에 담아줘야 한다. 드래곤 커브를 그려보면 끝점을 기준으로 시계 방향으로 회전하지만 방향 자체로 보면 반시계 방향으로 회전하게 되기 때문이다.

다음은 정사각형의 개수를 세는 것이다. 드래곤 커브를 좌표가 아닌 2차원 배열로 나타내보면 쉽게 풀이할 수 있다. 각 지점들을 이차원 배열에 방문 표시를 하고, 이차원 배열의 채워진 부분에서 2 x 2 크기의 정사각형이 몇개인지 세면된다.

1. 격자판을 생성한다.
2. 드래곤 커브를 그리기 위해 시작 방향을 배열에 담고, 해당 배열의 길이만큼 뒤에서부터 각 배열 요소의 방향을 반시계 방향으로 회전시켜 배열에 push하는 것을 입력받은 세대만큼 반복한다.
3. 위에서 구한 방향들이 담긴 배열을 토대로 시작위치부터 각 방향으로 이동하면서 드래곤 커브를 그린다.
4. 격자판에서 2x2 크기의 정사각형의 개수를 센다.

## 풀이 코드

```js
const DR = [0, -1, 0, 1];
const DC = [1, 0, -1, 0];

const solution = (N, curves) => {
  // 격자판 생성
  const grid = Array.from(Array(101), () => Array(101).fill(0));

  // 입력받은 대로 드래곤 커브 그리기
  curves.forEach((curve) => drawCurve(grid, curve));

  return countSquareInGrid(grid);
};

const drawCurve = (grid, curve) => {
  // 시작 좌표, 시작 방향, 세대
  const [c, r, direction, generation] = curve;
  // 드래곤 커브의 이동방향 찾기
  const directions = findDirections(direction, generation);

  // 시작 위치 표시
  grid[r][c] = 1;

  let nr = r;
  let nc = c;

  // 이동 방향대로 드래곤 커브르 그리기
  directions.forEach((direction) => {
    nr += DR[direction];
    nc += DC[direction];

    grid[nr][nc] = 1;
  });
};

const findDirections = (direction, generation) => {
  // 드래곤 커브의 이동 방향들이 담길 배열
  const directions = [direction];

  // 0세대부터 입력받은 세대까지
  for (let i = 0; i < generation; i++) {
    // 기존 방향의 반대부터 반시계 방향으로 회전시켜 다음 세대의 방향들 구하기
    for (let j = directions.length - 1; j >= 0; j--) {
      directions.push((directions[j] + 1) % 4);
    }
  }

  return directions;
};

const countSquareInGrid = (grid) => {
  let count = 0;

  for (let i = 0; i < grid.length - 1; i++) {
    for (let j = 0; j < grid[0].length - 1; j++) {
      // 사각형인지 확인하고 개수 증가
      if (isSqaure(grid, i, j)) count += 1;
    }
  }

  return count;
};

// 현재 위치, 오른쪽, 아래, 오른쪽 아래의 대각선 위치가 모두 드래곤 커브라면 사각형
const isSqaure = (grid, r, c) => {
  return grid[r][c] && grid[r + 1][c] && grid[r][c + 1] && grid[r + 1][c + 1];
};
```
