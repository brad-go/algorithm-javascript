const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map((str) => str.split(" ").map(Number));

const CITY = {
  empty: 0,
  house: 1,
  chicken: 2,
};

const solution = (N, M, city) => {
  const { houses, chickens } = findPlaces(city);
  const selected = [];

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (count, index) => {
    if (count === M) {
      answer = Math.min(answer, getChickenDistOfCity(selected, houses));
      return;
    }

    for (let i = index; i < chickens.length; i++) {
      selected.push(chickens[i]);
      dfs(count + 1, i + 1);
      selected.pop();
    }
  };

  dfs(0, 0);

  return answer;
};

const findPlaces = (city) => {
  const houses = [];
  const chickens = [];

  city.forEach((row, rowIndex) => {
    row.forEach((place, columnIndex) => {
      if (place === CITY.house) houses.push([rowIndex, columnIndex]);
      if (place === CITY.chicken) chickens.push([rowIndex, columnIndex]);
    });
  });

  return { houses, chickens };
};

const getChickenDistOfCity = (chickens, houses) => {
  return houses.reduce((acc, house) => {
    return acc + getChickenDistOfHouse(chickens, house);
  }, 0);
};

const getChickenDistOfHouse = (chickens, house) => {
  return chickens.reduce(
    (acc, chicken) =>
      Math.min(acc, getDistance(house[0], house[1], chicken[0], chicken[1])),
    Number.MAX_SAFE_INTEGER
  );
};

const getDistance = (r1, c1, r2, c2) => {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};

console.log(solution(N, M, city));
