# 17822. 원판 돌리기

## 문제 링크

https://www.acmicpc.net/problem/17822

## 문제 분류

: 구현

## 소요 시간

: 2시간

## 풀이 방법

1. 입력받은 회전 방법대로 아래의 방법으로 원판을 돌린다.
2. 회전 방법에서 돌리길 원하는 원판과 해당 원판의 배수인 원판의 적힌 숫자의 상하좌우로 인접한 수가 있다면 제거한다.
3. 없다면 모든 원판의 수의 평균을 구해서 평균보다 작은 값은 +1, 큰 값은 -1 해준다.
4. 모든 회전 방법만큼 위를 반복한다.
5. 원판에 남은 수의 값을 더해서 반환한다.

## 풀이 코드

```js
const solution = (disks, rotates) => {
  // 모든 원판을 회전하는 방법을 실행 - [돌릴 번호, 방향, 횟수]
  rotates.forEach(([number, direction, times]) => {
    // 돌릴 번호의 배수인 원판들 회전시키기
    rotateDisks(disks, number, direction, times);

    // 인접한 같은 수의 위치 찾기
    const adjacents = findAdjacents(disks, number);

    if (adjacents.length > 0) {
      // 크기가 같은 인접한 수가 있다면 해당 수 제거
      removeAdjacents(disks, adjacents);
    } else {
      // 크기가 같은 인접한 수가 없다면 모든 수의 평균을 구한 후 평균보다 작은 값은 +1, 큰 값은 -1
      updateDisks(disks);
    }
  });

  // 원판에 남은 수의 합을 구해서 반환
  return disks.reduce((total, disk) => {
    const sum = disk.reduce((sum, value) => {
      return value === "x" ? sum : sum + value;
    }, 0);
    return total + sum;
  }, 0);
};

// 원판들 회전시키기
const rotateDisks = (disks, number, direction, times) => {
  disks.forEach((disk, index) => {
    // 회전 방법에 적힌 번호의 배수인 원판이 아니라면 건너뛰기
    if (index + 1 < 2 || (index + 1) % number !== 0) return;

    // 원판을 돌린 후 갱신
    const newDisk = rotateDisk(disk, direction, times);

    disks[index] = newDisk;
  });
};

// 원판 돌리기
const rotateDisk = (disk, direction, times) => {
  return direction === 0
    ? // 시계 방향
      rotateClockwise(disk, times)
    : // 반시계 방향
      rotateCounterClockwise(disk, times);
};

const rotateClockwise = (disk, times) => {
  // 맨 뒤에서 부터 회전 횟수만큼 잘라내기
  const head = disk.slice(-times);
  // 나머지
  const tail = disk.slice(0, -times);

  // 뒤에서 잘라낸 값을 앞으로
  return [...head, ...tail];
};

const rotateCounterClockwise = (disk, times) => {
  // 회전 횟수 이후의 수들을 잘라내기
  const head = disk.slice(times);
  // 앞에서 부터 회전 횟수까지
  const tail = disk.slice(0, times);

  return [...head, ...tail];
};

const findAdjacents = (disks) => {
  // 인접한 수의 위치를 담을 배열
  const adjacents = [];

  disks.forEach((disk, i) => {
    disk.forEach((value, j) => {
      if (value === "x") return;

      // 상하좌우 위치 구하기
      const left = j - 1 < 0 ? disk.length - 1 : j - 1;
      const right = (j + 1) % disk.length;
      const top = i - 1;
      const bottom = i + 1;

      // 하나라도 인접한 같은 크기의 수가 있음을 표시할 변수
      let hasSameAdjacent = false;

      // 왼쪽
      if (value === disk[left]) {
        adjacents.push([i, left]);
        hasSameAdjacent = true;
        // 오른쪽
      } else if (value === disk[right]) {
        adjacents.push([i, right]);
        hasSameAdjacent = true;
        // 위쪽
      } else if (i > 0 && value === disks[top][j]) {
        adjacents.push([top, j]);
        hasSameAdjacent = true;
        // 아래쪽
      } else if (i < disks.length - 1 && value === disks[bottom][j]) {
        adjacents.push([bottom, j]);
        hasSameAdjacent = true;
      }

      // 인접한 같은 크기의 수가 있다면 현재 위치도 추가
      if (hasSameAdjacent) adjacents.push([i, j]);
    });
  });

  return adjacents;
};

// 위에서 구한 인접한 같은 크기의 수들을 제거
const removeAdjacents = (disks, adjacents) => {
  adjacents.forEach(([i, j]) => (disks[i][j] = "x"));
};

// 인접한 같은 크기의 수가 없을 경우 전체 평균을 구해서 남은 수들의 값을 갱신
const updateDisks = (disks) => {
  // 평균값 구하기
  const average = getAverage(disks);

  disks.forEach((disk) => {
    disk.forEach((value, index) => {
      if (value === "x") return;
      // 평균값보다 크면 -1
      else if (value > average) disk[index] -= 1;
      // 평균값보다 작으면 +1
      else if (value < average) disk[index] += 1;
    });
  });
};

// 평균 구하기
const getAverage = (disks) => {
  const [total, count] = disks.reduce((acc, disk) => {
    // 전체 숫자의 수
    let count = 0;
    // 해당 디스크의 합
    const diskSum = disk.reduce((sum, num) => {
      if (num === "x") return sum;
      count += 1;
      return sum + num;
    }, 0);

    acc[0] += diskSum;
    acc[1] += count;

    return acc;
  }, new Array(2).fill(0));

  return total / count;
};
```
