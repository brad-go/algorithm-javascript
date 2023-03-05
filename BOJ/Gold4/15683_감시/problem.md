# 15683. 감시

## 문제 링크

https://www.acmicpc.net/problem/15683

## 문제 분류

: 구현, 브루트포스 알고리즘

## 소요 시간

: 40분

## 풀이 방법

CCTV가 돌아가면서 사무실을 감시하는데, 각 CCTV들이 서로 다르게 돌아간 경우를 생각해야했기 때문에, 이를 어떻게 표현해야 하나 싶었다.

처음에는 DFS 탐색을 하지만, 중첩 반복문을 사용해 모든 cctv를 탐색하고 각 방향으로 돌리고, 되돌리면서 문제를 풀이하려고 했다. CCTV가 총 네 방향으로 돌아가기 때문에 방문배열을 사용하지만 총 네번을 방문해야 더 이상 방문할 수 없는 방식으로 풀이했다. 주어진 테스트 케이스에 올바른 답을 도출할 수 있었지만, 이는 시간 초과가 났다.

조금 더 효율적으로 풀이할 수 있는 방법이 필요했다. 그런데 곰곰이 생각해보니 중첩 반복문이 필요하지 않았다. 어차피 돌린 상태에서 체크를 하게되므로 다음 분기를 위해 CCTV의 방향을 다시 되돌려놓을 필요도 없었다. 그저 DFS 내에서 네 방향에 대해 현재 CCTV를 각 방향에 대해 돌리면서 다음 CCTV로 넘어가면 되었다.

즉, 다음과 같이 풀이할 수 있다.

1. 사무실에서 CCTV들을 찾는다.
2. 벽의 개수와 사무실의 크기를 센다.
3. 발견한 CCTV들 중 첫번째부터 마지막까지 DFS 탐색을 시작한다.
4. 각 탐색에서 CCTV를 네 방향으로 돌려보면서 다음 CCTV를 돌린다. (네 방향이므로 안돌아갈 수도 있다)
5. 만약 네 개의 CCTV를 모두 돌렸다면, 감시를 시작한다.
6. 감시한 칸의 개수를 통해 사각지대의 수를 세고 정답을 최솟값으로 갱신한다.

## 풀이 코드

```js
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
  // 사무실에 있는 칸의 총 개수
  const officeCount = N * M;
  // cctv를 찾고, 벽의 개수 세기
  const { cctvs, wallCount } = init(office);

  let answer = Number.MAX_SAFE_INTEGER;

  // 첫번재부터 마지막까지 cctv를 돌려보기
  const dfs = (index) => {
    // 마지막 cctv까지 돌렸다면
    if (index === cctvs.length) {
      // 참조를 끊기 위해 복사
      const newOffice = office.map((row) => [...row]);
      // 모든 cctv로 사무실 감시
      const watchCount = watchOffice(N, M, newOffice, cctvs);
      // 사각지대 = 사무실 칸의 총 개수 - 벽의 개수 - 감시한 칸의 수 - cctv의 수
      const deadZoneCount = officeCount - wallCount - watchCount - cctvs.length;

      // 정답 갱신
      answer = Math.min(answer, deadZoneCount);

      return;
    }

    // 네 방향으로 cctv돌려보기 - 0인 경우 돌리지 않고 다음 cctv를 돌리러 갈 수 잇음
    for (let dir = 0; dir < 4; dir++) {
      // cctv 돌리기
      rotateCCTV(cctvs[index]);
      // 다음 cctv를 돌리러 감
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
    1: [0], // 우
    2: [0, 2], // 우
    3: [0, 3], // 우, 상
    4: [0, 2, 3], // 우, 좌, 상
    5: [0, 1, 2, 3], // 우, 하, 좌, 상
  };

  // cctv 타입에 따라 감시할 방향 지정
  return { r, c, dirs: cctvType[type] };
};

// cctv 돌리기
const rotateCCTV = (cctv) => {
  cctv.dirs = cctv.dirs.map((dir) => (dir + 1) % 4);
};

// 감시하기
const watchOffice = (N, M, office, cctvs) => {
  // 감시한 칸의 수
  let count = 0;

  // 모든 cctv에 대해
  cctvs.forEach(({ r, c, dirs }) => {
    // 현재 cctv의 모든 방향으로
    dirs.forEach((dir) => {
      const [dr, dc] = DIRECTIONS[dir];

      let nr = r + dr;
      let nc = c + dc;

      // 사무실 안이고, 벽이 아닐 때까지
      while (isInOffice(N, M, nr, nc) && !isWall(office, nr, nc)) {
        // 만약 cctv나 이미 감시하는 곳일 경우 감시 표시를 할 필요가 없음
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
```
