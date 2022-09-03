# 감시 피하기 - 18428

[문제 링크](https://www.acmicpc.net/problem/18428)

## 문제 풀이

### 풀이 설명

백트래킹과 DFS를 통해 문제를 풀이할 수 있었다.

1. 백트래킹을 이용해 복도의 모든 위치에 장애물을 설치해본다. (순열, Permutaion)
2. 장애물이 세 개가 설치되면, 선생님들의 위치에서 학생들을 볼 수 있는지 확인해본다.
3. DFS를 이용해서 확인하는데, N \* N의 모든 곳을 탐색하는 게 아닌 선생님의 위치에서 상하좌우로만 탐색을 진행한다.
4. 학생들을 못 찾게 되면 YES, 찾을 수 있다면 NO를 출력한다.

### 풀이한 코드

```js
const input = require('fs').readFileSync('./input2.txt').toString().trim().split('\n'); // prettier-ignore
const N = Number(input.shift());
const map = input.map((line) => line.split(" "));

function solution(N, map) {
  const STUDENT = "S";
  const TEACHER = "T";
  const OBSTACLE = "O";
  const BLANK = "X";

  const DX = [0, 1, 0, -1];
  const DY = [1, 0, -1, 0];

  const visited = Array.from(Array(N), () => Array(N).fill(false));
  let result = false;

  // 장애물 설치하기
  const putObstacle = (visited, cnt) => {
    // 세 개를 설치했다면 감시를 모두 피하는지 확인해보기
    if (cnt === 3) {
      observe();
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const current = map[i][j];

        // 현재 위치가 비어 있고, 방문하지 않은 곳이라면
        if (current === BLANK && !visited[i][j]) {
          visited[i][j] = true;
          map[i][j] = OBSTACLE;

          putObstacle(visited, cnt + 1);

          map[i][j] = BLANK;
          visited[i][j] = false;
        }
      }
    }
  };

  // 학생을 감시하는 함수
  const observe = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const current = map[i][j];

        if (current === TEACHER) {
          for (let k = 0; k < 4; k++) {
            let nx = i + DX[k];
            let ny = j + DY[k];
            let isFoundStudent = findStudent(nx, ny, DX[k], DY[k]);

            if (isFoundStudent) return;
          }
        }
      }
    }

    result = true;
  };

  // dfs로 학생이 보이는지 체크하기
  const findStudent = (i, j, x, y) => {
    if (0 <= i && i < N && 0 <= j && j < N) {
      const current = map[i][j];

      if (current === OBSTACLE) return false;
      else if (current === STUDENT) return true;
      else return findStudent(i + x, j + y, x, y);
    }

    return false;
  };

  putObstacle(visited, 0);

  return result ? "YES" : "NO";
}

console.log(solution(N, map));
```

### 코드 개선

코드의 속도는 조금 더 느려졌지만, 메모리가 개선되었고, 전역 변수를 사용해 답을 도출하지 않게 만들었다.

```js
// prettier-ignore
const input = require('fs').readFileSync('./input2.txt').toString().trim().split('\n');
const N = Number(input.shift());
const map = input.map((line) => line.split(" "));

function solution(N, map) {
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  // 장애물을 설치한 결과 학생들을 찾을 수 없다면 YES 아니라면 NO를 출력한다.
  return putObstacle(N, map, visited, 0) ? "YES" : "NO";
}

// 장애물을 설치하는 함수
// Permutation(순열)을 이용해 장애물 세 개를 설치하는 모든 경우의 수를 탐색할 수 있게 한다.
const putObstacle = (N, map, visited, count) => {
  // 세 개가 설치되었다면
  if (count === 3) {
    // 학생을 찾을 수 없다면 장애물 설치 성공
    if (!isStudentsFound(N, map)) return true;

    return false;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 장애물을 설치할 수 있는 곳이 아니고, 방문한 적이 있는 곳이라면 건너뛴다.
      if (map[i][j] !== "X" || visited[i][j]) continue;

      // 방문처리 후 장애물 설치
      visited[i][j] = true;
      map[i][j] = "O";

      // 세 개가 설치될 때까지 다시 장애물 설치를 위한 함수 호출
      if (putObstacle(N, map, visited, count + 1)) return true;

      // 다른 곳에 설치할 경우를 위해 방문 처리 및 장애물 제거
      map[i][j] = "X";
      visited[i][j] = false;
    }
  }

  return false;
};

// 힉생들의 발견 여부를 반환하는 함수
const isStudentsFound = (N, map) => {
  const DX = [0, 1, 0, -1];
  const DY = [1, 0, -1, 0];

  // 복도의 모든 곳을 탐색하면서
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 선생님의 위치 찾기
      if (map[i][j] !== "T") continue;

      // 선생님의 위치에서 상하좌우로 탐색
      for (let dir = 0; dir < 4; dir++) {
        let nx = i + DX[dir];
        let ny = j + DY[dir];
        // 학생의 발견 여부
        let isFound = findStudents(N, map, nx, ny, DX[dir], DY[dir]);

        // 발견되었다면 종료
        if (isFound) return true;
      }
    }
  }

  // 여기까지 왔다면 학생을 찾지 못한 것
  return false;
};

// DFS를 통해 복도 탐색하기
const findStudents = (N, map, i, j, x, y) => {
  // 복도의 범위를 벗어나지 않았다면
  if (0 <= i && i < N && 0 <= j && j < N) {
    const current = map[i][j];

    // 학생이라면
    if (current === "S") return true;
    // 장애물이라면
    if (current === "O") return false;
    // 선생님이거나 빈 곳인 경우 계속 탐색
    return findStudents(N, map, i + x, j + y, x, y);
  }

  return false;
};

console.log(solution(N, map));
```
