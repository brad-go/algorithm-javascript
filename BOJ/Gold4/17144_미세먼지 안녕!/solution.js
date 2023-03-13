const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [R, C, T] = input[0].split(" ").map(Number);
const room = input.slice(1).map((str) => str.split(" ").map(Number));

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const solution = (R, C, T, room) => {
  const airCleaner = findAirCleaner(R, room);

  let time = 0;

  while (time < T) {
    const dusts = findDusts(room);

    spreadDusts(R, C, room, dusts);
    operateAirCleaner(R, C, room, airCleaner);

    time++;
  }

  return getAmountOfDustLeft(room);
};

const findAirCleaner = (R, room) => {
  const position = [];

  for (let i = 0; i < R; i++) {
    if (room[i][0] === -1) position.push([i, 0]);
  }

  return { up: position[0], down: position[1] };
};

const findDusts = (room) => {
  const dusts = [];

  room.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value && value !== -1) dusts.push({ r, c, amount: value });
    });
  });

  return dusts;
};

const spreadDusts = (R, C, room, dusts) => {
  dusts.forEach((dust) => spreadDust(R, C, room, dust));
};

const spreadDust = (R, C, room, dust) => {
  const { r, c, amount } = dust;
  const spreadAmount = Math.floor(amount / 5);

  let spreadCount = 0;

  dirs.forEach(([dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;

    if (!isInRoom(R, C, nr, nc) || isAirCleaner(room, nr, nc)) return;

    room[nr][nc] += spreadAmount;
    spreadCount += 1;
  });

  room[r][c] -= spreadAmount * spreadCount;
};

const isInRoom = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && c < C;
};

const isAirCleaner = (room, r, c) => {
  return room[r][c] === -1;
};

const operateAirCleaner = (R, C, room, airCleaner) => {
  operateUpperSide(R, C, room, airCleaner.up);
  operateLowerSide(R, C, room, airCleaner.down);
};

const operateUpperSide = (R, C, room, airCleaner) => {
  const [r] = airCleaner;

  for (let i = r - 1; i > 0; i--) {
    room[i][0] = room[i - 1][0];
  }

  for (let i = 0; i < C - 1; i++) {
    room[0][i] = room[0][i + 1];
  }

  for (let i = 0; i < r; i++) {
    room[i][C - 1] = room[i + 1][C - 1];
  }

  for (let i = C - 1; i > 1; i--) {
    room[r][i] = room[r][i - 1];
  }

  room[r][1] = 0;
};

const operateLowerSide = (R, C, room, airCleaner) => {
  const [r] = airCleaner;

  for (let i = r + 1; i < R - 1; i++) {
    room[i][0] = room[i + 1][0];
  }

  for (let i = 0; i < C - 1; i++) {
    room[R - 1][i] = room[R - 1][i + 1];
  }

  for (let i = R - 1; i > r; i--) {
    room[i][C - 1] = room[i - 1][C - 1];
  }

  for (let i = C - 1; i > 1; i--) {
    room[r][i] = room[r][i - 1];
  }

  room[r][1] = 0;
};

const getAmountOfDustLeft = (room) => {
  return room.reduce((total, row) => {
    const rowSum = row.reduce((sum, cur) => {
      if (cur === -1 || cur === 0) return sum;

      return sum + cur;
    }, 0);

    return total + rowSum;
  }, 0);
};

console.log(solution(R, C, T, room));
