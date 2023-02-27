# 12100. 2048 (Easy)

## 문제 링크

https://www.acmicpc.net/problem/12100

## 문제 분류

: 구현, 브루트포스 알고리즘, 백트래킹

## 소요 시간

: 2시간

## 풀이 방법

2048 게임에서 움직일 때 새로운 블록이 추가되지 않는 경우, 최대 5번을 이동시켜서 얻을 수 있는 가장 큰 블록이 무엇인지 찾는 문제였다.

가장 먼저 고민한 것은 DFS, BFS 중에 어떤 것을 이용해서 백트래킹을 하냐였는데, 최댓값이 정해져있지 않으니 모든 분기를 탐색해야 하고, 최댓 이동 횟수가 5번으로 짧으니까 DFS를 사용해서 풀이해야겠다고 생각했다.

다음은 2차원 배열인 board에서 매번 블록들을 움직이거나, blocks 배열을 새로 만들어 각 블록들만을 가지고 움직이거나 둘 중에 어떤 방식으로 문제를 풀이 할지 고민했다. 나같은 경우에는 후자의 경우가 가로, 세로에 요소를 확인하고 합치거나 제거하기 용이할 것 같아서 후자를 선택했다. 추가적으로 값을 가진 블록들만을 관리하므로 0을 고려하지 않아도 돼서 더 편할 것 같았다.

다음은 블록이 움직일 수 없는 경우를 생각해야했다. 같은 수만이 합쳐질 수 있으므로 이동하려는 방향의 열이나 행이 꽉 차있을 때, 같은 수가 없는 경우는 움직일 수 없다.

그리고 필요한 함수들을 떠올렸다. 블록들을 움직일 `moveBlocks`, 블록을 합치는 `combineBlocks`, 움직일 수 있는 상태인지 체크하는 `isMovable`. 이 정도를 생각하고 블록을 상하좌우로 움직이는 함수부터 만들기 시작했고, 이 부분을 만들고나니 dfs 탐색을 통해 쉽게 문제를 해결할 수 있었다.

1. 보드에서 값이 0 이상인 블록들의 위치를 찾아 blocks 배열에 저장한다.
2. 아래의 dfs 탐색을 통해 최대 5번까지 이동하며, 블록들 중 최댓값을 찾는다.
3. 매 탐색마다 네 방향으로 블록을 움직인다. 블록은 아래와 같이 움직인다.
4. 블록이 그대로 참조되지 않도록 기존 블록을 복사한다.
5. 각 블록들을 현재 지정된 방향으로 한 행 혹은 한 열씩 이동시킨다.
6. 각 행이나 열이 꽉차 있으면서 서로 모두 다른 수라면 움직일 수 없으므로 넘어간다.
7. 이동시킬 때 같은 수를 만났다면 합쳐준다. (두개씩만 합친다)
8. 합친 블록들의 위치를 각 방향의 시작쪽으로 조정해준다.
9. 이동을 마쳤다면 이동한 블록들과 기존 블록들을 비교해 기존 위치와 값이 변경되었는지 체크한다.
10. 변경되었다면 이동된 블록들을 가지고 탐색을 진행하고, 아닌 경우 분기를 제거한다.

## 풀이 코드

