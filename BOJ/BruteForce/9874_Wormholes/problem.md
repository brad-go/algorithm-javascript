# Wormholes - 9874

[문제 링크](https://www.acmicpc.net/problem/9874)

## 문제 풀이

문제를 이해하는데 꽤 어려움을 겪었다.

- 소가 +x방향으로만 이동한다는 것이 x는 좌표에서 x방향을 의미한다.
- 무한 순환에 빠지는 것을 체크하기 위해서는 한 쌍의 웜홀만을 체크해서는 안된다. 4개의 경우 2개씩 짝을 지어 웜홀을 연결해줘야 하고, 그 상황에서 소를 각각 이동시켜봐야 한다.

### 풀이 설명

1. 웜홀 클래스를 만들어준다. connect메서드를 가지는데, 연결될 웜홀의 인덱스를 지정하는 메서드다.
2. 각 웜홀들을 클래스를 통해 인스턴스를 생성해 배열에 저장한다.
3. 소는 x방향으로만 이동한다. 즉, x값이 작은 값부터 웜홀을 타게 된다. x좌표를 기준으로 정렬한다.
4. 아래의 과정을 통해 웜홀을 연결하고 순환에 빠진 웜홀을 찾는다.
5. 방문처리를 통해 n개에서 2개씩 짝 지을 수 있는 경우의 수로 웜홀들을 연결해준다. 이때 백트래킹을 이용해서 연결해주었다.
6. 만약 모든 웜홀이 연결되었다면, 각 웜홀의 위치에서 소를 이동시켜서 무한 순환에 빠지는지 체크한다.
7. 현재 웜홀에 연결된 웜홀의 좌표를 구하고, 그 웜홀의 연결된 좌표를 계속해서 구한다.
8. 좌표를 구할 때, 웜홀 배열을 순회하면서 현재 y와 웜홀의 y값이 같은지, 현재 x값보다 x값이 큰지 체크한다. (다음 웜홀로 들어갈 수 있는 조건)
9. 같은 곳을 또 방문하게 된다면 무한 순환에 빠지게 된다.

### 전체 코드

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
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
    // 다음 웜홀로 들어가게되는 조건
    if (wormholes[i].y === y && wormholes[i].x > x) return i;
  }
  return -1;
};

console.log(solution(N, wormholeInfo));
```
