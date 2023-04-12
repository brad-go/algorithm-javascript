const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input5.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, fuel] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((str) => str.split(" ").map(Number)); // prettier-ignore
const position = input[N + 1].split(" ").map((value) => value - 1);
const courses = input.slice(N + 2).map((str) => str.split(" ").map((value) => value - 1)); // prettier-ignore

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
  const { taxi, passengers } = init(map, fuel, position, courses);

  while (true) {
    const passenger = pickUpNearestPassenger(map, taxi, passengers);

    if (!passenger) break;

    const isSuccess = drive(map, taxi, passenger);

    if (!isSuccess) break;

    if (passengers.every(({ isSuccess }) => isSuccess)) return taxi.fuel;
  }

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

  const queue = [[row, col, initialFuel]];
  const visitied = Array.from(Array(N), () => Array(N).fill(false));
  const nearestPassengers = [];

  visitied[row][col] = true;

  while (queue.length) {
    const [r, c, fuel] = queue.shift();

    if (hasNearestPassenger(nearestPassengers, fuel)) break;

    if (isPassenger(map, r, c)) {
      const passenger = findPassenger(passengers, map[r][c]);

      nearestPassengers.push({ passenger, fuel });
      continue;
    }

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

  if (!nearestPassengers.length) return null;

  const nearestPassenger = findNearestPassenger(nearestPassengers);
  const { passenger, fuel } = nearestPassenger;
  const { departure } = passenger;

  updateTaxi(taxi, departure[0], departure[1], fuel);
  pickUpPassenger(map, departure[0], departure[1]);

  return passenger;
};

const findPassenger = (passengers, passengerId) => {
  return passengers.find(({ id }) => id === passengerId);
};

const isMovable = (N, map, r, c) => {
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

const hasNearestPassenger = (passengers, fuel) => {
  return passengers.length && passengers[passengers.length - 1].fuel > fuel;
};

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

const pickUpPassenger = (map, r, c) => {
  map[r][c] = 0;
};

const updateTaxi = (taxi, row, col, fuel) => {
  taxi.row = row;
  taxi.col = col;
  taxi.fuel = fuel;
};

const drive = (map, taxi, passenger) => {
  const { length: N } = map;
  const { row, col, fuel: initialFuel } = taxi;
  const { destination } = passenger;

  const queue = [[row, col, 0]];
  const visitied = Array.from(Array(N), () => Array(N).fill(false));

  while (queue.length) {
    const [r, c, fuel] = queue.shift();

    if (fuel > initialFuel) return false;

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

const isDestination = (destination, row, col) => {
  return destination[0] === row && destination[1] === col;
};

console.log(solution(map, fuel, position, courses));
