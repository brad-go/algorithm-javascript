// prettier-ignore
const [A, B, C] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(BigInt);

const solution = (A, B, C) => {
  const result = pow(A, B, C);
  console.log(parseInt(result));
};

const pow = (val, exp, mod) => {
  if (exp === BigInt(0)) return BigInt(1);

  const temp = pow(val, BigInt(parseInt(exp / BigInt(2))), mod);

  if (exp % BigInt(2) === BigInt(0)) return (temp * temp) % mod;
  return (val * temp * temp) % mod;
};

solution(A, B, C);
