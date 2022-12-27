const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const numbers = input[0].split(" ").map(Number);
const target = +input[1];

const solution = (numbers, target) => {
  let count = 0;

  const searchNumbers = (current, index) => {
    if (index === numbers.length) {
      count += current === target ? 1 : 0;
      return;
    }

    searchNumbers(current + numbers[index], index + 1);
    searchNumbers(current - numbers[index], index + 1);
  };

  searchNumbers(0, 0);

  return count;
};

console.log(solution(numbers, target));
