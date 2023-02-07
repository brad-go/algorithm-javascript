# 프렌즈4블록

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/17679

## 문제 분류

: 구현

## 풀이 과정

1. 각 블록을 확인하면서 왼쪽, 왼쪽 위, 위 블록이 현재 블록과 같다면 지울 블록에 넣어준다.
2. 지울 블록의 개수를 총 지운 개수에 더한다.
3. 지울 블록을 확인하면서 보드에서 해당 블록을 지워준다.
4. 블록을 확인하면서 블록을 떨어뜨려준다.
5. 더이상 지울 블록이 없을 때까지 위를 반복한다.

## 풀이 코드

```js
const solution = (m, n, board) => {
  const blocks = board.map((row) => row.split(""));

  let count = 0;

  while (true) {
    const removed = new Set();

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (blocks[i][j] === " ") continue;

        const current = blocks[i][j];
        const top = blocks[i - 1][j];
        const topLeft = blocks[i - 1][j - 1];
        const left = blocks[i][j - 1];

        if (current === top && current === topLeft && current === left) {
          removed.add(`${i},${j}`);
          removed.add(`${i - 1},${j}`);
          removed.add(`${i - 1},${j - 1}`);
          removed.add(`${i},${j - 1}`);
        }
      }
    }

    if (removed.size === 0) break;

    count += removed.size;

    removeBlocks(blocks, removed);
    dropBlocks(blocks);
  }

  return count;
};

const removeBlocks = (blocks, removed) => {
  removed.forEach((item) => {
    const [r, c] = item.split(",");

    blocks[r][c] = " ";
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
```

## 코드 개선

```js
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
```
