const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const N = Number(input[0]);
const expression = input[1];

const PLUS = "+";
const MINUS = "-";

function solution(N, expression) {
  const max = Array.from(Array(N), () => Array(N).fill(0)); // prettier-ignore
  const min = Array.from(Array(N), () => Array(N).fill(0)); // prettier-ignore

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
