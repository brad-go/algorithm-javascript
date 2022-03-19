const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(n, input) {
  const coordiantes = input.map((item) => item.split(" ").map((v) => +v));

  const compare = (coordA, coordB) => {
    if (coordA[0] > coordB[0]) {
      return 1;
    }
    if (coordA[0] < coordB[0]) {
      return -1;
    }
    if (coordA[1] > coordB[1]) {
      return 1;
    }
    if (coordA[1] < coordB[1]) {
      return -1;
    }
    return 0;
  };

  const sortedCoordintes = coordiantes.sort(compare);
  sortedCoordintes.forEach((item) => console.log(item.join(" ")));
}

Solution(n, input);
