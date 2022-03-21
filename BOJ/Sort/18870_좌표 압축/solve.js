const [n, input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출
function Solution(n, input) {
  const nums = input.split(" ").map((v) => +v);

  let result = "";
  for (let i = 0; i < n; i++) {
    let lowNumbers = "";
    let count = 0;

    for (let j = 0; j < n; j++) {
      if (nums[i] > nums[j]) lowNumbers += `${nums[j]} `;
    }

    const compareResults = lowNumbers.trim().split(" ").length;
    if (lowNumbers !== "" && lowNumbers.trim().split(" ").length)
      count = compareResults;

    result += `${count} `;
  }
  console.log(result.trim());
}

Solution(n, input);
