const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(words) {
  const uniqueWords = words.filter((word, idx) => {
    return words.indexOf(word) === idx;
  });

  const sortedWords = uniqueWords.sort().sort((curWord, prevWord) => {
    if (curWord.length !== prevWord.length) {
      return curWord.length - prevWord.length;
    }
  });

  let result = "";
  sortedWords.forEach((word) => {
    result += `${word}\n`;
  });
  console.log(result.trim());
}

Solution(input);
