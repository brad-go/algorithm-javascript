const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const m = +input[0];
const n = +input[1];
const board = input[2].split(" ");

const solution = (m, n, board) => {
  const blocks = board.map((row) => row.split(""));

  while (true) {
    const removed = findBlocksToRemove(m, n, blocks);

    if (!removed.length) {
      return blocks.flat().filter((block) => block === " ").length;
    }

    removeBlocks(blocks, removed);
    dropBlocks(m, n, blocks);
  }
};

const findBlocksToRemove = (m, n, blocks) => {
  const removed = [];

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (isValid(blocks, i, j)) removed.push([i, j]);
    }
  }

  return removed;
};

const isValid = (blocks, row, column) => {
  const current = blocks[row][column];
  const top = blocks[row - 1][column];
  const left = blocks[row][column - 1];
  const topLeft = blocks[row - 1][column - 1];

  return (
    current !== " " &&
    current === top &&
    current === left &&
    current === topLeft
  );
};

const removeBlocks = (blocks, removed) => {
  removed.forEach(([i, j]) => {
    blocks[i][j] = " ";
    blocks[i - 1][j] = " ";
    blocks[i][j - 1] = " ";
    blocks[i - 1][j - 1] = " ";
  });
};

const dropBlocks = (m, n, blocks) => {
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (blocks[i][j] !== " ") continue;

      for (let k = i - 1; k >= 0; k--) {
        if (blocks[k][j] === " ") continue;

        blocks[i][j] = blocks[k][j];
        blocks[k][j] = " ";
        break;
      }
    }
  }
};

console.log(solution(m, n, board));
