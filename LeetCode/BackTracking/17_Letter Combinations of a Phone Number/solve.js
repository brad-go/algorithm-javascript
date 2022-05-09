const input = require("fs").readFileSync("./input.txt").toString().trim();

function Solution(digits) {
  const KEYPAD = {
    1: null,
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const answer = [];

  if (!digits) return answer;

  const bt = (idx, letter) => {
    if (idx >= digits.length) return answer.push(letter);

    let num = digits[idx];
    let chars = KEYPAD[num];

    for (let c of chars) bt(idx + 1, letter + c);
  };

  bt(0, "");

  return answer;
}

console.log(Solution(input));
