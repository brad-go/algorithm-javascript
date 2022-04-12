const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  input.pop();

  const dp = new Array(21);
  for (let i = 0; i < 21; i++) {
    dp[i] = new Array(21);
    for (let j = 0; j < 21; j++) {
      dp[i][j] = new Array(21).fill(0);
    }
  }

  const w = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
    if (dp[a][b][c]) return dp[a][b][c];
    if (a < b && b < c) {
      return (dp[a][b][c] =
        w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c));
    }

    return (dp[a][b][c] =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1));
  };

  for (line of input) {
    const [a, b, c] = line.split(" ").map((v) => +v);

    console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
  }
}

Solution(input);
