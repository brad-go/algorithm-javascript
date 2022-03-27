const [n, input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(n, input) {
  const numbers = input.split(" ").map((v) => +v);

  const isBiggiest = (num) => {
    const comparison = numbers.findIndex((compare) => compare > num);
    return comparison === -1 ? true : false;
  };

  let result = "";
  numbers.forEach((num) => {
    if (isBiggiest(num)) {
      result += "-1 ";
      return;
    }

    const idx = numbers.indexOf(num);
    const arr = numbers.slice(idx + 1);

    const ngm = arr.find((n) => n > num);

    if (!ngm) {
      result += "-1 ";
      return;
    }
    result += `${ngm} `;
  });
  console.log(result.trim());
}

Solution(n, input);
