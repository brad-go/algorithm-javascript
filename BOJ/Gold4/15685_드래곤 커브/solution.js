const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input4.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const curves = input.slice(1).map((str) => str.split(" ").map(Number));

const DR = [0, -1, 0, 1];
const DC = [1, 0, -1, 0];

const solution = (N, curves) => {
  const grid = Array.from(Array(101), () => Array(101).fill(0));

  curves.forEach((curve) => drawCurve(grid, curve));

  return countSquareInGrid(grid);
};

const drawCurve = (grid, curve) => {
  const [c, r, direction, generation] = curve;
  const directions = findDirections(direction, generation);

  grid[r][c] = 1;

  let nr = r;
  let nc = c;

  directions.forEach((direction) => {
    nr += DR[direction];
    nc += DC[direction];

    grid[nr][nc] = 1;
  });
};

const findDirections = (direction, generation) => {
  const directions = [direction];

  for (let i = 0; i < generation; i++) {
    for (let j = directions.length - 1; j >= 0; j--) {
      directions.push((directions[j] + 1) % 4);
    }
  }

  return directions;
};

const countSquareInGrid = (grid) => {
  let count = 0;

  for (let i = 0; i < grid.length - 1; i++) {
    for (let j = 0; j < grid[0].length - 1; j++) {
      if (isSqaure(grid, i, j)) count += 1;
    }
  }

  return count;
};

const isSqaure = (grid, r, c) => {
  return grid[r][c] && grid[r + 1][c] && grid[r][c + 1] && grid[r + 1][c + 1];
};

console.log(solution(N, curves));
