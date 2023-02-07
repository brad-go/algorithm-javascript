const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const m = +input[0];
const n = +input[1];
const board = input[2].split(" ");

const solution = (m, n, board) => {
  const blocks = board.map((row) => row.split(""));

  while (true) {
    const removed = [];

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (blocks[i][j] === " ") continue;

        const current = blocks[i][j];
        const top = blocks[i - 1][j];
        const topLeft = blocks[i - 1][j - 1];
        const left = blocks[i][j - 1];

        if (current === top && current === topLeft && current === left) {
          removed.push([i, j]);
        }
      }
    }

    if (!removed.length) break;

    removeBlocks(blocks, removed);
    dropBlocks(blocks);
  }

  return blocks.flat().filter((block) => block === " ").length;
};

const removeBlocks = (blocks, removed) => {
  removed.forEach(([r, c]) => {
    blocks[r][c] = " ";
    blocks[r - 1][c] = " ";
    blocks[r - 1][c - 1] = " ";
    blocks[r][c - 1] = " ";
  });
};

const dropBlocks = (blocks) => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    for (let j = blocks[0].length - 1; j >= 0; j--) {
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
