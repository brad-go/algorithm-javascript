const clothes = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ')); // prettier-ignore

function solution(clothes) {
  const numberOfClothes = clothes.reduce((spy, [_, type]) => {
    spy[type] = (spy[type] || 0) + 1;
    return spy;
  }, {});

  return Object.values(numberOfClothes).reduce((acc, cur) => acc * (cur + 1), 1) - 1; // prettier-ignore
}

console.log(solution(clothes));
