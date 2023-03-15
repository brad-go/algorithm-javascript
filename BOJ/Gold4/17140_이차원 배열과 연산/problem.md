# 17140. 이차원 배열과 연산

## 문제 링크

https://www.acmicpc.net/problem/17140

## 문제 분류

: 구현, 정렬

## 소요 시간

: 1시간 30분

## 풀이 방법

계속 런타임 에러가 발생했었는데, 다시 한번 문제를 꼼꼼히 읽어야겠다는 생각이 든다. 배열의 크기가 100을 넘어가면 나머지를 버린다는 조건을 잊어버리고 문제를 풀이하다가 뒤늦게 발견해서 풀이할 수 있었다. 풀이 방법은 문제에서 제시된 그대로 풀면된다.

1. 배열의 행의 크기와 열의 크기를 비교한다.
2. 행의 크기가 크다면 R연산, 열의 크기가 크다면 C연산을 수행한다.
3. R 연산은 각 행의 원소의 개수를 구하고, 원소의 개수 순으로 정렬, 같다면 크기 순으로 정렬해준다. 크기가 100을 넘어가면 나머지는 버리고, 그 이하라면 최대 길이의 행 만큼 나머지 행의 빈 칸을 0으로 채워준다.
4. C 연산은 각 열을 구한 후에 배열에 담는다. 이 배열에 대해 R연산을 수행하고, 연산을 수행한 배열이 열 기준이므로 행 기준으로 바꿔준다.

## 풀이 코드

```js
const solution = (r, c, k, array) => {
  let time = 0;
  let newArray = array.map((row) => [...row]);

  while (true) {
    // 100 초가 넘으면 -1 출력
    if (time > 100) break;

    const rows = newArray.length;
    const columns = newArray[0].length;

    // 배열이 r, c보다 큰지 정답인지 확인
    if (isInRange(rows, columns, r, c) && isAnswer(newArray, r, c, k)) break;

    // 배열의 행 열의 크기에 따라 맞는 연산 수행
    newArray = selectOperation(rows, columns, newArray);

    time++;
  }

  return time <= 100 ? time : -1;
};

const isInRange = (rows, columns, r, c) => {
  return rows > r - 1 && columns > c - 1;
};

const isAnswer = (array, r, c, k) => {
  return array[r - 1][c - 1] === k;
};

const selectOperation = (rows, columns, array) => {
  return rows >= columns ? sortRows(array) : sortColumns(array);
};

const sortRows = (array) => {
  const newArray = [];

  // 각 행에 대해
  array.forEach((row) => {
    // 각 요소의 개수 구하기
    const counts = row.reduce((acc, cur) => {
      if (cur === 0) return acc;

      acc.set(cur, (acc.get(cur) || 0) + 1);
      return acc;
    }, new Map());

    // 개수 순으로 정렬하고 같다면 크기 순으로 오름차순 정렬
    const newRow = Array.from(counts).sort((a, b) => {
      return a[1] === b[1] ? a[0] - b[0] : a[1] - b[1];
    });

    // 새 배열에 추가
    newArray.push(newRow.flat());
  });

  // 새 배열의 최대 길이 구하기
  const maxLength = newArray.reduce((acc, cur) => {
    return Math.max(acc, cur.length);
  }, 0);
  // 만약 100을 넘으면 버려야 하므로
  const max = maxLength > 100 ? 100 : maxLength;

  // 각 행에 대해
  newArray.forEach((row, index, origin) => {
    // 100을 넘으면 잘라내기
    if (row.length > 100) {
      origin[index] = row.slice(0, 100);
      return;
    }

    // 최대 길이의 행은 건너뛰기
    if (row.length === max) return;

    // 최대 길이 행과 현재 행의 길이 차이
    const diff = max - row.length;

    // 차이만큼 0으로 채워주기
    for (let i = 0; i < diff; i++) {
      row.push(0);
    }
  });

  return newArray;
};

const sortColumns = (array) => {
  const columns = [];

  // 배열의 각 열 구하기
  for (let i = 0; i < array[0].length; i++) {
    const column = [];

    for (let j = 0; j < array.length; j++) {
      if (!array[j][i]) continue;

      column.push(array[j][i]);
    }

    columns.push(column);
  }

  // 구한 열을 정렬시키기
  const sorted = sortRows(columns);
  // 새 배열 만들기
  const newArray = Array.from(Array(sorted[0].length), () =>
    Array(sorted.length)
  );

  // 열 기준인 배열을 행 기준으로 다시 바꿔주기
  for (let i = 0; i < sorted[0].length; i++) {
    for (let j = 0; j < sorted.length; j++) {
      newArray[i][j] = sorted[j][i];
    }
  }

  return newArray;
};
```
