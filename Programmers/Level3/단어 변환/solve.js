const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const begin = input[0];
const target = input[1];
const words = input[2].split(" ");

const solution = (begin, target, words) => {
  if (!new Set(words).has(target)) {
    return 0;
  }

  const queue = [[begin, 0]];

  while (queue.length) {
    const [current, depth] = queue.shift();

    if (current === target) {
      return depth;
    }

    words.forEach((word) => {
      if (isChangeable(current, word)) {
        queue.push([word, depth + 1]);
      }
    });
  }

  return 0;
};

const isChangeable = (word, target) => {
  const diff = [...word].filter((char, index) => char !== target[index]);

  return diff.length === 1;
};

console.log(solution(begin, target, words));
