const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, C, ...weights] = require('fs').readFileSync(filePath).toString().trim().split(/\s+/).map(Number); // prettier-ignore

const solution = (N, C, weights) => {
  const weightsA = weights.slice(0, Math.floor(N / 2));
  const weightsB = weights.slice(Math.floor(N / 2));

  const weightsSumA = [];
  const weightsSumB = [];

  findSumCombinations(weightsA, weightsSumA, 0, 0);
  findSumCombinations(weightsB, weightsSumB, 0, 0);

  weightsSumB.sort((a, b) => a - b);

  const count = weightsSumA.reduce((acc, cur) => {
    const target = C - cur;

    if (target < 0) return acc;

    return acc + binarySearch(weightsSumB, target, 0, weightsSumB.length);
  }, 0);

  return count;
};

const findSumCombinations = (array, sumArray, index, sum) => {
  if (index === array.length) {
    sumArray.push(sum);

    return;
  }

  findSumCombinations(array, sumArray, index + 1, sum);
  findSumCombinations(array, sumArray, index + 1, sum + array[index]);
};

const binarySearch = (array, target, start, end) => {
  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (array[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
};

console.log(solution(N, C, weights));
