const [n, k] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (n, k) => {
  const numbers = n.toString(k).split("0").map(Number);

  return numbers.filter(isPrime).length;
};

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }

  return true;
};

console.log(solution(n, k));
