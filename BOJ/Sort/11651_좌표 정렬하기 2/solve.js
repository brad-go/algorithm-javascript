const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(input) {
  const coordinates = input.map((item) => {
    const coords = item.split(" ");
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    return { x, y };
  });

  const compare = (coordA, coordB) => {
    if (coordA.y !== coordB.y) {
      return coordA.y - coordB.y;
    }
    if (coordA.x !== coordB.x) {
      return coordA.x - coordB.x;
    }
    return 0;
  };

  let result = "";
  const sortedCoordintes = coordinates.sort(compare);
  sortedCoordintes.forEach((item) => (result += `${item.x} ${item.y}\n`));
  console.log(result.trim());
}

Solution(input);
