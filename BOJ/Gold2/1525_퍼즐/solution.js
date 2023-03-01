const board = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n').join('').replace(/\s/g, ''); // prettier-ignore

const solution = (board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[board, 0]];
  const visited = new Set();

  visited.add(board);

  while (queue.length) {
    const [currentBoard, count] = queue.shift();
    const [r, c] = findBlankIndicies(currentBoard);

    if (currentBoard === "123456780") return count;

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInBoard(nr, nc)) continue;

      const newBoard = moveBoard(currentBoard.split(""), r, c, nr, nc);

      if (visited.has(newBoard)) continue;

      visited.add(newBoard);
      queue.push([newBoard, count + 1]);
    }
  }

  return -1;
};

const findBlankIndicies = (board) => {
  const index = board.indexOf("0");

  return [Math.floor(index / 3), index % 3];
};

const isInBoard = (r, c) => 0 <= r && r < 3 && 0 <= c && c < 3;

const moveBoard = (board, r, c, nr, nc) => {
  const fromIndex = getStringIndex(r, c);
  const toIndex = getStringIndex(nr, nc);

  [board[fromIndex], board[toIndex]] = [board[toIndex], board[fromIndex]];

  return board.join("");
};

const getStringIndex = (r, c) => r * 3 + c;

console.log(solution(board));