```js
const DIRECTION = {
  left: 0,
  up: 1,
  right: 2,
  down: 3,
};

const solution = (N, board) => {
  // 값이 0이 아닌 블록들을 찾아 저장
  const blocks = findBlocks(N, board);

  // 최댓값을 담을 변수
  let answer = 0;

  // dfs 탐색
  const dfs = (blocks, count) => {
    // 5번을 움직였다면 최댓값을 비교해서 저장
    if (count === 5) {
      answer = Math.max(answer, findMaxBlock(blocks));
      return;
    }

    // 네 방향으로 블록을 이동시켜보기
    for (let dir = 0; dir < 4; dir++) {
      // 각 방향으로 이동한 블럭들
      const movedBlocks = moveBlocks(N, blocks, dir);

      // 기존 위치와 값이 변경된 게 없다면 해당 분기 탐색 종료
      if (blocks.length === movedBlocks.length && isStop(blocks, movedBlocks))
        continue;

      // 이동한 블럭들을 가지고 계속 최댓값 탐색
      dfs(movedBlocks, count + 1);
    }
  };

  dfs(blocks, 0);

  return answer;
};

// 블록들 찾기
const findBlocks = (N, board) => {
  const blocks = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!board[i][j]) continue;

      // 블록을 찾았다면 객체로 만들어주기
      blocks.push(makeBlock(i, j, board[i][j]));
    }
  }

  return blocks;
};

// 블록 객체 생성
const makeBlock = (r, c, value, isCombined = false) => {
  return { r, c, value, isCombined };
};

// 블록들을 이동시켜주는 함수
const moveBlocks = (N, blocks, direction) => {
  // 기존 블록의 참조를 제거해 각기 다른 분기가 될 수 있도록 복사
  const originBlocks = blocks.map((block) => ({ ...block }));
  // 이동한 블록을 담을 배열
  const newBlocks = [];

  // 각 블록들을 이동시키기
  for (let i = 0; i < N; i++) {
    // 방향에 따라서 행으로 묶을지 열로 묶을지 결정해줄 변수
    const rowColumn = isHorizontal(direction) ? "r" : "c";
    // 방향에 따라 행이나 열로 묶어주기
    const line = originBlocks.filter((block) => block[rowColumn] === i);

    // 현재 행이나 열이 이동할 수 없다면 그대로
    if (!isMovable(N, line)) {
      newBlocks.push(...line);
      continue;
    }

    // 현재 행이나 블록을 이동한 방향으로 합쳐주기
    const combined = combineBlocks(line, direction);

    // 합쳐진 블록들의 위치를 각 방향으로 조정해주기
    updateBlocks(combined, direction, N - 1);
    newBlocks.push(...combined);
  }

  return newBlocks;
};

// 블록이 움직일 수 있는지 확인
const isMovable = (N, line) => {
  // 현재 라인의 각 요소가 보드의 크기(N)만큼있다면 움직일 수 없는 것
  return new Set(line.map(({ value }) => value)).size < N;
};

// 각 행이나 열의 블록들을 합쳐주기
const combineBlocks = (line, direction) => {
  // 각 방향에 가까운 쪽을 먼저 합쳐야 하기 때문에 다른 함수를 사용
  if (direction === DIRECTION.left || direction === DIRECTION.up) {
    combineBlocksAscending(line);
  } else {
    combineBlocksDescending(line);
  }

  // 합쳐져서 사라져야 할 블록 제거
  return line.filter((block) => !block.isCombined);
};

// 왼쪽이나 위쪽의 경우
const combineBlocksAscending = (line) => {
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i].value === line[i + 1].value) {
      line[i].value += line[i + 1].value;
      line[i + 1].isCombined = true;
      i++;
    }
  }
};

// 오른쪽이나 아래쪽의 경우
const combineBlocksDescending = (line) => {
  for (let i = line.length - 1; i > 0; i--) {
    if (line[i].value === line[i - 1].value) {
      line[i].value += line[i - 1].value;
      line[i - 1].isCombined = true;
      i--;
    }
  }
};

// 블록들의 위치를 최신화
const updateBlocks = (line, direction, value) => {
  // 상하좌우에 따라 열이될지 행이될지 경정
  const rowColumn = isHorizontal(direction) ? "c" : "r";

  if (direction === DIRECTION.left || direction === DIRECTION.up) {
    // 왼쪽이나 위의 경우 앞쪽부터 채운다.
    for (let i = 0; i < line.length; i++) {
      line[i][rowColumn] = i;
    }
  } else {
    // 오른쪽이나 아래쪽의 경우 뒤쪽부터 채운다.
    for (let i = line.length - 1; i >= 0; i--) {
      line[i][rowColumn] = value;
      value--;
    }
  }
};

// 방향이 좌우인지
const isHorizontal = (direction) => {
  return direction === DIRECTION.left || direction === DIRECTION.right;
};

// 가장 큰 블록의 값 찾기
const findMaxBlock = (blocks) => {
  return Math.max(...blocks.map(({ value }) => value));
};

// 블록들이 이동했는지 안했는지 체크
const isStop = (origin, moved) => {
  origin.every((block, index) => {
    const movedBlock = moved[index];

    return block.r === movedBlock.r && block.c === movedBlock.c;
  });
};
```
