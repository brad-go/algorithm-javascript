const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const N = Number(n);
  const pole = input.map((line) => line.split(" ").map((v) => +v));
  let count = 0;

  while (true) {
    const dp = new Array(N).fill(0);

    for (let i = 0; i < N; i++) {
      const cur = pole[i];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const compare = pole[j];
        if (compare[0] > cur[0] && compare[1] < cur[1]) dp[i]++;
        if (compare[0] < cur[0] && compare[1] > cur[1]) dp[i]++;
      }
    }

    let maxIdx = dp.indexOf(Math.max(...dp));
    pole[maxIdx] = [0, 0];

    if (!Math.max(...dp)) break;
    count++;
  }

  console.log(count);
}

Solution(n, input);
