const filePath = process.platform == "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim(); // prettier-ignore

const solution = (input) => {
  const chars = [...input];
  const reversedChars = [...input.split("").reverse()];
  const isPalindrome = chars.every(
    (char, index) => char == reversedChars[index]
  );

  return isPalindrome ? 1 : 0;
};

console.log(solution(input));
