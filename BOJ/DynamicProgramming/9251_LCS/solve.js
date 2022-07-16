const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const chars = input.map((str) => str.split(""));
  const n = chars[0].length;
  const m = chars[1].length;

  const LCS = Array.from(Array(n + 1), () => Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    const curChar = chars[0][i - 1];

    for (let j = 1; j < m + 1; j++) {
      const compareChar = chars[1][j - 1];
      LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);

      if (curChar === compareChar) LCS[i][j] = LCS[i - 1][j - 1] + 1;
    }
  }

  console.log(LCS[n][m]);
}

Solution(input);
