const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, M, board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const maxValue = getMaxValue(board);

  let answer = 0;

  const dfs = (r, c, sum, depth) => {
    if (sum + maxValue * (4 - depth) <= answer) return;

    if (depth === 4) {
      answer = Math.max(answer, sum);
      return;
    }

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInBoard(N, M, nr, nc) || visited[nr][nc]) continue;

      visited[nr][nc] = true;

      if (depth === 2) dfs(r, c, sum + board[nr][nc], depth + 1);
      dfs(nr, nc, sum + board[nr][nc], depth + 1);

      visited[nr][nc] = false;
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, board[i][j], 1);
      visited[i][j] = false;
    }
  }

  return answer;
};

const isInBoard = (N, M, r, c) => 0 <= r && r < N && 0 <= c && c < M;

const getMaxValue = (board) => {
  return board.reduce((acc, cur) => Math.max(acc, Math.max(...cur)), 0);
};

console.log(solution(N, M, board));
