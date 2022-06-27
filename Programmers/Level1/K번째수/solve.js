const array = [1, 5, 2, 6, 3, 7, 4];
const commands = [
  [2, 5, 3],
  [4, 4, 1],
  [1, 7, 3],
];

function solution(array, commands) {
  return commands.map(([startIndex, endIndex, index]) => {
    const newArray = array.slice(startIndex - 1, endIndex).sort((a, b) => a - b); // prettier-ignore
    return newArray[index - 1];
  });
}

console.log(solution(array, commands));
