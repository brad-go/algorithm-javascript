# 빵집 - 3109

[문제 링크](https://www.acmicpc.net/problem/3109)

## 문제 풀이

이 문제는 **그리디를 사용하는 DFS** 문제였다. 문제의 입력대로 오른쪽 위, 오른쪽, 오른쪽 아래 순서로 재귀적으로 탐색을 수행해야했다.

한 번 탐색했다가 실패한 길은 그 다음 탐색에서도 탐색하지 않아도 된다. 즉, 탐색하는 길을 방문 체크하지만, 탐색 실패 후에 다시 방문 해제를 하지 않아도 된다. 탐색에 성공한 길은 이미 파이프가 설치되므로 체크 해제를 하지 않고, 탐색에 실패한 길은 다른 파이프가 탐색해도 실패하는 길이므로 체크를 해지하지 않아도 된다.

또 하나의 문제는 **어떻게 하면 재귀적으로 들어온 DFS를 끝내는가?** 였다. 문제를 풀이하다가 반복문을 통해 각 시작 지점에서 탐색을 진행하게 했는데 첫번째 탐색에서 거의 모든 곳을 탐색해버렸기 때문에 위와 같은 고민을 하게 되었다.

사실 당연한 거였다. 탐색 종료 조건에 도달하면 탐색을 끝내야 하는데, 계속해서 파생된 탐색 루트를 탐색하기 때문이다. 그래서 종료 조건에 도달하는 순간 재귀적으로 들어온 DFS를 끝낼 수 있도록, DFS의 반환값을 `void`가 아닌 `number`로 설정해주었다.

`number`로 설정하면서 종료 조건에 도달하면 파이프가 하나 연결된 것이므로 1을 반환하게 만들었고, 이 값을 모두 더해 결과값을 구하도록 만들었다.

### 풀이 과정

1. 각 행의 첫번째 지점에서 DFS를 실행한다. (`0` ~ `R - 1`)
2. 오른쪽 위, 오른쪽, 오른쪽 아래 순서로 탐색을 진행한다.
3. map의 범위를 벗어나지 않고, 다음 지점에 건물이없고, 방문하지 않은 곳인지 체크한다.
4. 재귀적으로 DFS를 호출하고 반환값이 0이 아니라면 끝에 도달한 것이므로 DFS를 종료하고, 그 값을 반환한다.
5. 각 DFS의 결과값을 더해서 정답을 출력한다.

### 전체 코드

```js
// prettier-ignore
const [rc, ...map] = require('fs').readFileSync('./input2.txt').toString().trim().split('\n');
const [R, C] = rc.split(" ").map(Number);

// 오른쪽 위, 오른쪽, 오른쪽 아래
const DR = [-1, 0, 1];
const DC = [1, 1, 1];

function solution(R, C, map) {
  const visited = Array.from(Array(R), () => Array(C).fill(false));
  // 각 열의 첫번째 행에서 DFS 탐색을 진행하면서 결과값을 모두 더한다. (연결에 성공한 파이프의 수)
  const answer = map.reduce((pipe, _, idx) => {
    return pipe + dfs(R, C, map, visited, idx, 0);
  }, 0);

  return answer;
}

const dfs = (R, C, map, visited, r, c) => {
  visited[r][c] = true;

  // 끝에 도달했다면 파이프 연결에 성공한 것이므로 1을 반환
  if (c === C - 1) return 1;

  for (let dir = 0; dir < 3; dir++) {
    const nr = r + DR[dir];
    const nc = c + DC[dir];

    // 범위 안인지, 건물이 있는 곳이 아닌지 방문했던 곳인지 체크
    if (isInRange(R, C, nr, nc) && map[nr][nc] === "." && !visited[nr][nc]) {
      // 파이프 연결의 성공 여부 반환
      const pipes = dfs(R, C, map, visited, nr, nc);
      if (pipes) return 1; // 파이프 연결에 성공했다면, DFS를 재귀적으로 더이상 실행하지 않고, 바로 종료
    }
  }

  // 연결 실패 시 0을 반환
  return 0;
};

const isInRange = (R, C, r, c) => {
  return 0 <= r && r < R && 0 <= c && C;
};

console.log(solution(R, C, map));
```
