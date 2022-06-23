# 곱셉 - 1629

[문제 링크](https://www.acmicpc.net/problem/1629)

## 문제 풀이

BigInt를 사용하지 않고, 풀이할 수 있지 않을까 했는데, 실패해서 사용해서 풀이했다.

처음에는 그대로 곱해서는 당연히 풀 수 없었고, dp를 이용해서 풀 수 있을 것 같았다. 1부터 B까지 지수 값을 구한 값을 dp배열에 넣어서 풀려고 했는데, 메모리 초과가 났다.
그래서 다른 방식을 찾아보던 중, 한 수학 공식을 찾게 되었다.

`A^4 = A^(2+2) = (A^2)^2`

위의 공식을 이용한다면 제곱을 구해내는 함수를 만들어서 문제를 풀이할 수 있다. 재귀 함수를 통해 log시간으로 시간 복잡도를 줄일 수 있기 때문이다.

### 풀이 설명

B가 짝수일 때와 홀수일 때에 따라서 구하는 식을 달리해야 한다. 예를 들어

- B가 4일 때(B가 짝수): A^4 = (A^2)^2
- B가 5일 때(B가 홀수): A^5 = A _ A^4 = A _ (A^2)^2

이렇게 식을 구할 수 있다.

문제의 예시에 이를 대입하면 다음과 같다.

`10^11 = 10 * 10^10 = 10 * (10^2)^5 = 10 * 10^2 * (10^2)^4 = 10 * 10^2 * ((10^2)^2)^2`

이런식으로 연산의 횟수를 상당히 크게 줄일 수 있다.

### 전체 코드

```js
// prettier-ignore
const [A, B, C] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(BigInt);

const solution = (A, B, C) => {
  const result = pow(A, B, C);
  console.log(parseInt(result));
};

const pow = (val, exp, mod) => {
  if (exp === BigInt(0)) return BigInt(1);

  const temp = pow(val, BigInt(parseInt(exp / BigInt(2))), mod);

  if (exp % BigInt(2) === BigInt(0)) return (temp * temp) % mod; // 짝수일 때
  return (val * temp * temp) % mod; // 홀수일 때
};

solution(A, B, C);
```
