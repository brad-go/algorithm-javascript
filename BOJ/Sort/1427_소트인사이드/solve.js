// 내 제출 - 제일 빠름

// const input = require("fs")
//   // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
//   .readFileSync("./input4.txt")
//   .toString()
//   .trim();

// function Solution(input) {
//   if (!input) return;
//   const seperatedNums = input.split("").map((v) => +v);
//   const sortedNums = seperatedNums.sort((a, b) => b - a);
//   console.log(sortedNums.join(""));
// }

// Solution(input);

// 선택 정렬 - 내림차순이니까 최댓값을 찾는 방법으로 구현, 메모리 제일 적게 소모

const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("")
  .map((v) => +v);

function Solution(input) {
  for (let i = 0; i < input.length; i++) {
    let maxIdx = i;

    for (let j = i + 1; j < input.length; j++) {
      if (input[maxIdx] < input[j]) {
        maxIdx = j;
      }
    }

    if (maxIdx !== i) {
      const max = input[maxIdx];
      input[maxIdx] = input[i];
      input[i] = max;
    }
  }
  console.log(input.join(""));
}

Solution(input);
