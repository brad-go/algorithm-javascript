const citations = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (citations) => {
  citations.sort((a, b) => b - a);

  let hIndex = 0;

  citations.forEach((citation, index) => {
    const h = index + 1;

    if (citation >= h) {
      hIndex = h;
    }
  });

  return hIndex;
};

console.log(solution(citations));
