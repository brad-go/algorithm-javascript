const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const blocks = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (blocks) => {
  const [rows, columns] = [10, 4];
  const boards = {
    green: createBoard(rows, columns),
    blue: createBoard(rows, columns),
  };

  let totalScore = 0;

  blocks.forEach((block) => {
    const currentBlock = putBlock(boards, block);

    moveCurrentBlock(boards, currentBlock);
    totalScore += getScore(boards);
    removeSpecialRows(boards, rows, columns);
  });

  const count = countBlocks(boards, rows, columns);

  return `${totalScore}\n${count}`;
};

const createBoard = (rows, columns) => {
  return Array.from(Array(rows), () => Array(columns).fill(0));
};

const putBlock = (boards, block) => {
  const [t, x, y] = block;
  const newGreen = boards.green.map((row) => [...row]);
  const newBlue = boards.blue.map((row) => [...row]);
  const currentBlock = {
    green: [],
    blue: [],
  };

  newGreen[x][y] = 1;
  newBlue[y][3 - x] = 1;

  currentBlock.green.push([x, y]);
  currentBlock.blue.push([y, 3 - x]);

  if (t === 2) {
    newGreen[x][y + 1] = 1;
    newBlue[y + 1][3 - x] = 1;

    currentBlock.green.push([x, y + 1]);
    currentBlock.blue.push([y + 1, 3 - x]);
  } else if (t === 3) {
    newGreen[x + 1][y] = 1;
    newBlue[y][2 - x] = 1;

    currentBlock.green.push([x + 1, y]);
    currentBlock.blue.push([y, 2 - x]);
  }

  boards.green = newGreen;
  boards.blue = newBlue;

  return currentBlock;
};

const moveCurrentBlock = (boards, currentBlock) => {
  moveBlock(boards.green, currentBlock.green);
  moveBlock(boards.blue, currentBlock.blue);
};

const moveBlock = (board, block) => {
  let movedBlock = block.map((item) => [...item]);

  while (isMovable(board, movedBlock)) {
    movedBlock = movedBlock.map(([r, c]) => [r + 1, c]);
  }

  block.forEach(([r, c]) => (board[r][c] = 0));
  movedBlock.forEach(([r, c]) => (board[r][c] = 1));
};

const isMovable = (board, block) => {
  const rows = block.map(([r]) => r);
  const lowest = Math.max(...rows);
  const bottoms = block.filter(([r]) => r === lowest);

  return bottoms.every(([r, c]) => {
    return r + 1 < board.length && board[r + 1][c] === 0;
  });
};

const getScore = (boards) => {
  let score = 0;

  score += getBoardScore(boards.green);
  score += getBoardScore(boards.blue);

  return score;
};

const getBoardScore = (board) => {
  let score = 0;
  let removedIndex = 0;

  board.forEach((row, index) => {
    if (index < 4 || row.some((block) => !block)) return;

    score += 1;
    removedIndex = Math.max(removedIndex, index);

    removeRow(board, index);
  });

  if (!removedIndex) return score;

  for (let i = removedIndex - score; i > 3; i--) {
    for (let j = 0; j < 4; j++) {
      if (!board[i][j]) continue;

      board[i][j] = 0;
      board[i + score][j] = 1;
    }
  }

  return score;
};

const removeRow = (board, index) => {
  board[index].fill(0);
};

const removeSpecialRows = (boards, rows, columns) => {
  removeSpecialRow(boards.green, rows, columns);
  removeSpecialRow(boards.blue, rows, columns);
};

const removeSpecialRow = (board, rows, columns) => {
  const removeCount = findRemoveCount(board);

  if (!removeCount) return;

  for (let i = rows - 1; i > rows - removeCount - 1; i--) {
    removeRow(board, i);
  }

  for (let i = rows - removeCount - 1; i > 3; i--) {
    for (let j = 0; j < columns; j++) {
      if (!board[i][j]) continue;

      board[i][j] = 0;
      board[i + removeCount][j] = 1;
    }
  }
};

const findRemoveCount = (board) => {
  if (board[4].some((block) => block)) return 2;
  if (board[5].some((block) => block)) return 1;
};

const countBlocks = (board, rows, columns) => {
  let count = 0;

  for (let i = 4; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board.green[i][j]) count += 1;
      if (board.blue[i][j]) count += 1;
    }
  }

  return count;
};

console.log(solution(blocks));
