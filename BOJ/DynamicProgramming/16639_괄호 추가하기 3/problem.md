# 괄호 추가하기 3 - 16639

[문제 링크](https://www.acmicpc.net/problem/16639)

## 문제 풀이

2차원 배열로 dp를 선언해서 각 단계의 연산을 저장한다는 아이디어는 떠올렸지만, 문제를 풀이하지 못했다. 그래서
[여기](https://ddb8036631.github.io/boj/16639_%EA%B4%84%ED%98%B8-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0-3/)를 참고해서 문제를 풀이할 수 있었다.

### 풀이 설명

1. N \* N 크기의 2차원 배열의 dp를 각 연산의 최댓값을 담을 max 배열과, 각 연산의 최솟값을 담을 min 배열로 선언한다.
2. 입력받은 수식을 순회하면서 숫자라면 max배열과 min배열의 대각선으로 채워준다. `max[i][i]`, `min[i][i]`
3. 반복문을 돌면서 두 숫자에 대한 연산 결과를 채워나간다. 각 인덱스는 2씩 증가하며, 인덱스의 값은 (max, max), (max, min), (min, max), (min, min) 배열의 인덱스에 해당하는 값에 대한 연산을 통해 괄호를 친 것과 같은 연산을 수행한다.

### 전체 코드

```js
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const N = Number(input[0]);
const expression = input[1];

const PLUS = "+";
const MINUS = "-";

function solution(N, expression) {
  const max = Array.from(Array(N), () => Array(N).fill(Number.MIN_SAFE_INTEGER)); // prettier-ignore
  const min = Array.from(Array(N), () => Array(N).fill(Number.MAX_SAFE_INTEGER)); // prettier-ignore

  for (let i = 0; i < N; i++) {
    if (isNum(expression[i])) max[i][i] = min[i][i] = Number(expression[i]);
  }

  for (let j = 2; j < N; j += 2) {
    for (let i = 0; i < N - j; i += 2) {
      for (let k = 2; k <= j; k += 2) {
        const temp = new Array(4).fill(null);

        temp[0] = calc(min[i][i + k - 2], min[i + k][i + j], expression[i + k - 1]); // prettier-ignore
        temp[1] = calc(min[i][i + k - 2], max[i + k][i + j], expression[i + k - 1]); // prettier-ignore
        temp[2] = calc(max[i][i + k - 2], min[i + k][i + j], expression[i + k - 1]); // prettier-ignore
        temp[3] = calc(max[i][i + k - 2], max[i + k][i + j], expression[i + k - 1]); // prettier-ignore

        temp.sort((a, b) => a - b);

        min[i][i + j] = Math.min(min[i][i + j], temp[0]);
        max[i][i + j] = Math.max(max[i][i + j], temp[3]);
      }
    }
  }

  return max[0][N - 1];
}

const isNum = (char) => {
  char = char.trim();
  if (char === "" || isNaN(char)) return false;
  return true;
};

const calc = (num1, num2, operator) => {
  if (operator === PLUS) return num1 + num2;
  else if (operator === MINUS) return num1 - num2;
  else return num1 * num2;
};

console.log(solution(N, expression));
```
