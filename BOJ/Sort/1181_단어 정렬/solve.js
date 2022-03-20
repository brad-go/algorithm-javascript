const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

// function Solution(words) {
//   const uniqueWords = words.filter((word, idx) => {
//     return words.indexOf(word) === idx;
//   });

//   const sortedWords = uniqueWords.sort().sort((a, b) => a.length - b.length);
//   console.log(sortedWords.join("\n"));
// }

// Solution(input);

// Solution 2

// function Solution(n, words) {
//   const sorted = [];
//   const wordsLength = words.map((word) => word.length);
//   const max = Math.max(...wordsLength);
//   const min = Math.min(...wordsLength);

//   for (let i = min; i <= max; i++) {
//     const group = [];
//     for (let j = 0; j < n; j++) {
//       if (input[j].length === i) {
//         if (group.indexOf(input[j]) === -1) group.push(input[j]);
//       }
//     }

//     if (group.length > 1) {
//       sorted.push(...group.sort());
//       continue;
//     }
//     sorted.push(...group);
//   }
//   console.log(sorted.join("\n"));
// }

// Solution(n, input);

// Solution 3

function Solution(words) {
  const sortedWords = words.sort(
    (a, b) => a.length - b.length || a.localeCompare(b)
  );
  const uniqueWords = new Set(sortedWords);
  console.log(Array.from(uniqueWords).join("\n"));
}

Solution(input);
