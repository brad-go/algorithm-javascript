const n = +require("fs").readFileSync("./input.txt").toString().trim();

const solution = (n) => {
  const board = new Array(n).fill(0);
  const answer = { count: 0 };

  findPlacementMethod(n, board, 0, answer);

  return answer.count;
};

const findPlacementMethod = (n, board, row, answer) => {
  if (row === n) {
    answer.count++;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (board[row]) continue;

    board[row] = i;

    if (isPlaceable(board, row)) {
      findPlacementMethod(n, board, row + 1, answer);
    }

    board[row] = 0;
  }
};

const isPlaceable = (board, row) => {
  for (let i = 0; i < row; i++) {
    const isSameLine = board[row] === board[i];
    const isDiagonal = Math.abs(board[row] - board[i]) === row - i;

    if (isSameLine || isDiagonal) return false;
  }

  return true;
};

console.log(solution(n));
