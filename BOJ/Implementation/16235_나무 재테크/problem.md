# 나무 재테크 - 16235

[문제 링크](https://www.acmicpc.net/problem/16235)

## 문제 풀이

3차원 배열을 이용해서 문제 풀이에 도전했었는데, 시간 초과로 인해 실패했었다. 그래서 양분의 상태를 나타내는 맵과 나무들을 나타내는 트리 배열을 따로 관리하기로 결정했다.
핵심적인 것은 정렬을 사용하지 않는 것이라고 생각한다. 새로 생성되는 나무들의 나이는 무조건 1이기 때문에, 봄에 나무들이 양분을 먹는 과정에서 트리 배열을 매번 정렬해줄 필요없이 새로 삽입할 때 앞에다가 집어넣어주면 해결되기 때문에 시간 복잡도가 많이 개선된다고 생각한다.

### 풀이 설명

1. 나무 클래스를 생성한다.
2. 땅의 양분의 상태를 나타낼 2차원 배열 map을 생선한다.
3. while문을 통해 다음을 K번 동안 반복한다.

   1. [ 봄 ]

   - 트리배열을 순환하면서 아래를 수행한다.
   - 나이가 위치하고 있는 땅의 양분보다 많다면 나무는 죽고 죽은 나무 배열에 추가된다.
   - 아니라면, 현재 땅에서 나무의 나이만큼 양분을 제거하고 새 나무 배열에 추가한다.
   - 자라난 나무들과 죽은 나무들을 반환한다.

   2. [ 여름 ]

   - 죽은 나무 배열을 순환하면서 땅에 나무의 나이 / 2 만큼 양분을 추가한다.

   3. [ 가을 ]

   - 봄에 자라난 나무들의 나이를 확인하고 번식기가 되었다면, 자신을 기준으로 8방향으로 새로운 나무를 생성 시킨다.
   - 새로 생성된 나무들을 반환한다.

   4. [ 겨울 ]

   - 입력만큼 일정하게 땅에 양분을 추가한다.

   5. 나무를 담은 배열을 새로 생성된 나무, 자라난 나무들 순으로 업데이트한다.

### 전체 코드

```js
class Tree {
  constructor(r, c, age) {
    this.r = r;
    this.c = c;
    this.age = age;
    this.isAlive = true;
  }

  grow() {
    this.age += 1;
  }

  isBreedingAge() {
    return this.age % 5 === 0;
  }

  die() {
    this.isAlive = false;
  }
}

// prettier-ignore
const input = require('fs').readFileSync('./input8.txt').toString().trim().split('\n');
const [N, M, K] = input[0].split(" ").map(Number);
const NOURISHMENT = input
  .slice(1, N + 1)
  .map((row) => row.split(" ").map(Number));
const trees = input
  .slice(N + 1)
  .map((tree) => {
    const [r, c, age] = tree.split(" ").map((v) => v - 1);
    return new Tree(r, c, age + 1);
  })
  .sort((a, b) => a.age - b.age);

const solution = (N, M, K, trees) => {
  const map = Array.from(Array(N), () => Array(N).fill(5));

  while (K > 0) {
    const [grownTrees, deadTrees] = spring(map, trees);
    summer(map, deadTrees);
    const newTrees = fall(grownTrees);
    winter(map);

    trees = [...newTrees, ...grownTrees];
    K--;
  }

  console.log(trees.length);
};

const spring = (map, trees) => {
  const grwonTrees = [];
  const deadTrees = [];

  trees.forEach((tree) => {
    const { r, c, age } = tree;

    if (age > map[r][c]) {
      deadTrees.push(tree);
      return;
    }

    map[r][c] -= age;
    grwonTrees.push(new Tree(r, c, age + 1));
  });

  return [grwonTrees, deadTrees];
};

const summer = (map, deadTrees) => {
  deadTrees.forEach((tree) => {
    const { r, c, age } = tree;
    const nourishment = Math.trunc(age / 2);

    map[r][c] += nourishment;
  });
};

const fall = (trees) => {
  const BREED_RANGE = 8;
  const DR = [-1, -1, -1, 0, 0, 1, 1, 1];
  const DC = [-1, 0, 1, -1, 1, -1, 0, 1];

  const newTrees = [];

  trees.forEach((tree) => {
    const { r, c } = tree;

    if (tree.isBreedingAge()) {
      for (let dir = 0; dir < BREED_RANGE; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (isInRange(nr, nc)) newTrees.push(new Tree(nr, nc, 1));
      }
    }
  });

  return newTrees;
};

const winter = (map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      map[i][j] += NOURISHMENT[i][j];
    }
  }
};

const isInRange = (nr, nc) => {
  if (0 <= nr && nr < N && 0 <= nc && nc < N) return true;
  return false;
};

solution(N, M, K, trees);
```

### 코드 개선

코드를 조금 더 개선하면 다음과 같다. 트리 클래스를 직접 구현하지 않고, 3차원 배열 trees에 나무들의 나잇값들을 넣어서 풀이한 코드다.

```js
// prettier-ignore
const input = require('fs').readFileSync('./input4.txt').toString().trim().split('\n');
const [N, M, K] = input[0].split(" ").map(Number);
const A = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const INITIAL_TREES = input.slice(N + 1).map((tree) => {
  const [r, c, age] = tree.split(" ").map((v) => v - 1);
  return [r, c, age + 1];
});
const map = Array.from(Array(N), () => Array(N).fill(5));
const trees = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

INITIAL_TREES.forEach((tree) => {
  const [r, c, age] = tree;
  trees[r][c].push(age);
});

const solution = (N, M, K, map, trees) => {
  while (K > 0) {
    springAndSummer(map, trees);
    fall(trees);
    winter(map);
    K--;
  }

  let aliveTrees = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!trees[i][j].length) continue;
      aliveTrees += trees[i][j].length;
    }
  }

  console.log(aliveTrees);
};

const springAndSummer = (map, trees) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!trees[i][j].length) continue;
      const aliveTrees = [];
      let ageOfDeadTrees = 0;

      const currentTrees = trees[i][j];

      currentTrees.forEach((treeAge) => {
        if (map[i][j] - treeAge >= 0) {
          map[i][j] -= treeAge;
          aliveTrees.push(treeAge + 1);
        } else {
          ageOfDeadTrees += Math.trunc(treeAge / 2);
        }
      });

      map[i][j] += ageOfDeadTrees;
      trees[i][j] = aliveTrees;
    }
  }
};

const fall = (trees) => {
  const BREED_RANGE = 8;
  const DR = [-1, -1, -1, 0, 0, 1, 1, 1];
  const DC = [-1, 0, 1, -1, 1, -1, 0, 1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!trees[i][j].length) continue;

      const breedingTrees = trees[i][j].filter((treeAge) => treeAge % 5 === 0);

      breedingTrees.forEach(() => {
        for (let dir = 0; dir < BREED_RANGE; dir++) {
          const nr = i + DR[dir];
          const nc = j + DC[dir];

          if (isInRange(nr, nc)) trees[nr][nc].unshift(1);
        }
      });
    }
  }
};

const winter = (map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      map[i][j] += A[i][j];
    }
  }
};

const isInRange = (nr, nc) => {
  if (0 <= nr && nr < N && 0 <= nc && nc < N) return true;
  return false;
};

solution(N, M, K, map, trees);
```
