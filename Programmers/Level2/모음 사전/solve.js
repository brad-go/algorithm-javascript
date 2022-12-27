const word = require("fs").readFileSync("./input.txt").toString().trim();

const solution = (word) => {
  const ALPHABETS = ["A", "E", "I", "O", "U"];

  const dictionary = [...getDictionary(ALPHABETS)].sort();
  const dictionaryMap = dictionary.reduce((acc, word, index) => {
    acc.set(word, index + 1);
    return acc;
  }, new Map());

  return dictionaryMap.get(word);
};

const getDictionary = (alphabets) => {
  const dictionary = new Set();

  for (let i = 1; i <= alphabets.length; i++) {
    permutation(alphabets, "", i, dictionary);
  }

  return dictionary;
};

const permutation = (alphabets, current, select, dictionary) => {
  if (select === 0) {
    dictionary.add(current);
    return;
  }

  alphabets.forEach((alphabet) => {
    permutation(alphabets, current + alphabet, select - 1, dictionary);
  });
};

console.log(solution(word));
