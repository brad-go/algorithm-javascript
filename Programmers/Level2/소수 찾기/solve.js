const numbers = require("fs").readFileSync("./input.txt").toString().trim();

const solution = (numbers) => {
  const pieces = numbers.split("");
  const permutations = getPermutations(pieces);
  const primeNumbers = getPrimeNumbers([...permutations]);

  return primeNumbers.length;
};

const getPermutations = (array) => {
  const set = new Set();

  for (let i = 1; i <= array.length; i++) {
    permutation(array, i, "", set);
  }

  return set;
};

const permutation = (array, selectNumber, current, set) => {
  if (selectNumber === 0) {
    set.add(Number(current));
    return;
  }

  array.forEach((value, index) => {
    const rest = [...array.slice(0, index), ...array.slice(index + 1)];

    permutation(rest, selectNumber - 1, current + value, set);
  });
};

const getPrimeNumbers = (numbers) => {
  return numbers.filter(isPrimeNumber);
};

const isPrimeNumber = (number) => {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

console.log(solution(numbers));
