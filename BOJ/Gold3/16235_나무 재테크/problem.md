# 16235. 나무 재테크

## 문제 링크

https://www.acmicpc.net/problem/16235

## 문제 분류

: 구현, 자료 구조

## 소요 시간

: 1시간 30분

## 풀이 방법

매년 사계절을 보낸 후에 살아남은 나무의 수를 구하는 문제였다. 문제에서 r, c와 x, y의 값을 모두 이야기하기 때문에 이를 이해하는데 시간을 많이 소모했다. y값이 당연히 행이라고 생각한 잘못이었다. 또, 시작 양분이 5라는 것을 놓쳐서 전체적으로 50분정도를 소모한 것 같다. 문제를 조금 더 자세히 읽고, 문제 이해 능력을 길러야겠다.

처음에는 나무를 각각 객체로 만들고, 나무 배열을 생성해서 풀이하려고 했었다. 그러나 N에 비해서 나무의 수가 극단적으로 많이 증가할 수 있기 때문에 그런지 시간초과가 발생했다.

그래서 다음으로 생각한 것은 땅의 크기와 같이 N \* N 크기의 나무를 담을 3차원 배열을 생성했다. 땅의 각 칸의 배열에는 나무들이 담긴다. 이 방식으로 문제를 풀이할 수 있었다.

## 풀이 코드

```js
const solution = (N, M, K, nourishments, initialTrees) => {
  // N * N 크기의 양분을 표시할 땅과 나무 위치를 나타내느 배열을 각각 생성
  const { ground, trees } = init(N, initialTrees);

  let year = 0;

  // K년이 지날 때까지
  while (year < K) {
    // 전반기(봄, 여름) 보내기
    passFirstHalfOfYear(N, ground, trees);
    // 하반기(가을, 겨울) 보내기
    passSecondHalfOfYear(N, ground, nourishments, trees);
    year++;
  }

  // 나무의 수 반환
  return trees.reduce((total, row) => {
    return total + row.reduce((count, cell) => count + cell.length, 0);
  }, 0);
};

const init = (N, initialTrees) => {
  const ground = Array.from(Array(N), () => Array(N).fill(5));
  const trees = Array.from(Array(N), () => Array(N).fill().map(() => [])); // prettier-ignore

  initialTrees.forEach(([r, c, age]) => trees[r - 1][c - 1].push(age));

  return { ground, trees };
};

// 봄, 여름
const passFirstHalfOfYear = (N, ground, trees) => {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      // 나무가 없다면 건너뛰기
      if (!trees[r][c].length) continue;

      // 봄에 나무 성장시키기
      const [aliveTrees, nourishmentsFormDead] = growTrees(ground, trees, r, c);

      // 현재 나무들을 살아남은 나무들로 교체
      trees[r][c] = aliveTrees;
      // 여름에 죽은 나무들의 영양분을 땅에 더하기
      ground[r][c] += nourishmentsFormDead;
    }
  }
};

const growTrees = (ground, trees, r, c) => {
  const aliveTrees = [];
  const currentTrees = trees[r][c];

  // 죽은 나무들의 영양분이 담길 변수
  let nourishmentsFormDead = 0;

  // 어린 나무부터니까 정렬해준다.
  currentTrees.sort((a, b) => a - b);

  // 어린 나무부터 땅의 영양분 자기 나이만큼 먹기
  currentTrees.forEach((tree) => {
    // 자기 나이만큼 영양분을 못 먹으면 죽음
    if (ground[r][c] < tree) {
      // 나이의 반 영양분으로
      nourishmentsFormDead += Math.floor(tree / 2);
      return;
    }

    // 영양분에서 나무의 나이만큼 빼기
    ground[r][c] -= tree;
    // 살아남은 나무
    aliveTrees.push(tree + 1);
  });

  return [aliveTrees, nourishmentsFormDead];
};

// 가을, 겨울
const passSecondHalfOfYear = (N, ground, nourishments, trees) => {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      // 겨울 - 땅에 영양분 더하기
      addNourishment(ground, nourishments, r, c);

      // 나무가 없다면 번식할 나무도 없음
      if (!trees[r][c].length) continue;

      // 가을 - 나무 번식시키기
      breed(trees, r, c);
    }
  }
};

const breed = (trees, r, c) => {
  // 나무에서 8방향으로
  const dirs = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  const currentTrees = trees[r][c];

  currentTrees.forEach((tree) => {
    // 나이가 5의 배수가 아니면 번식 불가
    if (!canBreeding(tree)) return;

    // 각 방향으로
    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      // 땅을 벗어나는지 확인
      if (!isInGround(N, nr, nc)) return;

      // 새 나무 추가
      trees[nr][nc].push(1);
    });
  });
};

const canBreeding = (age) => age % 5 === 0;

const isInGround = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const addNourishment = (ground, nourishments, r, c) => {
  ground[r][c] += nourishments[r][c];
};
```
