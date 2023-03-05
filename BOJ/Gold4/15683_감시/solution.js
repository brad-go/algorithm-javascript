const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const office = input.slice(1).map((str) => str.split(" ").map(Number));

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const OFFICE = {
  empty: 0,
  wall: 6,
  watched: "#",
};

const solution = (N, M, office) => {
  const officeCount = N * M;
  const { cctvs, wallCount } = init(office);

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (index) => {
    if (index === cctvs.length) {
      const newOffice = office.map((row) => [...row]);
      const watchCount = watchOffice(N, M, newOffice, cctvs);
      const deadZoneCount = officeCount - wallCount - watchCount - cctvs.length;

      answer = Math.min(answer, deadZoneCount);

      return;
    }

    for (let dir = 0; dir < 4; dir++) {
      rotateCCTV(cctvs[index]);
      dfs(index + 1);
    }
  };

  dfs(0);

  return answer;
};

const init = (office) => {
  const cctvs = [];
  let wallCount = 0;

  office.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === OFFICE.empty) return;

      if (value === OFFICE.wall) {
        wallCount += 1;
      } else {
        cctvs.push(createCCTV(rowIndex, columnIndex, value));
      }
    });
  });

  return { cctvs, wallCount };
};

const createCCTV = (r, c, type) => {
  const cctvType = {
    1: [0],
    2: [0, 2],
    3: [0, 3],
    4: [0, 2, 3],
    5: [0, 1, 2, 3],
  };

  return { r, c, dirs: cctvType[type] };
};

const rotateCCTV = (cctv) => {
  cctv.dirs = cctv.dirs.map((dir) => (dir + 1) % 4);
};

const watchOffice = (N, M, office, cctvs) => {
  let count = 0;

  cctvs.forEach(({ r, c, dirs }) => {
    dirs.forEach((dir) => {
      const [dr, dc] = DIRECTIONS[dir];

      let nr = r + dr;
      let nc = c + dc;

      while (isInOffice(N, M, nr, nc) && !isWall(office, nr, nc)) {
        if (!isCCTV(office, nr, nc) && office[nr][nc] !== OFFICE.watched) {
          office[nr][nc] = "#";
          count += 1;
        }

        nr = nr + dr;
        nc = nc + dc;
      }
    });
  });

  return count;
};

const isInOffice = (N, M, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < M;
};

const isWall = (office, r, c) => {
  return office[r][c] === OFFICE.wall;
};

const isCCTV = (office, r, c) => {
  return office[r][c] > 0 && office[r][c] < 6;
};

console.log(solution(N, M, office));
