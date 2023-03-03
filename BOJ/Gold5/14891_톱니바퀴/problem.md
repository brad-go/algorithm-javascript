# 14891. 톱니바퀴

## 문제 링크

https://www.acmicpc.net/problem/14891

## 문제 분류

: 구현, 브루트포스 알고리즘

## 소요 시간

: 1시간 40분

## 풀이 방법

자성(N, S)을 가진 톱니 8개로 이루어진 톱니바퀴 4개가 있을 때, 임의의 횟수로 임의의 톱니바퀴를 시계 방향이나 반시계 방향으로 돌렸을 때, 해당 톱니바퀴들이 어떤 상태가 되어있는지를 구현할 수 있어야 풀 수 있는 문제였다.

4개의 톱니바퀴는 각각 가장 왼쪽, 오른쪽의 톱니의 극(N, S)끼리 마주보고 있다. 만약 마주보고 있는 이 두 톱니의 자극이 다를 경우, 한 톱니가 회전하면 다른 톱니도 회전한다. 만약, 서로 같다면, 회전하지 않는다. 중요한 것은 회전하기 전에 상태라는 것!

이 문제에서는 총 4개의 톱니바퀴만 있지만, 나는 이 톱니바퀴가 수십개가 맞물려 있다면 어떻게 풀이할까를 생각했다. 그래서 하드 코딩으로 다 작성해도 되었지만, 나는 BFS를 이용해서 한 톱니바퀴가 회전할 때, 회전해야하는 톱니바퀴들을 구해서 회전시켰다. 이렇게 하면 톱니바퀴가 수십개여도 어떤 톱니바퀴를 회전시켜야 할지 로직의 변경없이 사용할 수 있다.

1. 주어진 입력을 이용해서 톱니바퀴 배열을 생성한다.
2. 주어진 회전 방법에 따라 톱니를 모두 회전시킨다.
3. 각 회전 방법마다 회전해야할 톱니바퀴들을 찾는다.
4. 회전해야할 톱니바퀴들을 회전시킨다.
5. 모든 회전 명령을 수행한 후에 현재 상태에의 위쪽을 바라보는 톱니의 자극이 N이라면 0, S라면 index를 이용해 2의 index승의 값을 더해준다.

## 풀이 코드

```js
const solution = (poles, rotations) => {
  // 톱니바퀴들 생성
  const gears = poles.map(createGear);

  // 회전 명령을 한번씩 수행
  rotations.forEach(([index, direction]) => {
    // 회전 해야하는 톱니바퀴들 찾기
    const rotatableGears = findRotableGears(gears, index - 1, direction);

    // 찾은 회전해야할 톱니바퀴들을 회전시키기
    rotatableGears.forEach(([id, dir]) => rotateGear(gears[id], dir));
  });

  // 모든 톱니바퀴에 대해서
  return gears.reduce((acc, cur, index) => {
    // 위족 톱니가 N이라면 0, S라면 1, 2, 4, 8로 증가하므로 2의 거듭 제곱을 이용
    return Number(cur.top()) === 0 ? acc : acc + Math.pow(2, index);
  }, 0);
};

// 톱니바퀴 생성
const createGear = (poles) => ({
  // 톱니바퀴가 가진 자극들
  poles,
  // 위
  top() {
    return this.poles[0];
  },
  // 왼쪽
  left() {
    return this.poles[6];
  },
  // 오른쪽
  right() {
    return this.poles[2];
  },
});

// 톱니바퀴 회전시키기
const rotateGear = (gear, direction) => {
  const { poles } = gear;
  const rotatedPoles =
    direction === 1
      ? poles[poles.length - 1] + poles.slice(0, -1)
      : poles.slice(1) + poles[0];

  gear.poles = rotatedPoles;
};

// 회전 가능한 톱니바퀴 찾기 - BFS로 찾기
const findRotableGears = (gears, index, direction) => {
  const queue = [[index, direction]];
  // 모든 회전 해야하는 톱니바퀴들의 번호와 방향이 담길 배열
  const rotatableGears = [[index, direction]];
  const visited = new Array(gears.length).fill(false);

  visited[index] = true;

  while (queue.length) {
    const [current, currentDirection] = queue.shift();

    const left = current - 1;
    const right = current + 1;
    const nextDirection = currentDirection === 1 ? -1 : 1;

    // 왼쪽 톱니바퀴가 있고, 서로 자극이 다르고, 방문하지 않았다면
    if (
      left >= 0 &&
      gears[left].right() !== gears[current].left() &&
      !visited[left]
    ) {
      visited[left] = true;
      rotatableGears.push([left, nextDirection]);
      queue.push([left, nextDirection]);
    }
    // 오른쪽 톱니바퀴가 있고, 서로 자극이 다르고, 방문하지 않았다면
    if (
      right < gears.length &&
      gears[right].left() !== gears[current].right() &&
      !visited[right]
    ) {
      visited[right] = true;
      rotatableGears.push([right, nextDirection]);
      queue.push([right, nextDirection]);
    }
  }

  return rotatableGears;
};
```
