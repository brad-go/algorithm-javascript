const [n, m, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, m, cards) {
  const MAX_SELECT_COUNT = 3;

  const selected = new Array(n);
  const nums = new Array(MAX_SELECT_COUNT);

  let answer = 0;

  const makeCloseM = (answer, nums) => {
    const sum = nums.reduce((acc, cur) => acc + cur, 0);

    if (sum > m) return answer;
    if (sum === m) return sum;

    if (sum > answer) return sum;
    else return answer;
  };

  const comb = (cnt, start) => {
    if (cnt === MAX_SELECT_COUNT) {
      answer = makeCloseM(answer, nums);
      return;
    }

    for (let i = start; i < n; i++) {
      if (selected[i]) continue;

      selected[i] = true;
      nums[cnt] = cards[i];
      comb(cnt + 1, i);
      selected[i] = false;
    }
  };

  comb(0, 0);
  console.log(answer);
}

Solution(n, m, input);
