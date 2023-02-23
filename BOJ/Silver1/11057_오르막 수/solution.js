const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +require("fs").readFileSync(filePath).toString().trim();

const solution = (N) => {
  const dp = Array.from(Array(N + 1), () => Array(10).fill(1));
  const mod = 10007;

  for (let i = 2; i <= N; i++) {
    dp[i][9] = dp[i - 1][9] % mod;

    for (let j = 8; j >= 0; j--) {
      dp[i][j] = (dp[i - 1][j] + dp[i][j + 1]) % mod;
    }
  }

  return dp[N].reduce((acc, cur) => acc + cur, 0) % mod;
};

console.log(solution(N));
