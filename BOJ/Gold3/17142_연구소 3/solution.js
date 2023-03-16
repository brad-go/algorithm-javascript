const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const lab = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, M, lab) => {
  const { viruses, emptySpace } = init(lab);

  if (emptySpace === 0) return 0;

  const combinations = getCombinations(viruses, M);

  let answer = Number.MAX_SAFE_INTEGER;

  combinations.forEach((viruses) => {
    const newLab = lab.map((row) => [...row]);
    const spreadTime = spreadViruses(N, newLab, viruses, emptySpace);

    if (spreadTime !== -1) answer = Math.min(answer, spreadTime);
  });

  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
};

const init = (lab) => {
  const initialState = {
    viruses: [],
    emptySpace: 0,
  };

  lab.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value === 0) {
        initialState.emptySpace += 1;
      } else if (value === 2) {
        initialState.viruses.push([r, c]);
      }
    });
  });

  return initialState;
};

const getCombinations = (array, select) => {
  if (select === 1) {
    return array.map((value) => [value]);
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

const spreadViruses = (N, lab, viruses, emptySpace) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = viruses.map((virus) => [...virus, 0]);
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  viruses.forEach(([r, c]) => (visited[r][c] = true));

  while (queue.length > 0) {
    const [r, c, time] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (!isInLab(N, nr, nc) || isWall(lab, nr, nc) || visited[nr][nc])
        continue;
      if (lab[nr][nc] === 0) emptySpace -= 1;
      if (emptySpace === 0) return time + 1;

      visited[nr][nc] = true;
      queue.push([nr, nc, time + 1]);
    }
  }

  return -1;
};

const isInLab = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const isWall = (lab, r, c) => {
  return lab[r][c] === 1;
};

console.log(solution(N, M, lab));
