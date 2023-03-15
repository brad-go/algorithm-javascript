const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input7.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [r, c, k] = input[0].split(" ").map(Number);
const array = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (r, c, k, array) => {
  let time = 0;
  let newArray = array.map((row) => [...row]);

  while (true) {
    if (time > 100) break;

    const rows = newArray.length;
    const columns = newArray[0].length;

    if (isInRange(rows, columns, r, c) && isAnswer(newArray, r, c, k)) break;

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

  array.forEach((row) => {
    const counts = row.reduce((acc, cur) => {
      if (cur === 0) return acc;

      acc.set(cur, (acc.get(cur) || 0) + 1);
      return acc;
    }, new Map());

    const newRow = Array.from(counts).sort((a, b) => {
      return a[1] === b[1] ? a[0] - b[0] : a[1] - b[1];
    });

    newArray.push(newRow.flat());
  });

  const maxLength = newArray.reduce((acc, cur) => {
    return Math.max(acc, cur.length);
  }, 0);
  const max = maxLength > 100 ? 100 : maxLength;

  newArray.forEach((row, index, origin) => {
    if (row.length > 100) {
      origin[index] = row.slice(0, 100);
      return;
    }

    if (row.length === max) return;

    const diff = max - row.length;

    for (let i = 0; i < diff; i++) {
      row.push(0);
    }
  });

  return newArray;
};

const sortColumns = (array) => {
  const columns = [];

  for (let i = 0; i < array[0].length; i++) {
    const column = [];

    for (let j = 0; j < array.length; j++) {
      if (!array[j][i]) continue;

      column.push(array[j][i]);
    }

    columns.push(column);
  }

  const sorted = sortRows(columns);
  const newArray = Array.from(Array(sorted[0].length), () =>
    Array(sorted.length)
  );

  for (let i = 0; i < sorted[0].length; i++) {
    for (let j = 0; j < sorted.length; j++) {
      newArray[i][j] = sorted[j][i];
    }
  }

  return newArray;
};

console.log(solution(r, c, k, array));
