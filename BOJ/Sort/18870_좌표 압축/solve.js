const [n, input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출
function Solution(n, input) {
  const nums = input.split(" ").map((v) => +v);
  const set = new Set(nums);
  const unique = [...set].sort((a, b) => a - b);

  const numbers = {};
  unique.forEach((num, idx) => (numbers[num] = idx));

  for (let i = 0; i < n; i++) {
    nums[i] = numbers[nums[i]];
  }

  console.log(nums.join(" "));
}

Solution(n, input);
