const relation = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ')); // prettier-ignore

const solution = (relation) => {
  const indicies = Array.from(Array(relation[0].length), (_, index) => index);
  const combinations = indicies.reduce((acc, cur) => {
    acc.push(...getCombinations(indicies, cur + 1));

    return acc;
  }, []);
  const uniqueCombinations = combinations.filter((combination) =>
    hasUniqueness(relation, combination)
  );
  const minimalCombinations = uniqueCombinations.filter(hasMinimality);

  return minimalCombinations.length;
};

const getCombinations = (array, select) => {
  const results = [];

  if (select === 1) {
    return array.map((number) => [number]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

const hasUniqueness = (relation, combination) => {
  const candidates = relation.reduce((acc, cur) => {
    const key = combination.map((index) => cur[index]).join(" ");
    acc.add(key);

    return acc;
  }, new Set());

  return candidates.size === relation.length;
};

const hasMinimality = (combination, index, origin) => {
  const rest = origin.filter((_, idx) => index !== idx);
  const isDuplicate = rest.some((restCombination) => {
    return restCombination.every((number) => combination.includes(number));
  });

  return !isDuplicate;
};

console.log(solution(relation));
