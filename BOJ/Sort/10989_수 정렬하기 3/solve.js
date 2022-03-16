const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

// 내 제출

function Solution(input) {
  const len = Math.max(...input);
  const count = new Array(len).fill(0);

  input.forEach((num) => count[num - 1]++);

  const answer = [];
  count.map((num, idx) => {
    const sortedNum = new Array(num).fill(idx + 1);
    answer.push(...sortedNum);
  });

  console.log(answer.join("\n"));
}

Solution(input);

// 카운팅 정렬
// 시간복잡도가 n인 엄청 빠른 알고리즘
// 하나의 배열을 만들고, 정렬하고 싶은 배열의 숫자에 해당하는 자리에 수를 더해주는 것.
