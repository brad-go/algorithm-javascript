const [str1, str2] = require('fs').readFileSync('./input.txt').toString().trim().split(' '); // prettier-ignore

const solution = (str1, str2) => {
  const letters1 = splitByTwoLetters(str1);
  const letters2 = splitByTwoLetters(str2);
  const letters = [...letters1, ...letters2];

  const intersection = [];

  letters1.forEach((letter) => {
    if (!letters2.includes(letter)) return;

    const index = letters2.findIndex((current) => current === letter);

    intersection.push(letter);
    letters2[index] = null;
  });

  const similarity =
    intersection.length / (letters.length - intersection.length);

  return Number.isNaN(similarity) ? 65536 : Math.floor(similarity * 65536);
};

const splitByTwoLetters = (str1) => {
  const results = str1.split("").reduce((acc, cur, index, origin) => {
    if (index === origin.length - 1) return acc;

    const letters = [cur, origin[index + 1]];
    const isValid = letters.every((letter) => isAlphabet(letter));

    if (isValid) acc.push(letters.join("").toLowerCase());

    return acc;
  }, []);

  return results;
};

const isAlphabet = (char) => {
  const regex = /[a-zA-Z]/g;

  return regex.test(char);
};

console.log(solution(str1, str2));
