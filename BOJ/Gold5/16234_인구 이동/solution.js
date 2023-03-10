const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input5.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, L, R] = input[0].split(" ").map(Number);
const nations = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, L, R, nations) => {
  let day = 0;

  while (true) {
    const prevNations = nations.map((row) => [...row]);
    const visited = Array.from(Array(N), () => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visited[i][j]) continue;

        findUnitedNations(N, L, R, nations, visited, i, j);
      }
    }

    if (isNoMoreMovingPopulations(nations, prevNations)) break;

    visited.fill(false);
    day++;
  }

  return day;
};

const findUnitedNations = (N, L, R, nations, visited, sr, sc) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = [[sr, sc]];
  const united = {
    nations: [[sr, sc]],
    count: 1,
    population: nations[sr][sc],
  };

  visited[sr][sc] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      if (
        !isInLand(N, nr, nc) ||
        !canShareBorder(L, R, nations[r][c], nations[nr][nc]) ||
        visited[nr][nc]
      )
        return;

      visited[nr][nc] = true;
      united.population += nations[nr][nc];
      united.count += 1;
      united.nations.push([nr, nc]);

      queue.push([nr, nc]);
    });
  }

  movePopulation(united);
};

const isInLand = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const canShareBorder = (L, R, a, b) => {
  const diff = Math.abs(a - b);

  return L <= diff && diff <= R;
};

const movePopulation = (united) => {
  const populationOfUnites = Math.floor(united.population / united.count);

  united.nations.forEach(([r, c]) => (nations[r][c] = populationOfUnites));
};

const isNoMoreMovingPopulations = (nations, prevNations) => {
  return nations.every((row, rowIndex) => {
    return row.every(
      (nation, columnIndex) => nation === prevNations[rowIndex][columnIndex]
    );
  });
};

console.log(solution(N, L, R, nations));
