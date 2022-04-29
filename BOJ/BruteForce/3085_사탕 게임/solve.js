const [n, ...input] = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const board = input.map((line) => line.split(""));

  let maxCandies = 0;
  let isMaxCandies = false;

  // 보드를 확인하면서 최대로 연속된 사탕의 개수를 반환하는 함수
  const checkBoard = (board) => {
    // 현재 보드에서 얻을 수 있는 최대로 연속된 사탕의 개수
    let candies = 0;

    for (let i = 0; i < n; i++) {
      let cntRow = 1;
      let cntCol = 1;

      for (let j = 0; j < n - 1; j++) {
        // 열 검사
        if (board[j][i] === board[j + 1][i]) {
          cntCol++;
          candies = Math.max(candies, cntCol);
        } else cntCol = 1;

        // 행 검사
        if (board[i][j] === board[i][j + 1]) {
          cntRow++;
          candies = Math.max(candies, cntRow);
        } else cntRow = 1;
      }
    }

    return candies;
  };

  // 열 스왑 - 가로로 사탕 위치 변경
  const swapColumn = (board, row, col) => {
    const temp = board[row][col];
    board[row][col] = board[row][col + 1];
    board[row][col + 1] = temp;
  };

  // 행 스왑 - 세로로 사탕 위치 변경
  const swapRow = (board, row, col) => {
    const temp = board[row][col];
    board[row][col] = board[row + 1][col];
    board[row + 1][col] = temp;
  };

  // 교환하기 전에 최대 길이의 사탕을 구할 수 있는지 체크하기
  maxCandies = checkBoard(board);

  // 구한 사탕의 길이와 최대 길이를 비교해서 같다면 출력하고 함수 종료
  if (maxCandies === n) {
    console.log(maxCandies);
    return;
  }

  // 보드를 순회하기
  for (let i = 0; i < n; i++) {
    if (isMaxCandies) break;

    for (let j = 0; j < n - 1; j++) {
      if (maxCandies === n) {
        isMaxCandies = true;
        break;
      }

      // 가로 스왑
      if (board[i][j] !== board[i][j + 1]) {
        swapColumn(board, i, j);
        maxCandies = Math.max(maxCandies, checkBoard(board));
        swapColumn(board, i, j);
      }

      // 세로 스왑
      if (board[j][i] !== board[j + 1][i]) {
        swapRow(board, j, i);
        maxCandies = Math.max(maxCandies, checkBoard(board));
        swapRow(board, j, i);
      }
    }
  }
  console.log(maxCandies);
}

Solution(Number(n), input);
