# 19238. 스타트택시

## 문제 링크

https://www.acmicpc.net/problem/19238

## 문제 분류

: 구현, 그래프, 너비 우선 탐색

## 소요 시간

: 2시간

## 풀이 방법

가장 가까운 손님을 찾을 때와, 손님을 목적지로 데려다주는 과정을 BFS로 구현함으로써 문제를 풀이할 수 있었다.

1. 가장 가까운 손님을 BFS를 통해 찾는다. 택시의 시작 지점부터 BFS탐색을 하면서 손님을 발견하면 가장 가까운 손님 배열에 넣는다. 다음에 찾은 손님이 같은 거리의 손님이라면 가장 가까운 손님 배열에 추가하고 아니라면 탐색을 중지한다.
2. 손님이 여럿이라면 행을 기준으로 정렬하고, 열을 기준으로 정렬한다.
3. 가장 가까운 손님을 찾아서 택시의 위치와 연료를 갱신한다.
4. 손님을 찾지 못했다면 -1을 반환한다.
5. 해당 손님의 목적지로 이동한다. 이동 과정 중에 연료가 다 떨어지다 실패. 목적지에 도달했다면 택시의 위치와 연료를 갱신한다.
6. 성공했다면 위 과정을 반복한다.

## 풀이 코드

```js
const space = {
  empty: 0,
  wall: 1,
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const solution = (map, fuel, position, courses) => {
  // 택시와 승객들을 초기화
  const { taxi, passengers } = init(map, fuel, position, courses);

  // 목표한 수의 손님을 모두 목적지로 이동시킬 때까지
  while (true) {
    // 가장 가까운 손님 찾기
    const passenger = pickUpNearestPassenger(map, taxi, passengers);

    if (!passenger) break;

    // 손님을 목적지까지 데려다 주기
    const isSuccess = drive(map, taxi, passenger);

    if (!isSuccess) break;

    // 모든 승객이 목적지에 도달했다면 택시의 연료 반환
    if (passengers.every(({ isSuccess }) => isSuccess)) return taxi.fuel;
  }

  // 실패 시 -1
  return -1;
};

const init = (map, fuel, position, courses) => {
  const taxi = createTaxi(fuel, position);
  const passengers = courses.reduce((acc, [sr, sc, tr, tc], index) => {
    const passengerId = index + 2;
    const passenger = createPassenger(passengerId, [sr, sc], [tr, tc]);

    map[sr][sc] = passengerId;
    acc.push(passenger);

    return acc;
  }, []);

  return { map, taxi, passengers };
};

const createTaxi = (fuel, position) => {
  const [row, col] = position;

  return { row, col, fuel };
};

const createPassenger = (id, departure, destination) => {
  return { id, departure, destination, isSuccess: false };
};

const pickUpNearestPassenger = (map, taxi, passengers) => {
  const { length: N } = map;
  const { row, col, fuel: initialFuel } = taxi;

  // 큐에 초기 택시 위치와 초기 연료량을 넣기
  const queue = [[row, col, initialFuel]];
  const visitied = Array.from(Array(N), () => Array(N).fill(false));
  // 가장 가까운 손님들을 담을 배열
  const nearestPassengers = [];

  visitied[row][col] = true;

  while (queue.length) {
    // 현재 위치와 연료량
    const [r, c, fuel] = queue.shift();

    // 이미 현재 연료량보다 더 적게 소모하는 위치에 손님이 있다면
    if (hasNearestPassenger(nearestPassengers, fuel)) break;

    // 손님이라면
    if (isPassenger(map, r, c)) {
      // 가장 가까운 손님 배열에 담기
      const passenger = findPassenger(passengers, map[r][c]);

      nearestPassengers.push({ passenger, fuel });
      continue;
    }

    // 연료가 바닥나면 종료
    if (!fuel) break;

    directions.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      if (isMovable(N, map, nr, nc) && !visitied[nr][nc]) {
        visitied[nr][nc] = true;
        queue.push([nr, nc, fuel - 1]);
      }
    });
  }

  // 찾은 손님이 없다면 종료
  if (!nearestPassengers.length) return null;

  // 가장 가까운 손님의 위치로 택시를 이동시키기
  const nearestPassenger = findNearestPassenger(nearestPassengers);
  const { passenger, fuel } = nearestPassenger;
  const { departure } = passenger;

  updateTaxi(taxi, departure[0], departure[1], fuel);
  pickUpPassenger(map, departure[0], departure[1]);

  return passenger;
};

// 손님의 id로 손님 찾기
const findPassenger = (passengers, passengerId) => {
  return passengers.find(({ id }) => id === passengerId);
};

// 이동할 수 있는지 확인
const isMovable = (N, map, r, c) => {
  // mpa안에 있고, 빈 곳이나 승객이 있는 곳인 경우
  return isInMap(N, r, c) && (isEmpty(map, r, c) || isPassenger(map, r, c));
};

const isInMap = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const isEmpty = (map, r, c) => {
  return map[r][c] === space.empty;
};

const isPassenger = (map, r, c) => {
  return map[r][c] > 1;
};

// 이미 더 가까운 손님이 있는지 확인
const hasNearestPassenger = (passengers, fuel) => {
  return passengers.length && passengers[passengers.length - 1].fuel > fuel;
};

// 손님들 중 가장 가까운 손님 찾기
const findNearestPassenger = (passengers) => {
  passengers.sort((a, b) => {
    const { passenger: passengerA } = a;
    const { passenger: passengerB } = b;

    if (passengerA.departure[0] === passengerB.departure[0]) {
      return passengerA.departure[1] - passengerB.departure[1];
    }

    return a.passenger.departure[0] - b.passenger.departure[0];
  });

  return passengers[0];
};

// map에서 승객 지우기
const pickUpPassenger = (map, r, c) => {
  map[r][c] = 0;
};

// 택시 정보 갱신
const updateTaxi = (taxi, row, col, fuel) => {
  taxi.row = row;
  taxi.col = col;
  taxi.fuel = fuel;
};

// 손님을 목적지로 이동시키기
const drive = (map, taxi, passenger) => {
  const { length: N } = map;
  const { row, col, fuel: initialFuel } = taxi;
  const { destination } = passenger;

  const queue = [[row, col, 0]];
  const visitied = Array.from(Array(N), () => Array(N).fill(false));

  while (queue.length) {
    const [r, c, fuel] = queue.shift();

    // 연료가 바닥났다면 실패
    if (fuel > initialFuel) return false;

    // 목적지에 도착했다면 택시 위치와 연료 갱신
    if (isDestination(destination, r, c)) {
      passenger.isSuccess = true;
      updateTaxi(taxi, r, c, initialFuel + fuel);
      return true;
    }

    directions.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;

      if (isMovable(N, map, nr, nc) && !visitied[nr][nc]) {
        visitied[nr][nc] = true;
        queue.push([nr, nc, fuel + 1]);
      }
    });
  }
};

// 목적지인지 확인
const isDestination = (destination, row, col) => {
  return destination[0] === row && destination[1] === col;
};
```
