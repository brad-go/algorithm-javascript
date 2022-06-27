const numbers = [3, 30, 34, 5, 9];

function solution(numbers) {
  const answer = numbers.sort(customSortFunction).join("").replace(/(^0+)/, 0);
  return answer;
}

const customSortFunction = (a, b) => {
  const compareA = parseInt(a.toString() + b.toString());
  const compareB = parseInt(b.toString() + a.toString());

  return compareB - compareA;
};

console.log(solution(numbers));
