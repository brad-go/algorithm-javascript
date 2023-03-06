# 15684. 사다리 조작

## 문제 링크

https://www.acmicpc.net/problem/15684

## 문제 분류

: 구현, 브루트포스 알고리즘, 백트래킹

## 소요 시간

: 3시간

## 풀이 방법

이 문제는 사다리를 어떻게 나타낼 것인지가 중요한 문제였다고 생각한다. 처음에 사다리가 연결된 것들을 보고 그래프를 통해 풀이할 수 있겠다 싶었지만, 가로 줄의 높이에 따라서 동일한 두개의 세로 줄을 연결하는 경우가 있어 그래프로 나타낼 수는 없었다. 그렇다면 남은 방법은 이차원 배열로 나타내는 것이다.

이차원 배열로 각 사다리의 세로 줄마다 연결되는 세로줄에 대한 값을 넣고 문제를 풀이하려고 했지만, 풀이가 꽤나 까다로웠다. 그래서 다른 방법을 생각했는데, 바로 세로줄의 값으로 가로 줄의 연결 상태를 boolean값으로 나타내는 것이다. 이 아이디어가 문제 풀이의 핵심인 것 같다. 예를 들어, 1번 줄에서 2번 줄로 가는 가로 줄이 있다면, true로 나타내보자. 그렇다면 1번줄일 때는 현재 값이 true라면 2번줄로 이동하고, 2번줄에서는 현재 값 -1 번줄이 true라면 1번줄로 이동하면 된다. 즉, N개의 열이 아닌 N - 1개의 열로 사다리를 나타낼 수 있다.

즉, 다음과 같이 풀이할 수 있다.

1. 입력받은 가로 줄의 개수인 M부터 확인한다. M이 0이라면 모든 세로 줄은 자신을 가리키게 되므로 더 이상 가로줄을 그릴 필요가 없다.
2. H개의 행, N - 1개의 열로 2차원 배열로 사다리를 생성한다.
3. 입력받은 가로 줄 정보를 사다리에 표시한다(1번에서 2번줄이 첫번째 행에서 연결되어있다면, ladder[0][0]에 true로 표시한다).
4. DFS 탐색을 통해 사다리에 가로줄을 그려보기 시작한다.
5. 가로줄을 그릴 때는 현재 위치에 이미 가로줄이 그려져있는지, 왼쪽과 오른쪽에 가로줄을 그렸는지 확인하고, 이 조건들에 해당하면 현재 위치는 가로줄을 그리지 않고 건너뛴다. 그렇지 않다면 가로줄을 그려보고 탐색을 계속한다.
6. 탐색하면서 가로줄을 그었을 때, 모든 사다리의 시작점이 끝에서도 자신을 가리키는지 확인하고, 만약 그렇다면 정답을 현재 그은 가로줄의 개수로 갱신한다.
7. 만약 사다리를 세 개 그렸다면 탐색을 종료한다.

## 풀이 코드

