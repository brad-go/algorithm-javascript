const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const lab = input.slice(1).map((str) => str.split(" ").map(Number));

const LAB = {
  empty: 0,
  wall: 1,
  virus: 2,
};

const solution = (N, M, lab) => {
  const { wallBuildingCombinations, viruses, wallCount } = init(lab);
  const totalPlaceCount = N * M;

  let answer = 0;

  wallBuildingCombinations.forEach((walls) => {
    const newLab = lab.map((row) => [...row]);

    walls.forEach(([r, c]) => (newLab[r][c] = LAB.wall));

    const virusCount = viruses.reduce((acc, [r, c]) => {
      return acc + spreadVirus(N, M, newLab, r, c);
    }, 0);
    const safetyZoneCount = totalPlaceCount - virusCount - wallCount - 3;

    answer = Math.max(answer, safetyZoneCount);
  });

  return answer;
};

const init = (lab) => {
  const viruses = [];
  const emptyPlaces = [];

  let wallCount = 0;

  lab.forEach((row, rowIndex) => {
    row.forEach((place, columnIndex) => {
      if (place === LAB.empty) emptyPlaces.push([rowIndex, columnIndex]);
      if (place === LAB.virus) viruses.push([rowIndex, columnIndex]);
      if (place === LAB.wall) wallCount++;
    });
  });

  const wallBuildingCombinations = getCombinations(emptyPlaces, 3);

  return { wallBuildingCombinations, viruses, wallCount };
};

const getCombinations = (array, select) => {
  if (select === 1) {
    return array.map((item) => [item]);
  }

  const results = [];

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

const spreadVirus = (N, M, lab, r, c) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let virusCount = 0;

  for (let dir = 0; dir < 4; dir++) {
    const nr = r + DR[dir];
    const nc = c + DC[dir];

    if (
      !isInLab(N, M, nr, nc) ||
      lab[nr][nc] === LAB.virus ||
      lab[nr][nc] === LAB.wall
    )
      continue;

    lab[nr][nc] = LAB.virus;
    virusCount += spreadVirus(N, M, lab, nr, nc);
  }

  return virusCount + 1;
};

const isInLab = (N, M, r, c) => 0 <= r && r < N && 0 <= c && c < M;

console.log(solution(N, M, lab));
