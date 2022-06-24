// prettier-ignore
const [N, K] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number);
const P = 1000000007;

const solution = (N, K, P) => {
  const factorial = new Array(N + 1).fill(BigInt(1));

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
