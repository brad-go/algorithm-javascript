const [lottos, win_nums] = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((arr) => arr.split(" ").map((v) => +v));

function Solution(lottos, win_nums) {
  const TOTAL_NUMS_COUNT = 6;
  const UNRECOG_NUMS_COUNT = lottos.filter((num) => num === 0).length;
  const RANK = new Array(TOTAL_NUMS_COUNT)
    .fill()
    .map((_, idx) => idx + 1)
    .reverse();

  const match_nums = [];

  for (let i = 0; i < TOTAL_NUMS_COUNT; i++) {
    if (win_nums.includes(lottos[i]) && !match_nums.includes(lottos[i])) {
      match_nums.push(lottos[i]);
    }
  }

  const highest = match_nums.length + UNRECOG_NUMS_COUNT - 1;
  const lowest = match_nums.length ? match_nums.length - 1 : match_nums.length;

  const answer = [RANK[highest], RANK[lowest]];
  console.log(answer);
}

Solution(lottos, win_nums);
