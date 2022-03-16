const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

// 내 제출
// function Solution(input) {
//   const answer = input.sort((a, b) => a - b);
//   answer.forEach((num) => console.log(num));
// }

// Solution(input);

// 버블 정렬

function Solution(n, input) {
  const answer = [...input];

  for (let i = 0; i < n - 1; i++) {
    for (let j = n - 1; j > i; j--) {
      const temp = answer[j];
      if (answer[j] < answer[j - 1]) {
        answer[j] = answer[j - 1];
        answer[j - 1] = temp;
      }
    }
  }

  console.log(answer.join("\n"));
}

Solution(n, input);
