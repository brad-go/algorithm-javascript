const [rows, columns, ...input] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

const queries = new Array(input.length / 4)
  .fill()
  .map((_, r) => new Array(4).fill().map((_, c) => input[c + r * 4]));

function Solution(rows, columns, queries) {
  const matrix = Array.from(Array(rows), (_, r) =>
    Array(columns)
      .fill()
      .map((_, c) => c + r * columns + 1)
  );

  const answer = [];

  queries.forEach((query) => {
    const [x1, y1, x2, y2] = query.map((v) => v - 1);

    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];

    let dir = 0;
    let minNum = matrix[rows - 1][columns - 1];

    // 재귀 함수 탈출을 위해 회전해야 할 총 인덱스 개수 구하기
    const getTotalIdx = (x1, y1, x2, y2) => {
      const colGap = x2 - x1 + 1;
      const rowGap = y2 - y1 + 1;

      return colGap * rowGap - (colGap - 2) * (rowGap - 2);
    };

    // 구한 총 개수 저장
    const TOTAL_ROTATE_NUMS = getTotalIdx(x1, y1, x2, y2);

    // 회전 시키기
    const rotateMatrix = (x, y, cnt, temp) => {
      if (cnt === TOTAL_ROTATE_NUMS) return;

      let cur = matrix[x][y];
      matrix[x][y] = temp;
      temp = cur;
      minNum = Math.min(minNum, temp);

      let nx = x + DR[dir];
      let ny = y + DC[dir];

      if (nx >= x1 && ny >= y1 && nx <= x2 && ny <= y2) {
        rotateMatrix(nx, ny, cnt + 1, temp);
      } else {
        dir = (dir + 1) % 4;
        nx = x + DR[dir];
        ny = y + DC[dir];

        rotateMatrix(nx, ny, cnt + 1, temp);
      }
    };

    rotateMatrix(x1, y1, (cnt = 0), matrix[x1 + 1][y1]);
    answer.push(minNum);
  });

  console.log(answer);
}

Solution(rows, columns, queries);
