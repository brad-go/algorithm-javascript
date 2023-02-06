const [n, a, b] = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (n, a, b) => {
  let answer = 0;

  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }

  return answer;
};

console.log(solution(n, a, b));
