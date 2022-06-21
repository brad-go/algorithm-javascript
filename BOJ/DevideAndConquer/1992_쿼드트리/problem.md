# 쿼드트리 - 1992

[문제 링크](https://www.acmicpc.net/problem/1992)

## 문제 풀이

색종이 만들기 문제와 비슷한 문제였다.

### 풀이 설명

생각한 풀이는 다음과 같다.

1. 전체 결과를 담을 빈 문자열 생성
2. 영상의 주어진 부분을 체크하는 함수를 만든다.
3. 주어진 부분을 압축하는 함수 생성
4. 영상의 데이터가 하나로 이루어져있거나 size가 1이라면 전체 결과에 현재 데이터 추가
5. 아니라면 영상을 4등분해서 재귀적으로 위 과정을 4의 과정을 수행하는데, 이 결과를 괄호로 감싸준다.

### 전체 코드

```js
// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const map = input.map((row) => row.split("").map((v) => +v));
let result = "";

const solution = (N, map) => {
  compress(0, 0, N, map);
  console.log(result);
};

const compress = (x, y, size, map) => {
  if (checkData(x, y, size, map) || size <= 1) {
    result += map[x][y];
    return;
  }

  const half = size / 2;

  result += "(";

  compress(x, y, half, map);
  compress(x, y + half, half, map);
  compress(x + half, y, half, map);
  compress(x + half, y + half, half, map);

  result += ")";
};

const checkData = (x, y, size, map) => {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (map[i][j] !== map[x][y]) return false;
    }
  }
  return true;
};

solution(N, map);
```

### 코드 개선

영상을 나타내는 2차원 배열 map을 매개변수로 전달하지 않고, 전역변수로 참조하게 했더니 메모리는 물론, 시간이 2/3으로 줄었다.

```js
// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const map = input.map((row) => row.split("").map((v) => +v));
let result = "";

const solution = (N) => {
  compress(0, 0, N);
  console.log(result);
};

const compress = (x, y, size) => {
  if (size === 1 || checkData(x, y, size)) {
    result += map[x][y];
    return;
  }

  const half = size / 2;

  result += "(";

  compress(x, y, half);
  compress(x, y + half, half);
  compress(x + half, y, half);
  compress(x + half, y + half, half);

  result += ")";
};

const checkData = (x, y, size) => {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (map[i][j] !== map[x][y]) return false;
    }
  }
  return true;
};

solution(N);
```
