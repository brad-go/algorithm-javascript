const begin = "hit";
const target = "cog";
const words = ["hot", "dot", "dog", "lot", "log", "cog"];

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const q = [[begin, 0]];

  while (q.length) {
    const [currentWord, depth] = q.shift();

    for (let i = 0; i < words.length; i++) {
      if (isConvertable(currentWord, words[i])) {
        if (currentWord === target) return depth;
        q.push([words[i], depth + 1]);
      }
    }
  }
}

const isConvertable = (currentWord, wordToChange) => {
  let difference = 0;

  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] !== wordToChange[i]) difference++;
  }

  return difference > 1 ? false : true;
};

console.log(solution(begin, target, words));
