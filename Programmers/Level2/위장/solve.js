const clothes = [
  ["yellowhat", "headgear"],
  ["bluesunglasses", "eyewear"],
  ["green_turban", "headgear"],
];

function solution(clothes) {
  const numberOfClothes = clothes.reduce((spy, [_, type]) => {
    spy[type] = (spy[type] || 0) + 1;
    return spy;
  }, {});

  return Object.values(numberOfClothes).reduce((acc, cur) => acc * (cur + 1), 1) - 1; // prettier-ignore
}

console.log(solution(clothes));
