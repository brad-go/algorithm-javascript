# 17142. 연구소

## 문제 링크

https://www.acmicpc.net/problem/17142

## 문제 분류

: 그래프, 브루트포스 알고리즘, 너비 우선 탐색

## 소요 시간

: 1시간 30분

## 풀이 방법

바이러스 중 M개를 선택해서 확산시킬 때, 연구소 전체에 바이러스가 퍼지는 최소 시간을 구하는 문제였다. 조합을 이용해서 바이러스 M개를 선택하고, BFS를 이용해서 바이러스를 퍼뜨리면 되는 문제라고 생각했다. 그러나 중요한 문제가 남아있었다. 선택한 바이러스가 확산되다가 비활성화된 바이러스를 만나면 해당 바이러스를 활성화 시켜야 한다.

비활성화 바이러스가 활성화되는 것은 사실 바이러스이기 때문에 이미 활성화된 바이러스가 퍼져나갈 수 있으므로 신경쓰지 않아도 된다고 생각했다. 그러나 연구소 전체에 바이러스가 퍼진다는 것은 비활성화된 바이러스도 포함이었다. 굳이 연구소 전체에 활성화된 바이러스로 가득 채워져야하는 것은 아니었던 것이다. 해당 문제를 해결하기 위한 방법을 찾아야했다.

처음에는 BFS를 통해 다음 위치로 확산될 때, 시간을 조절하거나 바이러스를 표시하는 방식을 바꿔서 문제를 해결해보려고 했지만 실패했다. 나는 다음 위치로 탐색할 때, 시간을 미리 증가시켰었는데, 이것이 문제였다. 다음 위치 탐색 전에 빈칸이 모두 바이러스로 채워졌는지 확인하고, 나머지가 비활성화된 바이러스라면 시간을 증가시킬 필요없고, 더이상 탐색할 필요가 없었다. 핵심은 빈 칸의 수를 세는 것이었다!!

1. 바이러스들의 위치와 빈칸의 수를 센다.
2. 조합을 통해 바이러스를 M개씩 선택한다.
3. 해당 조합을 각각 확인하면서 바이러스를 퍼뜨려본다.
4. 바이러스는 BFS를 통해서 퍼뜨리며 바이러스가 퍼질 때마다 빈칸이 바이러스로 채워지면 빈칸의 수를 줄인다.
5. 만약 모든 빈칸이 바이러스로 채워졌다면 퍼진 시간을 반환한다. (비활성화된 바이러스만 남았을 경우가 있을 수 있기 때문에)
6. 아니라면 다음 위치에서 바이러스를 퍼뜨린다.
7. 모든 조합에서 나온 확산 시간을 비교해서 최솟값을 반환한다.

## 풀이 코드

```js
const solution = (N, M, lab) => {
  const { viruses, emptySpace } = init(lab);

  // 이미 모든 바이러스로 차있다면 탐색 필요 x
  if (emptySpace === 0) return 0;

  // 바이러스 M개씩 선택하기
  const combinations = getCombinations(viruses, M);

  let answer = Number.MAX_SAFE_INTEGER;

  // 각 선택된 바이러스들을 퍼뜨려보기
  combinations.forEach((viruses) => {
    const newLab = lab.map((row) => [...row]);
    const spreadTime = spreadViruses(N, newLab, viruses, emptySpace);

    if (spreadTime !== -1) answer = Math.min(answer, spreadTime);
  });

  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
};

const init = (lab) => {
  const initialState = {
    viruses: [],
    emptySpace: 0,
  };

  lab.forEach((row, r) => {
    row.forEach((value, c) => {
      // 빈칸 수 세기
      if (value === 0) {
        initialState.emptySpace += 1;
        // 바이러스
      } else if (value === 2) {
        initialState.viruses.push([r, c]);
      }
    });
  });

  return initialState;
};

const getCombinations = (array, select) => {
  if (select === 1) {
    return array.map((value) => [value]);
  }

  const results = [];

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

const spreadViruses = (N, lab, viruses, emptySpace) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = viruses.map((virus) => [...virus, 0]);
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  viruses.forEach(([r, c]) => (visited[r][c] = true));

  while (queue.length > 0) {
    const [r, c, time] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (!isInLab(N, nr, nc) || isWall(lab, nr, nc) || visited[nr][nc])
        continue;

      // 빈칸이라면 젠체 빈칸 수 줄이기
      if (lab[nr][nc] === 0) emptySpace -= 1;
      // 모든 칸이 바이러스로 채워졌다면 확산 시간 반환
      // 비활성화된 바이러스도 바이러스이므로
      if (emptySpace === 0) return time + 1;

      visited[nr][nc] = true;
      queue.push([nr, nc, time + 1]);
    }
  }

  return -1;
};

const isInLab = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const isWall = (lab, r, c) => {
  return lab[r][c] === 1;
};
```
