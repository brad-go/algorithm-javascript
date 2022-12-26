const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const array = input[0].split(" ").map(Number);
const commands = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (array, commands) => {
  return commands.map(([start, end, index]) => {
    const newArray = array.slice(start - 1, end).sort((a, b) => a - b);
    return newArray[index - 1];
  });
};

console.log(solution(array, commands));
