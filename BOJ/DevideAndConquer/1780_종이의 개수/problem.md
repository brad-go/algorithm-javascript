# 종이의 개수 - 1780

[문제 링크](https://www.acmicpc.net/problem/1780)

## 문제 풀이

### 풀이 설명

1. -1, 0, 1의 개수를 담을 counts 객체 생성
2. 종이가 하나의 수로 이루어졌는지 체크하고 아니라면 9등분으로 나누기
3. 각각의 나눠지는 종이에 사이즈가 1이거나 모두 같은 수일 때까지 재귀적으로 실행

### 전체 코드

```js
// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const paper = input.map((row) => row.split(" ").map(Number));
const counts = {
  "-1": 0,
  0: 0,
  1: 0,
};

const solution = (N, paper) => {
  devidePaper(0, 0, N, paper);

  console.log(counts[-1]);
  console.log(counts[0]);
  console.log(counts[1]);
};

const devidePaper = (x, y, size, paper) => {
  if (isSameNumbers(x, y, size, paper)) {
    counts[paper[x][y]]++;
    return;
  }

  const third = size / 3;

  for (let i = 0; i < 9; i++) {
    const auxX = Math.floor(i / 3) * third;
    const auxY = (i % 3) * third;

    devidePaper(x + auxX, y + auxY, third, paper);
  }
};

const isSameNumbers = (x, y, size, paper) => {
  const fiducialValue = paper[x][y];

  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== fiducialValue) return false;
    }
  }

  return true;
};

solution(N, paper);
```

### 코드 개선

- 1, 0, -1을 확인할 때 객체의 키를 가지고 확인했기에, 입력을 받을 때 숫자로 변경할 필요가 없었다. 이를 줄이니 크게 시간이 줄었다(거의 반).
- 출력(console.log)을 한 번으로 줄이니 약간 시간이 줄어들었다.
- 모두 같은 색인지 확인할 때, 기준값을 변수에 저장해서 사용하는 것이 조금이나마 효율적이었다.

```js
// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const paper = input.map((row) => row.split(" "));

const solution = (N, paper) => {
  const counts = {
    "-1": 0,
    0: 0,
    1: 0,
  };

  devidePaper(0, 0, N, paper, counts);

  console.log(counts[-1] + "\n" + counts[0] + "\n" + counts[1]);
};

const devidePaper = (x, y, size, paper, counts) => {
  if (isSameNumbers(x, y, size, paper)) {
    counts[paper[x][y]]++;
    return;
  }

  const third = size / 3;

  for (let i = 0; i < 9; i++) {
    const auxX = Math.floor(i / 3) * third;
    const auxY = (i % 3) * third;

    devidePaper(x + auxX, y + auxY, third, paper, counts);
  }
};

const isSameNumbers = (x, y, size, paper) => {
  const fiducialValue = paper[x][y];

  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== fiducialValue) return false;
    }
  }

  return true;
};

solution(N, paper);
```
