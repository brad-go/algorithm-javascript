const filePath = process.platform == "linux" ? "/dev/stdin" : "./input3.txt";
const input = require('fs').readFileSync(filePath).toString().trim(); // prettier-ignore

const solution = (input) => {
  const numbers = input.split(" ").map(Number);
  const map = numbers.reduce((acc, cur) => {
    acc.set(cur, (acc.get(cur) || 0) + 1);
    return acc;
  }, new Map());

  const duplicateCount = Math.max(...map.values());

  if (duplicateCount < 2) {
    return Math.max(...numbers) * 100;
  }

  const duplicateNumber = [
    ...new Set(
      numbers.filter((item, index) => numbers.indexOf(item) !== index)
    ),
  ];
  const basePrice = Math.pow(10, duplicateCount + 1);
  const multipleFactor = duplicateCount > 2 ? 1000 : 100;

  return basePrice + duplicateNumber * multipleFactor;
};

console.log(solution(input));
