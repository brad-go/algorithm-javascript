const N = +require("fs").readFileSync("./input.txt").toString().trim();

const solution = (N) => {
  let batteryUsage = 0;

  while (N > 0) {
    batteryUsage += N % 2;
    N = Math.floor(N / 2);
  }

  return batteryUsage;
};

console.log(solution(N));
