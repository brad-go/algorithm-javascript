const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const n = +input[0];
const words = input[1].split(" ");

const solution = (n, words) => {
  const index = words.findIndex((word, index, origin) => {
    if (index < 1) return;

    const lastWord = origin[index - 1];
    const lastChar = lastWord[lastWord.length - 1];

    return origin.indexOf(word) !== index || lastChar !== word[0];
  });

  return [(index % n) + 1, Math.ceil((index + 1) / n)];
};

console.log(solution(n, words));
