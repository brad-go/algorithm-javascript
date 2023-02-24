const solution = (board) => {
  const counts = countOXMarks(board);
  const bingo = findWinningMark(board);

  if (counts.O < counts.X || counts.O - counts.X > 1) return 0;
  if (bingo.O && bingo.X) return 0;
  if (bingo.O && counts.X >= counts.O) return 0;
  if (bingo.X && counts.O > counts.X) return 0;

  return 1;
};

const countOXMarks = (board) => {
  const counts = { O: 0, X: 0 };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === ".") continue;

      counts[board[i][j]]++;
    }
  }

  return counts;
};

const findWinningMark = (board) => {
  const bingoIndicies = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const bingo = { O: 0, X: 0 };

  bingoIndicies.forEach((indicies) => {
    let mark;
    let count = 1;

    for (let i = 0; i < indicies.length; i++) {
      const x = Math.floor(indicies[i] / 3);
      const y = indicies[i] % 3;

      if (board[x][y] === ".") break;

      if (i === 0) {
        mark = board[x][y];
        continue;
      }

      count += mark === board[x][y] ? 1 : 0;
    }

    if (count === 3) bingo[mark]++;
  });

  return bingo;
};

console.log(solution(["O.X", ".O.", "..X"]));
console.log(solution(["OOO", "...", "XXX"]));
console.log(solution(["...", ".X.", "..."]));
console.log(solution(["...", "...", "..."]));
