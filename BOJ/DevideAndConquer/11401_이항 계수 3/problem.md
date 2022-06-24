# 행렬 곱셈 - 2740

[문제 링크](https://www.acmicpc.net/problem/2740)

## 문제 풀이

수학에 대한 지식이 부족해서 풀이가 많이 어려웠다. 페르마의 소정리에 대한 글들을 찾아보면서 이 문제를 어떻게 해결할 수 있을까 생각했다.
수포자였기에 단어 하나하나 사전에 검색해가며 이해해야했다. 그래도 이정도까지는 아니었던 것 같은데...

### 풀이 설명

#### 페르마의 소정리

p는 소수 a와 p는 서로소(최대 공약수가 1일때) 일때 다음과 같은 식이 성립한다.

- a<sup>p</sup> ≡ a (mod p)
- a<sup>p-1</sup> ≡ 1 (mod p)
- a<sup>p-2</sup> ≡ a<sup>-1</sup> (mod p)

`≡`(합동)은 두 수가 p로 나눴을 때 나머지가 같다는 뜻이다.

#### 식 변환하기

우선 아래의 식을 위키백과를 통해 찾았다.

**<sub>n</sub>C<sub>k</sub> (mod p) = n! / (k!(n-k)!) (mod p)**

나눗셈을 -1번 제곱하는 것으로 변환하면 다음과 같다.

**<sub>n</sub>C<sub>k</sub> (mod p) = n!(k!(n-k)!)<sup>-1</sup> (mod p)**

페르마의 소정리에서 봤던 세가지 중 마지막을 사용하면 식은 다음과 같다.

**<sub>n</sub>C<sub>k</sub> (mod p) = n!(k!(n-k)!)<sup>p-2</sup> (mod p)**

알아볼 수 없던 식이 드디어 제곱식으로 바뀌었다. 이제 문제를 해결할 수 있을 것 같다.
거듭제곱을 분할 정복으로 구하는 코드는 [1629번 문제](../1629_%EA%B3%B1%EC%85%88/problem.md)에서 풀이해본적이 있다.

#### 풀이 과정

1. 페르마의 소정리를 이용해 <sub>n</sub>C<sub>k</sub>를 거듭제곱을 구하는식으로 변경해준다.
2. dp를 통해 <sub>n</sub>C<sub>k</sub>를 나타내는 팩토리얼을 만들어준다. (수가 크기 때문에, 함수를 통해 팩토리얼 값을 구해서 사용하면 메모리 초과가 난다.)
3. 거듭제곱 값을 구하기 위한 함수를 생성한다. 값이 크기 때문에 분할 정복법을 통해 함수를 구현한다.
4. 위에서 만든 식에 대입해서 값을 도출한다.

**참고로 BigInt를 사용하지 않으면 계산 결과가 이상하게 나오므로, BigInt를 사용해줘야 한다.**

### 전체 코드

```js
// prettier-ignore
const [N, K] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number);
const P = 1000000007;

const solution = (N, K, P) => {
  const factorial = new Array(N + 1).fill(BigInt(1));

  // nCk를 나타내기 위해 dp를 통해 팩토리얼 구하기
  for (let i = 2n; i < BigInt(N + 1); i++) {
    factorial[i] = (factorial[i - 1n] * i) % BigInt(P);
  }

  const numerator = factorial[N]; // 분자
  const denominator = (factorial[K] * factorial[N - K]) % BigInt(P); // 분모

  // prettier-ignore
  const answer = ((numerator % BigInt(P)) * pow(denominator, BigInt(P - 2), BigInt(P))) % BigInt(P);

  console.log(parseInt(answer));
};

const pow = (val, exp, mod) => {
  if (exp === BigInt(0)) return BigInt(1);

  const temp = pow(val, BigInt(parseInt(exp / BigInt(2))), mod);

  if (exp % BigInt(2) === BigInt(0)) return (temp * temp) % mod;
  return (val * temp * temp) % mod;
};

solution(N, K, P);
```
