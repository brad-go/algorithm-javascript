const [n, m, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, m, cards) {
  const MAX_SELECT_COUNT = 3;

  const selected = new Array(n);
  const selectedCards = new Array(MAX_SELECT_COUNT);

  let answer = 0;

  const makeClose = (answer, selectedCards, m) => {
    const sum = selectedCards.reduce((acc, cur) => acc + cur, 0);
    if (sum <= m && sum >= answer) return sum;
    return answer;
  };

  const comb = (cnt, start) => {
    if (cnt === MAX_SELECT_COUNT) {
      answer = makeClose(answer, selectedCards, m);
      return;
    }

    for (let i = start; i < n; i++) {
      if (selected[i]) continue;

      selected[i] = true;
      selectedCards[cnt] = cards[i];
      comb(cnt + 1, i);
      selected[i] = false;
    }
  };

  comb(0, 0);
  console.log(answer);
}

Solution(n, m, input);
