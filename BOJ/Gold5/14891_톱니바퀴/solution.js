const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input4.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const poles = input.slice(0, 4);
const rotations = input.slice(5).map((str) => str.split(" ").map(Number));

const solution = (poles, rotations) => {
  const gears = poles.map(createGear);

  rotations.forEach(([index, direction]) => {
    const rotatableGears = findRotableGears(gears, index - 1, direction);

    rotatableGears.forEach(([id, dir]) => rotateGear(gears[id], dir));
  });

  return gears.reduce((acc, cur, index) => {
    return Number(cur.top()) === 0 ? acc : acc + Math.pow(2, index);
  }, 0);
};

const createGear = (poles) => ({
  poles,
  top() {
    return this.poles[0];
  },
  left() {
    return this.poles[6];
  },
  right() {
    return this.poles[2];
  },
});

const rotateGear = (gear, direction) => {
  const { poles } = gear;
  const rotatedPoles =
    direction === 1
      ? poles[poles.length - 1] + poles.slice(0, -1)
      : poles.slice(1) + poles[0];

  gear.poles = rotatedPoles;
};

const findRotableGears = (gears, index, direction) => {
  const queue = [[index, direction]];
  const rotatableGears = [[index, direction]];
  const visited = new Array(gears.length).fill(false);

  visited[index] = true;

  while (queue.length) {
    const [current, currentDirection] = queue.shift();

    const left = current - 1;
    const right = current + 1;
    const nextDirection = currentDirection === 1 ? -1 : 1;

    if (
      left >= 0 &&
      gears[left].right() !== gears[current].left() &&
      !visited[left]
    ) {
      visited[left] = true;
      rotatableGears.push([left, nextDirection]);
      queue.push([left, nextDirection]);
    }
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

console.log(solution(poles, rotations));
