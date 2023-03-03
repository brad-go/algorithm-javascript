const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, L] = input[0].split(" ").map(Number);
const map = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, L, map) => {
  const rowMap = map.map((road) => [...road]);
  const columnMap = createColumnMap(N, map);

  return findPassibleRoad(N, L, rowMap) + findPassibleRoad(N, L, columnMap);
};

const createColumnMap = (N, map) => {
  const columnMap = Array.from(Array(N), () => Array(N));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      columnMap[j][i] = map[i][j];
    }
  }

  return columnMap;
};

const findPassibleRoad = (N, L, map) => {
  return map.filter((road) => isPassibleRoad(L, road)).length;
};

const isPassibleRoad = (L, road) => {
  if (isAllSameHeight(road)) return true;

  let sameHeightBlocks = 1;

  for (let i = 0; i < N - 1; i++) {
    if (isHeightDifferenceGreaterThanOne(road[i], road[i + 1])) {
      sameHeightBlocks = -1;
      break;
    }

    if (isSameHeight(road[i], road[i + 1])) {
      sameHeightBlocks++;
    } else if (isUpHill(road[i], road[i + 1]) && sameHeightBlocks >= L) {
      sameHeightBlocks = 1;
    } else if (isDownHill(road[i], road[i + 1]) && sameHeightBlocks >= 0) {
      sameHeightBlocks = 1 - L;
    } else {
      sameHeightBlocks = -1;
      break;
    }
  }

  return sameHeightBlocks >= 0;
};

const isAllSameHeight = (road) => {
  return new Set(road).size === 1;
};

const isHeightDifferenceGreaterThanOne = (blockHeight, nextBlockHeight) => {
  return Math.abs(blockHeight - nextBlockHeight) > 1;
};

const isSameHeight = (blockHeight, nextBlockHeight) => {
  return blockHeight === nextBlockHeight;
};

const isUpHill = (blockHeight, nextBlockHeight) => {
  return blockHeight < nextBlockHeight;
};

const isDownHill = (blockHeight, nextBlockHeight) => {
  return blockHeight > nextBlockHeight;
};

console.log(solution(N, L, map));