```js
const solution = (N, M, H, lines) => {
  // 가로선이 주어지지 않았을 경우 모든 세로선은 자신을 향하게 된다.
  if (M === 0) return 0;

  // H행, N-1열의 사다리 생성
  const ladder = createLadder(N, H, lines);

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (index, count) => {
    // 사다리를 세 개 설치했거나, 맨 아래까지 내려왔다면 종료
    if (count > 3) return;

    // 만약, 현재 사다리의 시작점들이 끝에서도 모두 자신의 번호를 가리킨다면 정답 갱신
    if (isValid(N, ladder)) {
      answer = Math.min(answer, count);
    }

    // 이전 행부터 사다리의 모든 칸들을 탐색
    for (let row = index; row < H; row++) {
      // N - 1의 행이 있으므로
      for (let column = 0; column < N - 1 column++) {
        // 만약 가로줄을 그릴 수 없는 칸이라면 건너뛰기
        if (!canDraw(N, ladder, row, column)) continue;

        // 가로 줄 긋기
        ladder[row][column] = true;

        // 가로 줄을 그은 상태로 다음 가로 줄 그을 곳을 찾으러 가기
        dfs(row, count + 1);

        // 다음 분기를 위해 가로 줄 긋기 취소
        ladder[row][column] = false;
      }
    }
  };

  dfs(0, 0);

  // 3이 넘거나 불가능한 경우에는 -1, 아니면 정답을 출력
  return answer > 3 ? -1 : answer;
};

const createLadder = (N, H, lines) => {
  // 높이가 H, 세로 선이 N개 있는 사다리 생성
  const ladder = Array.from(Array(H), () => Array(N - 1).fill(false));

  // 입력받은 가로 선 정보 사다리에 그리기
  lines.forEach(([row, column]) => {
    ladder[row - 1][column - 1] = true;
  });

  return ladder;
};

// 가로줄을 그릴 수 있는지 체크
const canDraw = (N, ladder, row, column) => {
  // 현재 칸에 이미 선이 그어져있다면
  if (ladder[row][column]) return false;
  // 오른쪽 칸에 선이 그어져있다면
  if (column < N - 2 && ladder[row][column + 1]) return false;
  // 왼쪽 칸에 선이 그어져있다면
  if (column > 0 && ladder[row][column - 1]) return false;

  // 모두 아니면 그릴 수 있다.
  return true;
};

// 모두 자신을 향하는 사다리 타기 게임이라면
const isValid = (N, ladder) => {
  // 1번 사다리부터 N번 사다리까지 확인
  for (let i = 0; i < N; i++) {
    let column = i;
    let row = 0;

    // 맨 아래칸까지 내려올 때까지
    while (row < H) {
      // 현재칸이 가로줄이 그어져있다면
      // 예를 들어 1번에서 2번으로 이어진 줄이면
      // ladder[row][0]이 true니까 2번줄로 이동
      if (column < N - 1 && ladder[row][column]) {
        column += 1;
      // 현재 왼쪽 칸에 가로줄이 그어져있다면
      // 예를 들어 2번에서 1번줄로 이어진 줄이면
      // ladder[row][0]이 true니까 1번줄로 이동
      } else if (column > 0 && ladder[row][column - 1]) {
        column -= 1;
      }

      // 아래 칸으로 이동
      row += 1;
    }

    // 맨 아래까지 내려왔을때, 시작 번호와 다르다면
    if (column !== i) return false;
  }

  return true;
};
```

## 코드 개선

위 코드는 매 탐색마다 문제의 조건을 만족하는 사다리인지 체크를 한다. 그래서 코드가 비효율적이다. 위 코드를 개선하기 위해서 가로줄을 0개 부터 3개까지 그릴 때를 각각 탐색을 진행하면 훨씬 효율적으로 코드를 개선할 수 있다.

```js
const solution = (N, M, H, lines) => {
  if (M === 0) return 0;

  const ladder = createLadder(N, H, lines);

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (maxCount, index, count) => {
    // 그릴 가로줄의 최대개수만큼 그렸다면
    if (maxCount === count) {
      // 문제의 조건에 맞는 사다리인지 확인하고 맞다면 정답 갱신
      answer = isValid(N, ladder) ? maxCount : answer;
      return;
    }

    for (let row = index; row < H; row++) {
      for (let column = 0; column < N - 1; column++) {
        if (!canDraw(N, ladder, row, column)) continue;

        ladder[row][column] = true;

        dfs(maxCount, row, count + 1);

        ladder[row][column] = false;
      }
    }
  };

  // 가로줄을 0개 그릴 때부터 3개까지
  for (let maxCount = 0; maxCount <= 3; maxCount++) {
    // 사다리 그릴 곳 탐색
    dfs(maxCount, 0, 0);

    // 만약 값이 갱신되었다면 해당 사다리 개수로 문제 조건 만족.
    if (answer < 3) break;
  }

  return answer > 3 ? -1 : answer;
};

// ... 위 코드와 동일
```
