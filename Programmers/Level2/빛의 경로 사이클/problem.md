# 빛의 경로 사이클

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/86052

## 문제 분류

: 완전 탐색

## 풀이 과정

처음 문제를 이해하는 데 어려움을 겪었다. 빛이 모든 칸을 지나서 제자리로 돌아오면 그것이 사이클이라고 생각했는데, 그렇지 않았다. 모든 칸을 지나지 않아도 제자리로 돌아오고, 제자리로 돌아오기까지의 경로가 반복되어야 사이클이라고 할 수 있었다.

핵심은 **특정한 위치로 같은 방향의 빛을 쏜 적이 있다면, 해당 사이클이 이미 존재**한다는 것이다. 같은 방향, 같은 위치에서 빛이 같은 경로로 이동할 것이기 때문에 해당 사이클은 이미 존재하는 것이므로 체크할 필요가 없다.

이러한 같은 방향, 위치를 파악하기 위해 2차원 그리드의 각 셀에서 4방향에 대한 방문처리가 필요하므로 3차원 배열로 visited 배열을 만들어줘야했다. 어떻게 보면 경로를 나타내는 것이니 routes로 표현해도 좋을 것 같다.

1. 입력받은 그리드의 각 칸에서 4방향에 대해 빛을 쏘아본다. 즉, 각 칸과 방향을 시작점으로 bfs 탐색을 진행한다. 만약 이미 이동한 경로라면 건너뛴다.
2. 다음 방향은 현재 칸이 결정한다. 현재 칸이 S라면 그대로, L이라면 왼쪽으로, R이라면 오른쪽으로 현재 방향을 기준으로 꺽어준다.

- DR, DC를 통해 우, 하, 좌, 상에 대해 한 칸씩 이동할 수 있도록 한다.
- S는 그대로 L이라면 (dir + 3) % 4, R이라면 (dir + 1) % 4를 통해 현재 칸에 의해 꺽일 방향을 나타낼 수 있다.

3. 다음 칸은 현재 칸에 위에서 구한 방향으로 한칸씩 이동한 값이다. 만약 그리드를 벗어났다면 반대 방향으로 올 수 있도록 값을 구해준다.
4. 해당 칸, 방향에 대해 방문처리를 해준다.
5. 만약 시작점을 방문했다면 현재까지 사이클의 길이를 반환해준다.
6. 아니라면 다음 칸으로 빛을 쏘며 탐색을 진행한다.

## 풀이 코드

```js
const solution = (grid) => {
  const ROW_LEN = grid.length;
  const COL_LEN = grid[0].length;

  const cycles = [];
  // 그리드의 각 칸에서 4방향에 대한 이동 경로를 방문처리
  const visited = Array.from({ length: ROW_LEN }, () => {
    return Array.from({ length: COL_LEN }, () => Array(4).fill(0));
  });

  const bfs = (sr, sc, sdir) => {
    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];

    const queue = [[sr, sc, sdir, 0]];
    // if 문 대신 사용.
    // L은 0 -> 3, 1 -> 0, 2 -> 1, 3 -> 2
    // R은 0 -> 1, 1 -> 2, 2 -> 3, 3 -> 0
    // 인것을 이용해 아래 식을 구현
    const direction = {
      S: (dir) => dir,
      L: (dir) => (dir + 3) % 4,
      R: (dir) => (dir + 1) % 4,
    };

    while (queue.length) {
      // 현재 칸, 방향, 사이클 길이
      const [r, c, dir, len] = queue.shift();

      // 다음 방향 구하기
      const ndir = direction[grid[r][c]](dir);
      // 다음 칸 구하기. 범위를 벗어난다면 반대로 돌아올 수 있도록 하기
      const nr = r + DR[ndir] < 0 ? ROW_LEN - 1 : (r + DR[ndir]) % ROW_LEN;
      const nc = c + DC[ndir] < 0 ? COL_LEN - 1 : (c + DC[ndir]) % COL_LEN;

      // 해당 이동 경로에 대해 방문처리
      visited[nr][nc][ndir] = 1;

      // 처음 이동 경로를 다시 방문했다면 사이클을 생성한 것. 사이클 길이 반환
      if (visited[sr][sc][sdir]) return len + 1;

      // 다음 경로로 탐색 진행하기
      queue.push([nr, nc, ndir, len + 1]);
    }
  };

  // 그리드의 각 칸, 각 방향에 대해 bfs 탐색 -> 모든 칸에서 모든 방향으로 빛을 쏘아보기
  for (let r = 0; r < ROW_LEN; r++) {
    for (let c = 0; c < COL_LEN; c++) {
      for (let dir = 0; dir < 4; dir++) {
        // 이미 방문한 경로라면 건너뛰기
        if (visited[r][c][dir]) continue;

        // 사이클의 길이를 추가
        cycles.push(bfs(r, c, dir));
      }
    }
  }

  // 오름차순으로 정렬해서 반환
  return cycles.sort((a, b) => a - b);
};
```
