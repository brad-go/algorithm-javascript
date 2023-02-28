const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const K = +input[1];
const apples = input.slice(2, 2 + K);
const commands = input.slice(2 + K + 1);

const solution = (N, apples, commands) => {
  const { board, snake } = initGame(N, apples);

  return startGame(N, board, snake, commands);
};

const initGame = (N, apples) => {
  const board = Array.from(Array(N), () => Array(N).fill(0));
  const snake = { position: [[0, 0]], dir: 0 };

  fillApple(board, apples);

  return { board, snake };
};

const fillApple = (board, apples) => {
  apples.forEach((apple) => {
    const [row, column] = apple.split(" ").map((v) => v - 1);

    board[row][column] = 2;
  });
};

const startGame = (N, board, originSnake, commands) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[originSnake, 1]];

  let index = 0;

  while (queue.length) {
    const [snake, time] = queue.shift();
    const { position } = snake;
    const [r, c] = position[position.length - 1];

    if (commands[index]) {
      index += changeDirection(snake, commands[index], time);
    }

    let nr = r + DR[snake.dir];
    let nc = c + DC[snake.dir];

    if (!isInRange(N, nr, nc) || isSnake(snake, nr, nc)) return time;

    moveSnake(board, snake, nr, nc);

    queue.push([snake, time + 1]);
  }
};

const moveSnake = (board, snake, r, c) => {
  const { position } = snake;

  position.push([r, c]);

  if (isApple(board, r, c)) {
    board[r][c] = 0;
  } else {
    position.shift();
  }
};

const isInRange = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const isApple = (board, r, c) => {
  return board[r][c] === 2;
};

const isSnake = (snake, r, c) => {
  const { position } = snake;

  return position.some(([row, column]) => row === r && column === c);
};

const changeDirection = (snake, turn, time) => {
  const [elapsedTime, directionToChange] = turn.split(" ");

  if (Number(elapsedTime) >= time) return false;

  snake.dir = swapDirection(snake.dir, directionToChange);

  return true;
};

const swapDirection = (direction, toChange) => {
  if (toChange === "D") return (direction + 1) % 4;

  return direction <= 0 ? 3 : direction - 1;
};

console.log(solution(N, apples, commands));
