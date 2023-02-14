const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = input[1];
const cryptogram = input[0];
const words = input.slice(2);

const solution = (N, cryptogram, words) => {
  const alphabets = new Array(26).fill().map((_, index) => {
    return String.fromCharCode(index + 97);
  });

  for (let i = 0; i < 26; i++) {
    const cryptography = alphabets.reduce((acc, cur, index) => {
      const idx = index - i < 0 ? index - i + alphabets.length : index - i;
      acc[cur] = alphabets[idx];
      return acc;
    }, {});
    const decrypted = cryptogram.split('').map((char) => cryptography[char]).join(''); // prettier-ignore
    const isOriginal = words.some((word) => decrypted.includes(word));

    if (isOriginal) return decrypted;
  }
};

console.log(solution(N, cryptogram, words));
