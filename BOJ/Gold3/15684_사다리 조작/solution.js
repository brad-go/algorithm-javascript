const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, H] = input[0].split(" ").map(Number);
const lines = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, M, H, lines) => {
  if (M === 0) return 0;

  const ladder = createLadder(N, H, lines);

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (maxCount, index, count) => {
    if (maxCount === count) {
      answer = isValid(N, ladder) ? maxCount : answer;
      return;
    }

    for (let row = index; row < H; row++) {
      for (let column = 0; column < N - 1; column++) {
        if (!canDraw(N, ladder, row, column)) continue;

        ladder[row][column] = true;

        dfs(maxCount, row, count + 1);

        ladder[row][column] = false;
      }
    }
  };

  for (let maxCount = 0; maxCount <= 3; maxCount++) {
    dfs(maxCount, 0, 0);

    if (answer < 3) break;
  }

  return answer > 3 ? -1 : answer;
};

const createLadder = (N, H, lines) => {
  const ladder = Array.from(Array(H), () => Array(N - 1).fill(false));

  lines.forEach(([row, column]) => {
    ladder[row - 1][column - 1] = true;
  });

  return ladder;
};

const canDraw = (N, ladder, row, column) => {
  if (ladder[row][column]) return false;
  if (column < N - 2 && ladder[row][column + 1]) return false;
  if (column > 0 && ladder[row][column - 1]) return false;

  return true;
};

const isValid = (N, ladder) => {
  for (let i = 0; i < N; i++) {
    let column = i;
    let row = 0;

    while (row < H) {
      if (column < N - 1 && ladder[row][column]) {
        column += 1;
      } else if (column > 0 && ladder[row][column - 1]) {
        column -= 1;
      }

      row += 1;
    }

    if (column !== i) return false;
  }

  return true;
};

console.log(solution(N, M, H, lines));
