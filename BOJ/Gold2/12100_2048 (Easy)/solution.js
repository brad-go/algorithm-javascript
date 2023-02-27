const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const board = input.slice(1).map((str) => str.split(" ").map(Number));

const DIRECTION = {
  left: 0,
  up: 1,
  right: 2,
  down: 3,
};

const solution = (N, board) => {
  const blocks = findBlocks(N, board);

  let answer = 0;

  const dfs = (blocks, count) => {
    if (count === 5) {
      answer = Math.max(answer, findMaxBlock(blocks));
      return;
    }

    for (let dir = 0; dir < 4; dir++) {
      const movedBlocks = moveBlocks(N, blocks, dir);

      if (blocks.length === movedBlocks.length && isStop(blocks, movedBlocks))
        continue;

      dfs(movedBlocks, count + 1);
    }
  };

  dfs(blocks, 0);

  return answer;
};

const findBlocks = (N, board) => {
  const blocks = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!board[i][j]) continue;

      blocks.push(makeBlock(i, j, board[i][j]));
    }
  }

  return blocks;
};

const makeBlock = (r, c, value, isCombined = false) => {
  return { r, c, value, isCombined };
};

const moveBlocks = (N, blocks, direction) => {
  const originBlocks = blocks.map((block) => ({ ...block }));
  const newBlocks = [];

  for (let i = 0; i < N; i++) {
    const rowColumn = isHorizontal(direction) ? "r" : "c";
    const line = originBlocks.filter((block) => block[rowColumn] === i);

    if (!isMovable(N, line)) {
      newBlocks.push(...line);
      continue;
    }

    const combined = combineBlocks(line, direction);

    updateBlocks(combined, direction, N - 1);
    newBlocks.push(...combined);
  }

  return newBlocks;
};

const isMovable = (N, line) => {
  return new Set(line.map(({ value }) => value)).size < N;
};

const combineBlocks = (line, direction) => {
  if (direction === DIRECTION.left || direction === DIRECTION.up) {
    combineBlocksAscending(line);
  } else {
    combineBlocksDescending(line);
  }

  return line.filter((block) => !block.isCombined);
};

const combineBlocksAscending = (line) => {
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i].value === line[i + 1].value) {
      line[i].value += line[i + 1].value;
      line[i + 1].isCombined = true;
      i++;
    }
  }
};

const combineBlocksDescending = (line) => {
  for (let i = line.length - 1; i > 0; i--) {
    if (line[i].value === line[i - 1].value) {
      line[i].value += line[i - 1].value;
      line[i - 1].isCombined = true;
      i--;
    }
  }
};

const updateBlocks = (line, direction, value) => {
  const rowColumn = isHorizontal(direction) ? "c" : "r";

  if (direction === DIRECTION.left || direction === DIRECTION.up) {
    for (let i = 0; i < line.length; i++) {
      line[i][rowColumn] = i;
    }
  } else {
    for (let i = line.length - 1; i >= 0; i--) {
      line[i][rowColumn] = value;
      value--;
    }
  }
};

const isHorizontal = (direction) => {
  return direction === DIRECTION.left || direction === DIRECTION.right;
};

const findMaxBlock = (blocks) => {
  return Math.max(...blocks.map(({ value }) => value));
};

const isStop = (origin, moved) => {
  origin.every((block, index) => {
    const movedBlock = moved[index];

    return block.r === movedBlock.r && block.c === movedBlock.c;
  });
};

console.log(solution(N, board));
