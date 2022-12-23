const nums = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (nums) => {
  const pokemonVarieties = new Set(nums).size;
  const selectCount = nums.length / 2;

  return pokemonVarieties > selectCount ? selectCount : pokemonVarieties;
};

console.log(solution(nums));
