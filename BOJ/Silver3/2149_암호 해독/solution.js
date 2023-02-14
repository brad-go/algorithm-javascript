const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const [key, cryptogram] = fs.readFileSync(filePath).toString().trim().split("\n"); // prettier-ignore

const solution = (key, cryptogram) => {
  const order = findEncryptOrder(key);
  const splited = getCryptogramSplitedByKeyLength(key.length, cryptogram);

  const original = splited.reduce((acc, cur) => {
    const withOlder = cur.map((char, index) => ({ char, order: order[index] }));
    const decrypted = withOlder
      .sort((a, b) => a.order - b.order)
      .map(({ char }) => char)
      .join("");

    acc += decrypted;
    return acc;
  }, "");

  return original;
};

const findEncryptOrder = (key) => {
  const keyWithIndex = key.split("").map((char, index) => ({ char, index }));

  keyWithIndex.sort((a, b) => a.char.localeCompare(b.char));

  return keyWithIndex.map(({ index }) => index);
};

const getCryptogramSplitedByKeyLength = (keyLength, cryptogram) => {
  const rows = cryptogram.length / keyLength;
  const splitedCryptogram = Array.from(Array(rows), () => []);

  for (let i = 0; i < cryptogram.length; i += rows) {
    for (let j = 0; j < rows; j++) {
      splitedCryptogram[j].push(cryptogram[i + j]);
    }
  }

  return splitedCryptogram;
};

console.log(solution(key, cryptogram));
