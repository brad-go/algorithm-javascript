const [lottos, win_nums] = require("fs")
  .readFileSync("./input5.txt")
  .toString()
  .trim()
  .split("\n")
  .map((arr) => arr.split(" ").map((v) => +v));

function Solution(lottos, win_nums) {
  // 총 숫자
  const TOTAL_NUMS_COUNT = 6;
  // 0으로 입력받은 알 수 없는 수
  const UNRECOG_NUMS_COUNT = lottos.filter((num) => num === 0).length;
  // 맞춘 수에 따른 랭킹을 담은 배열
  const RANK = new Array(TOTAL_NUMS_COUNT)
    .fill()
    .map((_, idx) => idx + 1)
    .reverse();
  // 일치하는 수
  const match_nums = [];

  for (let i = 0; i < TOTAL_NUMS_COUNT; i++) {
    if (win_nums.includes(lottos[i]) && !match_nums.includes(lottos[i])) {
      match_nums.push(lottos[i]);
    }
  }

  const highest = match_nums.length + UNRECOG_NUMS_COUNT - 1;
  const lowest = match_nums.length - 1;

  const answer = [
    RANK[highest < 0 ? 0 : highest],
    RANK[lowest < 0 ? 0 : lowest],
  ];

  console.log(answer);
}

Solution(lottos, win_nums);
