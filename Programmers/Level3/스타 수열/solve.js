const input = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(a) {
  let answer = 0;

  const selected = [];
  const nums = [];

  const getPairs = (nums) => {
    const pairs = [];
    for (let i = 0; i < nums.length; i += 2) {
      pairs.push([nums[i], nums[i + 1]]);
    }

    return pairs;
  };

  const hasIntersection = (pairs) => {
    const x = pairs[0][0];
    const y = pairs[0][1];

    const hasX = pairs.every((pair) => pair[0] === x || pair[1] === x);
    const hasY = pairs.every((pair) => pair[0] === y || pair[1] === y);

    return hasX || hasY;
  };

  const checkPairs = (pairs) => {
    return pairs.every((pair) => pair[0] !== pair[1]);
  };

  const isStarSequence = (nums) => {
    const pairs = getPairs(nums);

    if (nums.length < 4 || nums.length % 2 !== 0) return false;
    if (!hasIntersection(pairs)) return false;
    if (!checkPairs(pairs)) return false;

    return true;
  };

  const getSubsequence = (cnt, start, max) => {
    if (cnt === max) {
      if (isStarSequence(nums)) answer = Math.max(answer, nums.length);
      return;
    }

    for (let i = start; i < a.length; i++) {
      if (selected[i]) continue;

      selected[i] = true;
      nums[cnt] = a[i];
      getSubsequence(cnt + 1, i, max);
      selected[i] = false;
    }
  };

  for (let i = 1; i < a.length; i++) {
    getSubsequence(0, 0, i);
  }

  console.log(answer);
}

Solution(input);
