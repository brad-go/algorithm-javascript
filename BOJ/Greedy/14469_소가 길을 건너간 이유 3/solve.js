// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const cows = input.map((line) => line.split(" ").map(Number));

function solution(cows) {
  cows.sort((a, b) => a[0] - b[0]); // 도착 시간 기준으로 정렬

  const totalTime = cows.reduce((totalTime, [arrivalTime, checkTime]) => {
    if (arrivalTime <= totalTime) return totalTime + checkTime;
    return arrivalTime + checkTime;
  }, 0);

  return totalTime;
}

console.log(solution(cows));
