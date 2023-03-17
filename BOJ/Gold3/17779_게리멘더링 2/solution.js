const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const people = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, people) => {
  const boundaryValues = [];

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (count) => {
    if (count === 4) {
      if (isValid(N, boundaryValues)) {
        const city = Array.from(Array(N), () => Array(N).fill(0));
        const boundaries = getBoundaries(...boundaryValues);

        findFifthElection(city, boundaries);
        findElections(city, boundaryValues);

        const counts = getCountsOfElection(N, city, people);
        const max = Math.max(...counts);
        const min = Math.min(...counts);

        answer = Math.min(answer, max - min);
      }
      return;
    }

    for (let i = 1; i < N; i++) {
      boundaryValues.push(i);
      dfs(count + 1);
      boundaryValues.pop();
    }
  };

  dfs(0);

  return answer;
};

const isValid = (N, boundaryValues) => {
  const [x, y, d1, d2] = boundaryValues;

  return (
    d1 >= 1 &&
    d2 >= 1 &&
    1 <= x &&
    x < x + d1 + d2 &&
    x + d1 + d2 <= N &&
    1 <= y - d1 &&
    y - d1 < y &&
    y < y + d2 &&
    y + d2 <= N
  );
};

const getBoundaries = (x, y, d1, d2) => {
  const boundaries = [];
  const boundaryLines = [
    [x, y, x + d1, y - d1],
    [x, y, x + d2, y + d2],
    [x + d1, y - d1, x + d1 + d2, y - d1 + d2],
    [x + d2, y + d2, x + d1 + d2, y + d2 - d1],
  ];

  boundaryLines.forEach((lines, index) => {
    if (index === 1 || index === 2) getIncreaseLines(boundaries, ...lines);
    else getDecreaseLines(boundaries, ...lines);
  });

  return [...new Set(boundaries.join(" ").split(" "))].map((elem) => {
    return elem.split(",").map((number) => number - 1);
  });
};

const getDecreaseLines = (boundaries, sx, sy, ex, ey) => {
  while (sx <= ex || sy >= ey) {
    boundaries.push([sx, sy]);
    sx += 1;
    sy -= 1;
  }
};

const getIncreaseLines = (boundaries, sx, sy, ex, ey) => {
  while (sx <= ex || sy <= ey) {
    boundaries.push([sx, sy]);
    sx += 1;
    sy += 1;
  }
};

const findFifthElection = (city, boundaries) => {
  const max = boundaries.reduce((acc, cur) => {
    return Math.max(acc, Math.max(...cur));
  }, 0);
  const array = Array.from(Array(max + 1), () => []);

  boundaries.forEach(([r, c]) => array[r].push(c));

  array.forEach((columns, row) => {
    if (!columns.length) return;

    if (columns.length === 1) {
      city[row][columns] = 5;
      return;
    }

    columns.sort((a, b) => a - b);

    for (let i = columns[0]; i <= columns[1]; i++) {
      city[row][i] = 5;
    }
  });
};

const findElections = (city, values) => {
  const [x, y, d1, d2] = values;
  const elections = [
    [1, 1, x + d1 - 1, y],
    [1, y + 1, x + d2, N, 2],
    [x + d1, 1, N, y - d1 + d2 - 1],
    [x + d2 + 1, y - d1 + d2, N, N],
  ];

  elections.forEach((election, index) =>
    findElection(city, ...election, index + 1)
  );
};

const findElection = (city, sr, sc, er, ec, election) => {
  for (let r = sr; r <= er; r++) {
    for (let c = sc; c <= ec; c++) {
      if ((election === 1 || election === 3) && city[r - 1][c - 1] === 5) break;
      if (election === 2 && city[r - 1][c - 1] === 5) continue;
      if (election === 4 && city[r - 1][c - 1] !== 0) continue;

      city[r - 1][c - 1] = election;
    }
  }
};

const getCountsOfElection = (N, city, people) => {
  const counts = new Array(5).fill(0);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      add(counts, city[i][j], people[i][j]);
    }
  }

  return counts;
};

const add = (counts, value, people) => (counts[value - 1] += people);

console.log(solution(N, people));
