const weights = require('fs').readFileSync('./input.txt').toString().trim().split(' '); // prettier-ignore

const solution = (weights) => {
  const sorted = [...weights].sort((a, b) => b - a);
  const rates = [
    [1, 1],
    [2, 3],
    [2, 4],
    [3, 4],
  ];
  const store = {};

  let answer = 0;

  sorted.forEach((weight) => {
    rates.forEach(([a, b]) => {
      const key = (weight * b) / a;

      answer += store[key] || 0;
    });

    store[weight] = (store[weight] || 0) + 1;
  });

  return answer;
};

console.log(solution(weights));
