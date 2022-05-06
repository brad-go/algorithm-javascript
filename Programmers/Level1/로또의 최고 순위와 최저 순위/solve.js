const [lottos, win_nums] = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((arr) => arr.split(" ").map((v) => +v));

// 다른 풀이

function Solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  // includes를 사용했기에 걱정했지만, 두개 이상의 같은 수는 없다고 문제에 나와있음
  const minCount = lottos.filter((v) => win_nums.includes(v)).length;
  const zeroCount = lottos.filter((v) => !v).length;
  const maxCount = minCount + zeroCount;

  const answer = [rank[maxCount], rank[minCount]];
  console.log(answer);
}

Solution(lottos, win_nums);

// 내 풀이

// function Solution(lottos, win_nums) {
//   // 총 숫자
//   const TOTAL_NUMS_COUNT = 6;
//   // 0으로 입력받은 알 수 없는 수
//   const UNRECOG_NUMS_COUNT = lottos.filter((num) => num === 0).length;
//   // 맞춘 수에 따른 랭킹을 담은 배열
//   const RANK = new Array(TOTAL_NUMS_COUNT)
//     .fill()
//     .map((_, idx) => idx + 1)
//     .reverse();
//   // 일치하는 수
//   const match_nums = [];

//   for (let i = 0; i < TOTAL_NUMS_COUNT; i++) {
//     if (win_nums.includes(lottos[i]) && !match_nums.includes(lottos[i])) {
//       match_nums.push(lottos[i]);
//     }
//   }

//   const highest = match_nums.length + UNRECOG_NUMS_COUNT - 1;
//   const lowest = match_nums.length - 1;

//   const answer = [
//     RANK[highest < 0 ? 0 : highest],
//     RANK[lowest < 0 ? 0 : lowest],
//   ];

//   console.log(answer);
// }

// Solution(lottos, win_nums);
