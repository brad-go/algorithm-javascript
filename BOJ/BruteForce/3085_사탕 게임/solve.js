const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const board = input.map((line) => line.split(""));

  let ans = 0;

  const validateMatrix = (board) => {
    let max = 0;

    for (let i = 0; i < n; i++) {
      let count = 1;
      let memo = 0;
      for (let j = 0; j < n - 1; j++) {
        if (board[j][i] === board[j + 1][i]) {
          count++;
          memo = Math.max(memo, count);
        }
        if (board[j][i] !== board[j + 1][i]) count = 1;
      }
      max = Math.max(max, memo);
    }

    for (let i = 0; i < n; i++) {
      let count = 1;
      let memo = 0;
      for (let j = 0; j < n - 1; j++) {
        if (board[i][j] === board[i][j + 1]) {
          count++;
          memo = Math.max(memo, count);
        }
        if (board[i][j] !== board[i][j + 1]) count = 1;
      }
      max = Math.max(max, memo);
    }

    return max;
  };

  loop: for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (board[i][j] !== board[i][j + 1]) {
        const temp1 = board[i][j];
        board[i][j] = board[i][j + 1];
        board[i][j + 1] = temp1;

        ans = Math.max(ans, validateMatrix(board));

        if (ans === n) break loop;

        const temp2 = board[i][j];
        board[i][j] = board[i][j + 1];
        board[i][j + 1] = temp2;
      }

      if (board[j][i] !== board[j + 1][i]) {
        const temp1 = board[j][i];
        board[j][i] = board[j + 1][i];
        board[j + 1][i] = temp1;

        ans = Math.max(ans, validateMatrix(board));

        if (ans === n) break loop;

        const temp2 = board[j][i];
        board[j][i] = board[j + 1][i];
        board[j + 1][i] = temp2;
      }
    }
  }
  console.log(ans);
}

Solution(Number(n), input);
