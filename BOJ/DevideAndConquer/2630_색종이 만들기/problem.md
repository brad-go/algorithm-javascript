# 색종이 만들기 - 2630

[문제 링크](https://www.acmicpc.net/problem/2630)

## 문제 풀이

어떤 방식으로 풀어야 접근해야 할지 몰라서 떠오르는 대로 풀이했는데, 다행히 쉽게 풀 수 있었다.

### 풀이 설명

생각한 풀이는 다음과 같다.

1. 색종이의 색을 체크하는 함수를 만든다.
2. 색종이를 나누는 함수를 재귀적으로 수행하면서 색종이의 색을 체크한다.
3. 하나이거나 하나의 색깔로 이루어진 색종이가 되면 배열에 해당 색종이의 색을 집어넣고 종료한다.

### 전체 코드

```js
// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const map = input.map((row) => row.split(" ").map(Number));

const solution = (N, map) => {
  const paperColors = [];

  devidePaper(map, paperColors);

  const whitePaperCount = paperColors.filter((color) => color === 0).length;
  const bluePaperConnt = paperColors.filter((color) => color === 1).length;

  console.log(whitePaperCount);
  console.log(bluePaperConnt);
};

const devidePaper = (map, paperColors) => {
  const middleIndex = Math.floor(map.length / 2);
  const pivotColor = map[0][0];

  if (checkColor(map, pivotColor) || map.length <= 1) {
    paperColors.push(pivotColor);
    return;
  }

  const leftTop = Array.from({ length: middleIndex }, () =>
    Array.from({ length: middleIndex }, () => [])
  );
  const rightTop = Array.from({ length: middleIndex }, () =>
    Array.from({ length: middleIndex }, () => [])
  );
  const leftBottom = Array.from({ length: middleIndex }, () =>
    Array.from({ length: middleIndex }, () => [])
  );
  const rightBottom = Array.from({ length: middleIndex }, () =>
    Array.from({ length: middleIndex }, () => [])
  );

  for (let i = 0; i < middleIndex; i++) {
    for (let j = 0; j < middleIndex; j++) {
      leftTop[i][j] = map[i][j];
      rightTop[i][j] = map[i][j + middleIndex];
      leftBottom[i][j] = map[i + middleIndex][j];
      rightBottom[i][j] = map[i + middleIndex][j + middleIndex];
    }
  }

  devidePaper(leftTop, paperColors);
  devidePaper(rightTop, paperColors);
  devidePaper(leftBottom, paperColors);
  devidePaper(rightBottom, paperColors);
};

const checkColor = (map, pivotColor) => {
  let isSame = true;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] !== pivotColor) {
        isSame = false;
        break;
      }
    }
  }

  return isSame;
};

solution(N, map);
```

### 코드 개선

코드의 양을 훨씬 줄였다. 위의 풀이는 매번 devidePaper 함수가 재귀적으로 일어날 때마다, 2차원 배열을 4개씩 각각 생성해야했다. 그러나 아래의 코드는 x, y라는 포인터를 이용해서 paper를 참조하고, 그를 통해 새 배열을 만들지 않고 색종이의 개수를 찾아낼 수 있었다.

```js
// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const paper = input.map((row) => row.split(" ").map(Number));

const solution = (N, paper) => {
  const paperColors = {
    white: 0,
    blue: 0,
  };

  dividePaper(0, 0, N, paper, paperColors);
  console.log(paperColors.white);
  console.log(paperColors.blue);
};

const dividePaper = (x, y, size, paper, paperColors) => {
  if (checkColor(x, y, size, paper)) {
    paper[x][y] === 0 ? paperColors.white++ : paperColors.blue++;
    return;
  }

  const half = size / 2;

  dividePaper(x, y, half, paper, paperColors);
  dividePaper(x, y + half, half, paper, paperColors);
  dividePaper(x + half, y, half, paper, paperColors);
  dividePaper(x + half, y + half, half, paper, paperColors);
};

const checkColor = (x, y, size, paper) => {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== paper[x][y]) return false;
    }
  }

  return true;
};

solution(N, paper);
```
