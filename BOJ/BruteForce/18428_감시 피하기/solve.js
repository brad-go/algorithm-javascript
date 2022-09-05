// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0]);
const hallway = input.slice(1).map((line) => line.split(" "));

function solution(N, hallway) {
  const teachers = getPositionsOfTeachers(N, hallway);
  const result = setUpOstacles(N, hallway, teachers, 0);

  return result ? "YES" : "NO";
}

const setUpOstacles = (N, hallway, teachers, count) => {
  if (count === 3) {
    return !isStudentFound(N, hallway, teachers);
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (hallway[i][j] !== "X") continue;

      hallway[i][j] = "O";
      if (setUpOstacles(N, hallway, teachers, count + 1)) return true;
      hallway[i][j] = "X";
    }
  }

  return false;
};

const isStudentFound = (N, hallway, teachers) => {
  const DX = [0, 1, 0, -1];
  const DY = [1, 0, -1, 0];

  for (const { x, y } of teachers) {
    for (let dir = 0; dir < 4; dir++) {
      let nx = x + DX[dir];
      let ny = y + DY[dir];

      const result = lookForStudents(N, hallway, nx, ny, DX[dir], DY[dir]);
      if (result) return true;
    }
  }

  return false;
};

const getPositionsOfTeachers = (N, hallway) => {
  const positions = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (hallway[i][j] === "T") positions.push({ x: i, y: j });
    }
  }

  return positions;
};

const lookForStudents = (N, hallway, x, y, xDir, yDir) => {
  if (!isInHallway(N, x, y)) return false;

  const current = hallway[x][y];

  if (current === "S") return true;
  if (current === "O") return false;

  return lookForStudents(N, hallway, x + xDir, y + yDir, xDir, yDir);
};

const isInHallway = (N, x, y) => {
  return 0 <= x && x < N && 0 <= y && y < N;
};

console.log(solution(N, hallway));
