const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(n, input) {
  if (!input) return;

  const arr = input.sort((a, b) => a - b);

  const avg = Math.round(arr.reduce((acc, cur) => acc + cur, 0) / n);
  console.log(avg === -0 ? 0 : avg);

  const median = arr[Math.floor(n / 2)];
  console.log(median);

  const mode = [];
  const count = arr.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const majority = Math.max(...Object.values(count));
  for (let item in count) {
    count[item] === majority && mode.push(Number(item));
  }

  const sortedMode = mode.sort((a, b) => a - b);
  console.log(Number(mode.length > 1 ? sortedMode[1] : sortedMode[0]));

  const range = arr[n - 1] - arr[0];
  console.log(range);
}

Solution(n, input);

// 통계학 수 처리

// 산술평균: 평균
// 중앙값: n개의 수 증가 순서로 나열 시 중앙값
// 최빈값: n개의 수 중 가장 많이 나타나는 값
// 범위: n개의 수 중 최댓값과 최솟값의 차
