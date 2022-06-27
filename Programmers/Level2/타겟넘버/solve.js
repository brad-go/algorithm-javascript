const numbers = [1, 1, 1, 1, 1];
const target = 3;
// const numbers = [4, 1, 2, 1];
// const target = 4;

function solution(numbers, target) {
  let answer = 0;
  const makeTargetNumber = (index, currentNumber) => {
    if (index === numbers.length) {
      if (currentNumber === target) answer++;
      return;
    }
    makeTargetNumber(index + 1, currentNumber + numbers[index]);
    makeTargetNumber(index + 1, currentNumber - numbers[index]);
  };

  makeTargetNumber(0, 0);
  return answer;
}

console.log(solution(numbers, target));
