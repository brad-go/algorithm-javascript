const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, T] = input[0].split(" ").map(Number);
const disks = input.slice(1, N + 1).map((str) => str.split(" ").map(Number));
const rotates = input.slice(N + 1).map((str) => str.split(" ").map(Number));

const solution = (disks, rotates) => {
  rotates.forEach(([number, direction, times]) => {
    rotateDisks(disks, number, direction, times);

    const adjacents = findAdjacents(disks, number);

    if (adjacents.length > 0) {
      removeAdjacents(disks, adjacents);
    } else {
      updateDisks(disks);
    }
  });

  return disks.reduce((total, disk) => {
    const sum = disk.reduce((sum, value) => {
      return value === "x" ? sum : sum + value;
    }, 0);
    return total + sum;
  }, 0);
};

const rotateDisks = (disks, number, direction, times) => {
  disks.forEach((disk, index) => {
    if (index + 1 < 2 || (index + 1) % number !== 0) return;

    const newDisk = rotateDisk(disk, direction, times);

    disks[index] = newDisk;
  });
};

const rotateDisk = (disk, direction, times) => {
  return direction === 0
    ? rotateClockwise(disk, times)
    : rotateCounterClockwise(disk, times);
};

const rotateClockwise = (disk, times) => {
  const head = disk.slice(-times);
  const tail = disk.slice(0, -times);

  return [...head, ...tail];
};

const rotateCounterClockwise = (disk, times) => {
  const head = disk.slice(times);
  const tail = disk.slice(0, times);

  return [...head, ...tail];
};

const findAdjacents = (disks) => {
  const adjacents = [];

  disks.forEach((disk, i) => {
    disk.forEach((value, j) => {
      if (value === "x") return;

      const left = j - 1 < 0 ? disk.length - 1 : j - 1;
      const right = (j + 1) % disk.length;
      const top = i - 1;
      const bottom = i + 1;

      let hasSameAdjacent = false;

      if (value === disk[left]) {
        adjacents.push([i, left]);
        hasSameAdjacent = true;
      } else if (value === disk[right]) {
        adjacents.push([i, right]);
        hasSameAdjacent = true;
      } else if (i > 0 && value === disks[top][j]) {
        adjacents.push([top, j]);
        hasSameAdjacent = true;
      } else if (i < disks.length - 1 && value === disks[bottom][j]) {
        adjacents.push([bottom, j]);
        hasSameAdjacent = true;
      }

      if (hasSameAdjacent) adjacents.push([i, j]);
    });
  });

  return adjacents;
};

const removeAdjacents = (disks, adjacents) => {
  adjacents.forEach(([i, j]) => (disks[i][j] = "x"));
};

const updateDisks = (disks) => {
  const average = getAverage(disks);

  disks.forEach((disk) => {
    disk.forEach((value, index) => {
      if (value === "x") return;
      else if (value > average) disk[index] -= 1;
      else if (value < average) disk[index] += 1;
    });
  });
};

const getAverage = (disks) => {
  const [total, count] = disks.reduce((acc, disk) => {
    let count = 0;
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

console.log(solution(disks, rotates));
