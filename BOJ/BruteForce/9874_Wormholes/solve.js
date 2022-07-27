// prettier-ignore
const [n, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(n);
const wormholeInfo = input.map((line) => line.split(" ").map(Number));

class Warmhole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.connected = null;
  }

  connect(index) {
    this.connected = index;
  }
}

function solution(N, wormholeInfo) {
  const wormholes = wormholeInfo
    .map(([x, y]) => new Warmhole(x, y))
    .sort((a, b) => a.x - b.x); // x좌표 기준으로 정렬, +x방향으로 이동하면 x값이 작은 값부터 웜홀을 타기 때문에
  const visited = new Array(N).fill(false);
  const answer = connectWormholes(N, wormholes, visited, 0, 0, 0);

  return answer;
}

const connectWormholes = (N, wormholes, visited, count, index, answer) => {
  if (count === N) {
    // 각 웜홀의 위치에서 소를 이동시켜서 무한 순황에 빠지는지 체크하기
    for (let i = 0; i < N; i++) {
      if (isCycling(N, wormholes, i)) return ++answer;
    }
  }

  for (let i = index; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;

    for (let j = i + 1; j < N; j++) {
      if (visited[j]) continue;
      visited[j] = true;

      wormholes[i].connect(j);
      wormholes[j].connect(i);
      answer = connectWormholes(N, wormholes, visited, count + 2, i + 1, answer); // prettier-ignore
      visited[j] = false;
    }
    visited[i] = false;
  }

  return answer;
};

const isCycling = (N, wormholes, index) => {
  const visited = new Array(N).fill(false);

  while (true) {
    // 같은 곳을 또 방문한다면 무한 순환에 빠지게 된 것!
    if (visited[index]) return true;

    visited[index] = true;

    const x = wormholes[wormholes[index].connected].x;
    const y = wormholes[wormholes[index].connected].y;

    // 다음 연결된 웜홀을 찾는다.
    index = searchNextHole(wormholes, x, y);

    if (index === -1) return false;
  }
};

const searchNextHole = (wormholes, x, y) => {
  for (let i = 0; i < N; i++) {
    if (wormholes[i].y === y && wormholes[i].x > x) return i;
  }
  return -1;
};

console.log(solution(N, wormholeInfo));
